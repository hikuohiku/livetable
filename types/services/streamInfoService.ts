import Channel from "@/types/entities/channel";
import Stream from "@/types/entities/stream";

/**
 * domain service
 */

export default interface StreamInfoService {
  getStreams(channel: Channel): Promise<Stream[]>;
  getStartAtTime(streams: Stream[]): Promise<Stream[]>;
}