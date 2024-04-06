import Channel from '@/types/entities/channel';
import Video from '@/types/entities/video';

/**
 * domain service
 */

export default interface VideoInfoService {
  getStreams(channel: Channel): Promise<Video[]>;
  getStartAtTime(streams: Video[]): Promise<Video[]>;
}
