import Stream from '@/types/entities/stream';
import { StreamRepository } from '@/types/entities/stream';

import prisma from '@/lib/prismaClient';

export class PrismaStreamRepository implements StreamRepository {
  async findByVideoId(videoId: string) {
    const stream = await prisma.stream.findUnique({ where: { videoId } });
    return stream ? {
      ...stream,
      title: stream.title ?? undefined,
      description: stream.description ?? undefined,
      startAt: stream.startAt ?? undefined,
    } : null;
  }

  async findByChannelId(channelId: string) {
    const stream = await prisma.stream.findFirst({ where: { channelId } });
    return stream ? {
      ...stream,
      title: stream.title ?? undefined,
      description: stream.description ?? undefined,
      startAt: stream.startAt ?? undefined,
    } : null;
  }

  async save(stream: Stream) {
    const savedStream = {
      ...stream,
      startAt: stream.startAt ?? new Date(),
    };
    await prisma.stream.create({ data: savedStream });
  }

  async update(stream: Stream) {
    await prisma.stream.update({ where: { videoId: stream.videoId }, data: stream });
  }
}