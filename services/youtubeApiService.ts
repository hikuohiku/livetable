import Stream from "@/types/stream";

import { google } from "googleapis";
import { youtube } from "googleapis/build/src/apis/youtube";

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