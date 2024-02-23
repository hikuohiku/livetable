import StreamInfoService from "@/types/services/streamInfoService";
import youtubeRssService from "@/services/youtubeRssService";
import youtubeApiService from "@/services/youtubeApiService";
import Channel from "@/types/entities/channel";
import Stream from "@/types/entities/stream";

export class YoutubeService implements StreamInfoService {
  async getStreams(channel: Channel): Promise<Stream[]> {
    return await youtubeRssService.getStreams(channel);
  }

  async getStartAtTime(streams: Stream[]): Promise<Stream[]> {
    return await youtubeApiService.getStartAtTime(streams);
  }
}

const youtubeService = new YoutubeService();

export default youtubeService;