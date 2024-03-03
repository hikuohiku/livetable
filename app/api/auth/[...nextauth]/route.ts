import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import userRepository from '@/services/repositories/userRepository';
import { googleUserRepository } from '@/services/repositories/userRepository';
import { subscriptionRepository } from '@/services/repositories/userRepository';
import youtubeApiService from '@/services/youtubeApiService';
import { GoogleUser } from '@/types/entities/user';
import channelRepository from '@/services/repositories/channelRepository';
import Channel from '@/types/entities/channel';

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!clientId) {
  throw new Error('GOOGLE_CLIENT_ID is not set');
}
if (!clientSecret) {
  throw new Error('GOOGLE_CLIENT_SECRET is not set');
}

// ユーザー情報をDBに保存
async function storeUserInfo(email: string, accessToken: string, name?: string): Promise<GoogleUser> {
  // usersテーブル
  const user = await userRepository.upsertByEmail(email, name);

  // google_usersテーブル
  await googleUserRepository.upsert({
    ...user,
    token: accessToken,
  });

  return { ...user, token: accessToken };
}

const handler = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: clientId,
      clientSecret: clientSecret,
      authorization: {
        params: {
          // access_type: 'offline',
          scope: 'openid email profile https://www.googleapis.com/auth/youtube.readonly',
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      // サインインのときだけ発火
      // profileはサインイン時のみ存在する
      if (account && account.provider === 'google' && account.access_token && profile && profile.email) {
        // ユーザー情報をDBに保存
        const user = await storeUserInfo(profile.email, account.access_token, profile.name);

        // チャンネル登録情報を取得
        const subscriptions = await youtubeApiService.getSubscription(user);
        // チャンネル登録情報をDBに保存
        // 登録チャンネルがDBに存在しない場合は情報を取ってきて保存
        const unSavedChannels: Channel[] = await Promise.all(
          subscriptions.map(async (subscription) => {
            const channel = await channelRepository.findByChannelId(subscription.channelId);
            if (!channel) {
              return { channelId: subscription.channelId };
            }
            return null;
          }),
        ).then((results) => results.filter((result): result is Channel => result !== null));
        console.log('unSavedChannels: ' + unSavedChannels);
        const unSavedChannelsWithInfo = await youtubeApiService.getChannel(unSavedChannels);
        await Promise.all(unSavedChannelsWithInfo.map((channel) => channelRepository.save(channel)));
        // チャンネル登録情報をDBに保存
        await Promise.all(subscriptions.map((subscription) => subscriptionRepository.upsert(subscription)));

        // JWTにユーザーidを追加
        token = {
          ...token,
          uuid: user.uuid,
        };
        return token;
      }

      // TODO: エラーハンドリング
      throw new Error('jwt callback error');
    },
  },
});

export { handler as GET, handler as POST };
