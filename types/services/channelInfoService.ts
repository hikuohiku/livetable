import Channel from "@/types/entities/channel";

/**
 * domain service
 */

export default interface ChannelInfoService {
  getChannelsInfo(channel: Channel[]): Promise<Channel[]>;
}