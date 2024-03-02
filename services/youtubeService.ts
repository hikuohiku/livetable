import StreamInfoService from "@/types/services/streamInfoService";
import ChannelInfoService from "@/types/services/channelInfoService";
import youtubeRssService from "@/services/youtubeRssService";
import youtubeApiService from "@/services/youtubeApiService";
import Channel from "@/types/entities/channel";
import Stream from "@/types/entities/stream";

export class YoutubeService implements StreamInfoService, ChannelInfoService {
  async getStreams(channel: Channel): Promise<Stream[]> {
    return await youtubeRssService.getStreams(channel);
  }

  async getStartAtTime(streams: Stream[]): Promise<Stream[]> {
    return await youtubeApiService.getStartAtTime(streams);
  }

  async getChannelsInfo(channel: Channel[]): Promise<Channel[]> {
    return await youtubeApiService.getChannel(channel);
  }
}

const youtubeService = new YoutubeService();

export default youtubeService;