/**
 * entities
 */

export default interface Channel {
  channelId: string;
  channelName?: string | null;
  handle?: string | null;
  thumbnail?: string | null;
}

/**
 * repositories
 */

export interface ChannelRepository {
  findByChannelId(channelId: string): Promise<Channel | null>;
  save(channel: Channel): Promise<Channel>;
  update(channel: Channel): Promise<Channel>;
  upsert(channel: Channel): Promise<Channel>;
}
