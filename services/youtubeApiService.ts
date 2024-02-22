import Stream from "@/types/stream";

import { google } from "googleapis";
import { youtube } from "googleapis/build/src/apis/youtube";

const apiKey = process.env.YOUTUBE_API_KEY;

if (!apiKey) {
  throw new Error("YOUTUBE_API_KEY is not defined");
}

const youtubeApiService = google.youtube('v3');

export async function getStartAtTime(streams: Stream[]): Promise<Stream[]> {
  const responseData = await youtubeApiService.videos.list({
    key: apiKey,
    part: ['liveStreamingDetails'],
    id: streams.map(s => s.videoId),
  }).then(response => response.data);

  // レスポンスのバリデーション
  if (!responseData.items) {
    throw new Error("Invalid response data from YouTube API");
  }
  const responseItems = responseData.items
  responseItems.forEach((item, i) => {
    if (!(item.id == streams[i].videoId)) {
      throw new Error("Invalid response data from YouTube API");
    }
  });

  // startAtをstreamsに追加
  const streamWithStartAtTime = streams.map((s, i) => {
    const item = responseItems[i];
    if (!item) {
      return s;
    }

    const streamingDetails = item.liveStreamingDetails;
    if (!streamingDetails) {
      return s;
    }
    const startAt = streamingDetails.scheduledStartTime ? streamingDetails.scheduledStartTime : streamingDetails.actualStartTime;
    if (!startAt) {
      return s;
    }

    return {
      ...s,
      startAt,
    };
  });

  return streamWithStartAtTime;
}