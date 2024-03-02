import Stream from '@/types/entities/stream';
import { StreamRepository } from '@/types/entities/stream';

import prisma from '@/lib/prismaClient';

export class PrismaStreamRepository implements StreamRepository {
  async findByVideoId(videoId: string) {
    const stream = await prisma.stream.findUnique({ where: { videoId } });
    return stream
      ? {
        ...stream,
        title: stream.title ?? undefined,
        description: stream.description ?? undefined,
        startAt: stream.startAt ?? undefined,
      }
      : null;
  }

  async findByChannelId(channelId: string) {
    const stream = await prisma.stream.findFirst({ where: { channelId } });
    return stream
      ? {
        ...stream,
        title: stream.title ?? undefined,
        description: stream.description ?? undefined,
        startAt: stream.startAt ?? undefined,
      }
      : null;
  }

  async save(stream: Stream) {
    const savedStream = {
      ...stream,
      // なんか，startAtがundefinedだとprismaに怒られる
      startAt: stream.startAt ?? new Date(),
    };
    await prisma.stream.create({ data: savedStream });
  }

  async update(stream: Stream) {
    await prisma.stream.update({ where: { videoId: stream.videoId }, data: stream });
  }

  async upsert(stream: Stream) {
    const upsertedStream = {
      ...stream,
      // なんか，startAtがundefinedだとprismaに怒られる2
      startAt: stream.startAt ?? new Date(),
    };
    await prisma.stream.upsert({ where: { videoId: stream.videoId }, update: upsertedStream, create: upsertedStream });
  }
}

const streamRepository = new PrismaStreamRepository();
export default streamRepository;
