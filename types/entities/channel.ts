/**
 * entities
 */

export default interface Channel {
  channelId: string;
  channelName?: string;
  handle?: string;
}

/**
 * repositories
 */

export interface ChannelRepository {
  findByChannelId(channelId: string): Promise<Channel | null>;
  save(channel: Channel): Promise<void>;
  update(channel: Channel): Promise<void>;
  upsert(channel: Channel): Promise<void>;
}