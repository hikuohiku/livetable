import channelRepository from '@/services/repositories/channelRepository';
import userRepository, { googleUserRepository, subscriptionRepository } from '@/services/repositories/userRepository';
import videoRepository from '@/services/repositories/videoRepository';
import youtubeApiService from '@/services/youtubeApiService';
import youtubeRssService from '@/services/youtubeRssService';
import Channel from '@/types/entities/channel';
import { GoogleUser, Subscription } from '@/types/entities/user';
import Video from '@/types/entities/video';
import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!clientId) {
  throw new Error('GOOGLE_CLIENT_ID is not set');
}
if (!clientSecret) {
  throw new Error('GOOGLE_CLIENT_SECRET is not set');
}

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: clientId,
      clientSecret: clientSecret,
      authorization: {
        params: {
          // access_type: 'offline',
          scope: 'openid email profile https://www.googleapis.com/auth/youtube.readonly',
          prompt: 'select_account',
        },
      },
    }),
  ],
  callbacks: {
    // jwtコールバック
    // クライアントとjwtをやり取りするときに発火
    async jwt({ token, account, profile }) {
      console.log('jwt callback called');
      // サインインのときだけ発火
      // profileがサインイン時のみ存在するため
      if (!(account && account.provider === 'google' && account.access_token && profile && profile.email)) return token;

      console.log('jwt callback entered signin logic');

      // ユーザー情報をDBに保存（DBと同期しておく）
      const user = await storeUserInfo(profile.email, account.access_token, profile.name, token.picture ?? undefined);

      // チャンネル登録情報を取得
      const subscriptions = await youtubeApiService.getSubscription(user);

      // チャンネル登録情報をDBに保存
      await storeSubscriptionInfo(subscriptions);

      // 配信情報を取得
      // 取得するチャンネル
      const channelsWithIdOnly: Channel[] = subscriptions.map((subscription) => {
        return { channelId: subscription.channelId };
      });
      // RSSから配信情報を取得
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
      // TODO: APIリクエスト一度にまとめられるかも
      const videosWithLiveStatus = await Promise.all(
        refreshRequiredVideos.map((video) => youtubeApiService.getLiveStatus(video)),
      );
      // 配信情報をDBに保存
      await Promise.all(videosWithLiveStatus.map((video) => videoRepository.upsert(video)));

      // JWTにユーザーidを追加
      token = {
        ...token,
        uuid: user.uuid,
      };
      return token;
    },
  },
};

// NextAuthの設定
const handler = NextAuth(authOptions);

/**
 * ユーザー情報をDBに保存する関数
 * TODO: トランザクション
 */
async function storeUserInfo(
  email: string,
  accessToken?: string,
  name?: string,
  thumbnail?: string,
): Promise<GoogleUser> {
  // usersテーブル
  const user = await userRepository.upsertByEmail(email, name);

  // google_usersテーブル
  await googleUserRepository.upsert({
    ...user,
    accessToken,
    thumbnail,
  });

  return { ...user, accessToken, thumbnail };
}

/**
 * チャンネル登録情報をDBに保存する関数
 * 登録チャンネルがDBに存在しない場合はYoutubeAPIから情報を取ってきて保存
 * TODO: チャンネル情報の更新処理
 */
async function storeSubscriptionInfo(subscriptions: Subscription[]): Promise<void> {
  // DBと照合して未保存のチャンネルを取得
  const unSavedChannels: Channel[] = await Promise.all(
    subscriptions.map(async (subscription) => {
      const channel = await channelRepository.findByChannelId(subscription.channelId);
      if (!channel) {
        return { channelId: subscription.channelId };
      }
      return null;
    }),
  ).then((results) => results.filter((result): result is Channel => result !== null));

  // 未保存のチャンネルがあれば情報を取ってきて保存
  if (unSavedChannels.length !== 0) {
    const unSavedChannelsWithInfo = await youtubeApiService.getChannel(unSavedChannels);
    await Promise.all(unSavedChannelsWithInfo.map((channel) => channelRepository.save(channel)));
  }

  // チャンネル登録情報をDBに保存
  await Promise.all(subscriptions.map((subscription) => subscriptionRepository.upsert(subscription)));
}

export { handler as GET, handler as POST };
