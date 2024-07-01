import Video, { VideoRepository } from '@/types/entities/video';

import prisma from '@/lib/prismaClient';

export class PrismaVideoRepository implements VideoRepository {
  async findByVideoId(videoId: string): Promise<Video | null> {
    const video = await prisma.video.findUnique({ where: { videoId } });
    return video
      ? {
          ...video,
          title: video.title ?? undefined,
          description: video.description ?? undefined,
          thumbnail: video.thumbnail ?? undefined,
          startAt: video.startAt ?? undefined,
          endAt: video.endAt ?? undefined,
          liveStatus: checkLiveStatusType(video.liveStatus) ? video.liveStatus : undefined,
        }
      : null;
  }

  async findByChannelId(channelId: string): Promise<Video | null> {
    const video = await prisma.video.findFirst({ where: { channelId } });
    return video
      ? {
          ...video,
          title: video.title ?? undefined,
          description: video.description ?? undefined,
          thumbnail: video.thumbnail ?? undefined,
          startAt: video.startAt ?? undefined,
          endAt: video.endAt ?? undefined,
          liveStatus: checkLiveStatusType(video.liveStatus) ? video.liveStatus : undefined,
        }
      : null;
  }

  async save(video: Video) {
    // const savedStream = {
    //   ...stream,
    //   // なんか，startAtがundefinedだとprismaに怒られる
    //   startAt: stream.startAt ?? new Date(),
    // };
    // await prisma.stream.create({ data: savedStream });
    await prisma.video.create({ data: video });
  }

  async update(video: Video) {
    await prisma.video.update({ where: { videoId: video.videoId }, data: video });
  }

  async upsert(video: Video) {
    // const upsertedStream = {
    //   ...stream,
    //   // なんか，startAtがundefinedだとprismaに怒られる2
    //   startAt: stream.startAt ?? new Date(),
    // };
    // await prisma.stream.upsert({ where: { videoId: stream.videoId }, update: upsertedStream, create: upsertedStream });
    await prisma.video.upsert({ where: { videoId: video.videoId }, update: video, create: video });
  }
}

function checkLiveStatusType(
  liveStatus: string | undefined | null,
): liveStatus is 'live' | 'upcoming' | 'completed' | 'none' | undefined {
  return (
    liveStatus === 'live' ||
    liveStatus === 'upcoming' ||
    liveStatus === 'completed' ||
    liveStatus === 'none' ||
    liveStatus === undefined
  );
}

const videoRepository = new PrismaVideoRepository();
export default videoRepository;
