import VideoInfoService from '@/types/services/videoInfoService';
import ChannelInfoService from '@/types/services/channelInfoService';
import youtubeRssService from '@/services/youtubeRssService';
import youtubeApiService from '@/services/youtubeApiService';
import Channel from '@/types/entities/channel';
import Video from '@/types/entities/video';

export class YoutubeService implements VideoInfoService, ChannelInfoService {
  async getStreams(channel: Channel): Promise<Video[]> {
    return await youtubeRssService.getStreams(channel);
  }

  async getStartAtTime(streams: Video[]): Promise<Video[]> {
    return await youtubeApiService.getStartAtTime(streams);
  }

  async getChannelsInfo(channel: Channel[]): Promise<Channel[]> {
    return await youtubeApiService.getChannel(channel);
  }
}

const youtubeService = new YoutubeService();

export default youtubeService;
