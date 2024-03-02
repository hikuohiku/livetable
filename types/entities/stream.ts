/**
 * entities
 */

export default interface Stream {
  videoId: string;
  channelId: string;
  title?: string;
  description?: string;
  startAt?: Date;
}

/**
 * repositories
 */

export interface StreamRepository {
  findByVideoId(videoId: string): Promise<Stream | null>;
  findByChannelId(channelId: string): Promise<Stream | null>;
  save(stream: Stream): Promise<void>;
  update(stream: Stream): Promise<void>;
  upsert(stream: Stream): Promise<void>;
}