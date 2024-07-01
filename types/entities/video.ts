/**
 * entities
 */

export default interface Video {
  videoId: string;
  channelId: string;
  title?: string;
  description?: string;
  thumbnail?: string;
  startAt?: Date;
  endAt?: Date;
  liveStatus?: 'live' | 'upcoming' | 'completed' | 'none';
}

/**
 * repositories
 */

export interface VideoRepository {
  findByVideoId(videoId: string): Promise<Video | null>;
  findByChannelId(channelId: string): Promise<Video | null>;
  save(stream: Video): Promise<void>;
  update(stream: Video): Promise<void>;
  upsert(stream: Video): Promise<void>;
}
