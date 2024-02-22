import Stream from "@/types/stream";
import { GoogleUser, Subscription } from "@/types/user";
import Channel from "@/types/channel";


import { google } from "googleapis";

const apiKey = process.env.YOUTUBE_API_KEY;
if (!apiKey) {
  throw new Error("YOUTUBE_API_KEY is not defined");
}

const youtubeApiService = google.youtube('v3');

export async function getStartAtTime(streams: Stream[]): Promise<Stream[]> {
  try {
    const responseData = await youtubeApiService.videos.list({
      key: apiKey,
      part: ['liveStreamingDetails'],
      fields: 'items(id,liveStreamingDetails(actualStartTime,scheduledStartTime))',
      id: streams.map(s => s.videoId),
    }).then(response => response.data);

    // レスポンスのバリデーション
    if (!responseData.items) {
      throw new Error("Invalid response data from YouTube API");
    }
    const responseItems = responseData.items

    // startAtをstreamsに追加
    const streamWithStartAtTime = streams.map((s) => {
      const item = responseItems.find(item => item.id === s.videoId);

      if (!item || !item.liveStreamingDetails) {
        return s;
      }
      const streamingDetails = item.liveStreamingDetails;

      const { actualStartTime, scheduledStartTime } = streamingDetails;
      const startAt = actualStartTime || scheduledStartTime;

      return startAt ? { ...s, startAt } : s;
    });

    return streamWithStartAtTime;

  } catch (e) {
    // TODO: エラー処理
    console.error(e);
    throw new Error("Failed to fetch data from YouTube API");
  }
}

export async function getSubscription(user: GoogleUser): Promise<Subscription[]> {
  try {
    const responseData = await youtubeApiService.subscriptions.list({
      access_token: user.token,
      part: ['snippet'],
      fields: 'items(snippet(resourceId(channelId)))',
      mine: true,
    }).then(response => response.data);

    // レスポンスのバリデーション
    if (!responseData.items) {
      throw new Error("Invalid response data from YouTube API");
    }

    // subscriptionを返す
    const subscriptions: Subscription[] = responseData.items.map(item => {
      if (!item.snippet || !item.snippet.resourceId || !item.snippet.resourceId.channelId) {
        throw new Error("Invalid response data from YouTube API");
      }

      const channelId = item.snippet.resourceId.channelId;
      return { channelId, userId: user.uuid };
    });

    return subscriptions;

  } catch (e) {
    // TODO: エラー処理
    console.error(e);
    throw new Error("Failed to fetch data from YouTube API");
  }
}

export async function getChannel(channel: Channel): Promise<Channel> {
  try {
    const responseData = await youtubeApiService.channels.list({
      key: apiKey,
      part: ['snippet'],
      id: [channel.channelId],
      fields: 'items(snippet(title))',
    }).then(response => response.data);

    // レスポンスのバリデーション
    if (!responseData.items) {
      throw new Error("Invalid response data from YouTube API");
    }
    const responseItem = responseData.items[0];

    // channelを返す
    if (!responseItem || !responseItem.snippet || !responseItem.snippet.title) {
      throw new Error("Invalid response data from YouTube API");
    }

    return { ...channel, channelName: responseItem.snippet.title };
  } catch (e) {
    // TODO: エラー処理
    console.error(e);
    throw new Error("Failed to fetch data from YouTube API");
  }
}