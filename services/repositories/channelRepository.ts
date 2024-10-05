import prisma from '@/lib/prismaClient';
import Channel, { ChannelRepository } from '@/types/entities/channel';

export class PrismaChannelRepository implements ChannelRepository {
  async findByChannelId(channelId: string): Promise<Channel | null> {
    return prisma.channel.findUnique({ where: { channelId } });
  }

  async save(channel: Channel): Promise<Channel> {
    return prisma.channel.create({ data: channel });
  }

  async update(channel: Channel): Promise<Channel> {
    return prisma.channel.update({ where: { channelId: channel.channelId }, data: channel });
  }

  async upsert(channel: Channel): Promise<Channel> {
    return prisma.channel.upsert({ where: { channelId: channel.channelId }, update: channel, create: channel });
  }
}

const channelRepository = new PrismaChannelRepository();
export default channelRepository;
