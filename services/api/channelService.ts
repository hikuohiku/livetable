import apiClient from "@/lib/apiClient";
import { ChannelsResponse } from "@/lib/types/api";
import Channel from "@/types/entities/channel";

export class ChannelApiService {
  async findByChannelId(channelId: string): Promise<Channel | null> {
    try {
      const response = await apiClient.get<{ channel: Channel | null }>(`/channels/${channelId}`);
      return response.channel;
    } catch (error) {
      console.error("Failed to find channel by ID:", error);
      return null;
    }
  }

  async findManyByChannelIds(channelIds: string[]): Promise<Channel[]> {
    try {
      const response = await apiClient.post<ChannelsResponse>("/channels/find-many", { channelIds });
      return response.data;
    } catch (error) {
      console.error("Failed to find channels by IDs:", error);
      return [];
    }
  }
}

const channelApiService = new ChannelApiService();
export default channelApiService;