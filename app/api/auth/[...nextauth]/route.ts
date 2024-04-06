import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import userRepository from '@/services/repositories/userRepository';
import { googleUserRepository } from '@/services/repositories/userRepository';
import { subscriptionRepository } from '@/services/repositories/userRepository';
import youtubeApiService from '@/services/youtubeApiService';
import { GoogleUser } from '@/types/entities/user';
import channelRepository from '@/services/repositories/channelRepository';
import videoRepository from '@/services/repositories/videoRepository';
import Channel from '@/types/entities/channel';
import Video from '@/types/entities/video';
import youtubeRssService from '@/services/youtubeRssService';

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
        if (unSavedChannels.length !== 0) {
          const unSavedChannelsWithInfo = await youtubeApiService.getChannel(unSavedChannels);
          await Promise.all(unSavedChannelsWithInfo.map((channel) => channelRepository.save(channel)));
        }
        // チャンネル登録情報をDBに保存
        await Promise.all(subscriptions.map((subscription) => subscriptionRepository.upsert(subscription)));

        // 配信情報を取得
        // 取得するチャンネル
        const channelsWithIdOnly: Channel[] = subscriptions.map((subscription) => {
          return { channelId: subscription.channelId };
        });
        // 取得するチャンネルの配信情報を取得
        const videoGroups: Video[][] = await Promise.all(
          channelsWithIdOnly.map((channel) => youtubeRssService.getStreams(channel)),
        );
        const videos = videoGroups.flat();

        // 配信情報をDBと照合
        // DBに存在しないか，DB上でliveStatusが"live"か"upcoming"のものをまとめる
        const refreshRequiredVideos: Video[] = await Promise.all(
          videos.map(async (video) => {
            const savedVideo = await videoRepository.findByVideoId(video.videoId);
            if (!savedVideo || savedVideo.liveStatus === 'live' || savedVideo.liveStatus === 'upcoming') {
              return video;
            }
            return null;
          }),
        ).then((results) => results.filter((result): result is Video => result !== null));

        // 更新が必要な配信の配信ステータスを取得
        const videosWithLiveStatus = await Promise.all(
          refreshRequiredVideos.map((video) => youtubeApiService.getLiveStatus(video)),
        );
        console.log(videosWithLiveStatus);
        // 配信情報をDBに保存
        await Promise.all(videosWithLiveStatus.map((video) => videoRepository.upsert(video)));

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
