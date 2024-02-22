/**
 * entities
 */

export default interface Stream {
  videoId: string;
  channelId: string;
  title?: string;
  description?: string;
  startAt?: string; // ほんとか？
}

/**
 * repositories
 */

export interface StreamRepository {
  findByVideoId(videoId: string): Promise<Stream>;
  findByChannelId(channelId: string): Promise<Stream>;
  save(stream: Stream): Promise<void>;
  update(stream: Stream): Promise<void>;
}