import Channel, { ChannelRepository } from '@/types/entities/channel';

import prisma from '@/lib/prismaClient';

export class PrismaChannelRepository implements ChannelRepository {
  async findByChannelId(channelId: string): Promise<Channel | null> {
    const channel = await prisma.channel.findUnique({ where: { channelId } });
    return channel
      ? {
          ...channel,
          channelName: channel.channelName ?? undefined,
          handle: channel.handle ?? undefined,
          thumbnail: channel.thumbnail ?? undefined,
        }
      : null;
  }

  async save(channel: Channel) {
    await prisma.channel.create({ data: channel });
  }

  async update(channel: Channel) {
    await prisma.channel.update({ where: { channelId: channel.channelId }, data: channel });
  }

  async upsert(channel: Channel) {
    await prisma.channel.upsert({ where: { channelId: channel.channelId }, update: channel, create: channel });
  }
}

const channelRepository = new PrismaChannelRepository();
export default channelRepository;
