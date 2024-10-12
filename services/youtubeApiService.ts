import { google, youtube_v3 } from 'googleapis';

import Channel from '@/types/entities/channel';
import { GoogleUser, Subscription } from '@/types/entities/user';
import Video from '@/types/entities/video';
import splitArray from '@/utils/splitArray';

export class YoutubeApiService {
  private apiKey: string;
  private youtubeApiService: youtube_v3.Youtube;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.youtubeApiService = google.youtube('v3');
  }

  async getStartAtTime(streams: Video[]): Promise<Video[]> {
    try {
      const responseData = await this.youtubeApiService.videos
        .list({
          key: this.apiKey,
          part: ['liveStreamingDetails'],
          fields: 'items(id,liveStreamingDetails(actualStartTime,scheduledStartTime))',
          id: streams.map((s) => s.videoId),
        })
        .then((response) => response.data);

      // レスポンスのバリデーション
      if (!responseData.items) {
        throw new Error('Invalid response data from YouTube API');
      }
      const responseItems = responseData.items;

      // startAtをstreamsに追加
      const streamWithStartAtTime = streams.map((s) => {
        const item = responseItems.find((item) => item.id === s.videoId);

        if (!item || !item.liveStreamingDetails) {
          return s;
        }
        const streamingDetails = item.liveStreamingDetails;

        const { actualStartTime, scheduledStartTime } = streamingDetails;
        const startAt = actualStartTime || scheduledStartTime;

        return startAt ? { ...s, startAt: new Date(startAt) } : s;
      });

      return streamWithStartAtTime;
    } catch (e) {
      console.error('Failed to fetch data from YouTube API');
      throw e;
    }
  }

  async getLiveStatus(video: Video): Promise<Video> {
    try {
      // APIにリクエストを送信
      const responseData = await this.youtubeApiService.videos
        .list({
          key: this.apiKey,
          part: ['liveStreamingDetails'],
          fields: 'items(id,liveStreamingDetails(actualStartTime,actualEndTime,scheduledStartTime))',
          id: [video.videoId],
        })
        .then((response) => response.data);

      // レスポンスのバリデーション
      if (!responseData.items) {
        throw new Error('Invalid response data from YouTube API');
      }
      const responseItems = responseData.items;

      // startAt, endAt, liveStatusを取得
      const item = responseItems[0];
      if (!item || !item.liveStreamingDetails) {
        return { ...video, liveStatus: 'none' };
      }

      const streamingDetails = item.liveStreamingDetails;
      const { actualStartTime, actualEndTime, scheduledStartTime } = streamingDetails;
      const startAt = actualStartTime || scheduledStartTime;
      const endAt = actualEndTime;

      // liveStatusを推定するロジック
      const liveStatus = actualEndTime ? 'completed' : actualStartTime ? 'live' : 'upcoming';

      return {
        ...video,
        startAt: startAt ? new Date(startAt) : undefined,
        endAt: endAt ? new Date(endAt) : undefined,
        liveStatus,
      };
    } catch (e) {
      console.error('Failed to fetch data from YouTube API');
      throw e;
    }
  }

  async getLiveStatusMany(videos: Video[]): Promise<Video[]> {
    try {
      // 配列を50個ずつに分割
      const splittedVideos = splitArray(videos, 50);

      // APIにリクエストを送信
      const responses = await Promise.all(
        splittedVideos.map(async (videos) => {
          return await this.youtubeApiService.videos.list({
            key: this.apiKey,
            part: ['liveStreamingDetails'],
            fields: 'items(id,liveStreamingDetails(actualStartTime,actualEndTime,scheduledStartTime))',
            maxResults: 50,
            id: videos.map((v) => v.videoId),
          });
        }),
      );

      const responseDataGroups = responses.map((response) => response.data);

      const responseItems = responseDataGroups.map((responseData) => responseData.items).flat();

      // startAt, endAt, liveStatusを取得
      const videosWithLiveStatus = videos.map((v): Video => {
        const item = responseItems.find((item) => item?.id === v.videoId);
        if (!item || !item.liveStreamingDetails) {
          return { ...v, liveStatus: 'none' };
        }
        const streamingDetails = item.liveStreamingDetails;
        const { actualStartTime, actualEndTime, scheduledStartTime } = streamingDetails;
        const startAt = actualStartTime || scheduledStartTime;
        const endAt = actualEndTime;
        // liveStatusを推定するロジック
        const liveStatus = actualEndTime ? 'completed' : actualStartTime ? 'live' : 'upcoming';
        return {
          ...v,
          startAt: startAt ? new Date(startAt) : undefined,
          endAt: endAt ? new Date(endAt) : undefined,
          liveStatus,
        };
      });
      return videosWithLiveStatus;
    } catch (e) {
      console.error('Failed to fetch data from YouTube API');
      throw e;
    }
  }

  async getSubscription(user: GoogleUser): Promise<Subscription[]> {
    try {
      const responseData = await this.youtubeApiService.subscriptions
        .list({
          access_token: user.accessToken ?? undefined,
          part: ['snippet'],
          fields: 'items(snippet(resourceId(channelId))),nextPageToken',
          mine: true,
          maxResults: 50,
        })
        .then((response) => response.data);

      // console.dir(responseData, { depth: null });

      // レスポンスのバリデーション
      if (!responseData.items) {
        throw new Error('Invalid response data from YouTube API');
      }

      // subscriptionを返す
      const subscriptions: Subscription[] = responseData.items.map((item) => {
        if (!item.snippet || !item.snippet.resourceId || !item.snippet.resourceId.channelId) {
          throw new Error('Invalid response data from YouTube API');
        }

        const channelId = item.snippet.resourceId.channelId;
        return { channelId, userId: user.uuid };
      });

      let nextPageToken = responseData.nextPageToken;
      while (nextPageToken) {
        const nextResponseData = await this.youtubeApiService.subscriptions
          .list({
            access_token: user.accessToken ?? undefined,
            part: ['snippet'],
            fields: 'items(snippet(resourceId(channelId))),nextPageToken,prevPageToken',
            mine: true,
            maxResults: 50,
            pageToken: nextPageToken,
          })
          .then((response) => response.data);

        // console.dir(nextResponseData, { depth: null });

        if (!nextResponseData.items) {
          throw new Error('Invalid response data from YouTube API');
        }

        subscriptions.push(
          ...nextResponseData.items.map((item) => {
            if (!item.snippet || !item.snippet.resourceId || !item.snippet.resourceId.channelId) {
              throw new Error('Invalid response data from YouTube API');
            }

            const channelId = item.snippet.resourceId.channelId;
            return { channelId, userId: user.uuid };
          }),
        );

        nextPageToken = nextResponseData.nextPageToken;
      }

      return subscriptions;
    } catch (e) {
      console.error('Failed to fetch data from YouTube API');
      throw e;
    }
  }

  async getChannel(channels: Channel[]): Promise<Channel[]> {
    try {
      const splittedChannels = splitArray(channels, 50);
      const responses = await Promise.all(
        splittedChannels.map(async (channels) => {
          return await this.youtubeApiService.channels.list({
            key: this.apiKey,
            part: ['snippet', 'id'],
            id: channels.map((c) => c.channelId),
            fields: 'items(snippet(title,thumbnails.medium.url),id)',
          });
        }),
      );

      const responseDataGroups = responses.map((response) => response.data);

      const responseDataItems = responseDataGroups.map((responseData) => responseData.items).flat();

      // channelを返す
      const channelsWithTitle: Channel[] = channels.map((c) => {
        const item = responseDataItems.find((item) => item?.id === c.channelId);

        if (!item || !item.snippet || !item.snippet.title) {
          throw new Error('Invalid data response from YouTube API');
        }

        const title = item.snippet.title;

        const thumbnail = item.snippet.thumbnails?.default?.url ?? undefined;

        return { channelId: c.channelId, channelName: title, thumbnail: thumbnail };
      });

      return channelsWithTitle;
    } catch (e) {
      console.error('Failed to fetch data from YouTube API');
      throw e;
    }
  }
}

const apiKey = process.env.YOUTUBE_API_KEY;
if (!apiKey) {
  throw new Error('YOUTUBE_API_KEY is not defined');
}

const youtubeApiService = new YoutubeApiService(apiKey);

export default youtubeApiService;
