/**
 * entities
 */

export default interface Video {
  videoId: string;
  channelId: string;
  title?: string | null;
  description?: string | null;
  thumbnail?: string | null;
  startAt?: Date | null;
  endAt?: Date | null;
  liveStatus?: (typeof liveStatuses)[number] | null;
}

export const liveStatuses = ['live', 'upcoming', 'completed', 'none'] as const;

/**
 * repositories
 */

export interface VideoRepository {
  findByVideoId(videoId: string): Promise<Video | null>;
  findByChannelId(channelId: string): Promise<Video[]>;
  save(stream: Video): Promise<Video>;
  update(stream: Video): Promise<Video>;
  upsert(stream: Video): Promise<Video>;
  upsertMany(videos: Video[]): Promise<void>;
  removeMany(videos: Video[]): Promise<void>;
}
