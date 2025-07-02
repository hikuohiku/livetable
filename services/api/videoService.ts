import apiClient from "@/lib/apiClient";
import { VideosResponse } from "@/lib/types/api";
import Video from "@/types/entities/video";

export class VideoApiService {
  async findByChannelId(channelId: string): Promise<Video[]> {
    try {
      const response = await apiClient.get<VideosResponse>(`/videos/channel/${channelId}`);
      return response.data;
    } catch (error) {
      console.error("Failed to find videos by channel ID:", error);
      return [];
    }
  }

  async findLiveAndUpcomingByChannelIds(channelIds: string[]): Promise<Video[]> {
    try {
      const response = await apiClient.post<VideosResponse>("/videos/live-and-upcoming", { channelIds });
      return response.data;
    } catch (error) {
      console.error("Failed to find live and upcoming videos:", error);
      return [];
    }
  }

  async findByVideoId(videoId: string): Promise<Video | null> {
    try {
      const response = await apiClient.get<{ video: Video | null }>(`/videos/${videoId}`);
      return response.video;
    } catch (error) {
      console.error("Failed to find video by ID:", error);
      return null;
    }
  }
}

const videoApiService = new VideoApiService();
export default videoApiService;