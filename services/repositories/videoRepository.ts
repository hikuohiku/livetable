import Video, { VideoRepository, liveStatuses } from '@/types/entities/video';

import prisma from '@/lib/prismaClient';

export class PrismaVideoRepository implements VideoRepository {
  async findByVideoId(videoId: string): Promise<Video | null> {
    const video = await prisma.video.findUnique({ where: { videoId } });
    return video
      ? {
          ...video,
          liveStatus: isLiveStatus(video.liveStatus) ? video.liveStatus : undefined,
        }
      : null;
  }

  async findByChannelId(channelId: string): Promise<Video[]> {
    const videos = await prisma.video.findMany({ where: { channelId } });
    return videos.map((video) => ({
      ...video,
      liveStatus: isLiveStatus(video.liveStatus) ? video.liveStatus : undefined,
    }));
  }

  async save(video: Video): Promise<Video> {
    const createdVideo = await prisma.video.create({ data: video });
    return { ...createdVideo, liveStatus: isLiveStatus(createdVideo.liveStatus) ? createdVideo.liveStatus : undefined };
  }

  async update(video: Video): Promise<Video> {
    const updatedVideo = await prisma.video.update({ where: { videoId: video.videoId }, data: video });
    return { ...updatedVideo, liveStatus: isLiveStatus(updatedVideo.liveStatus) ? updatedVideo.liveStatus : undefined };
  }

  async upsert(video: Video): Promise<Video> {
    const upsertedVideo = await prisma.video.upsert({
      where: { videoId: video.videoId },
      update: video,
      create: video,
    });
    return {
      ...upsertedVideo,
      liveStatus: isLiveStatus(upsertedVideo.liveStatus) ? upsertedVideo.liveStatus : undefined,
    };
  }
}

function isLiveStatus(liveStatus: string | undefined | null): liveStatus is Video['liveStatus'] {
  return liveStatuses.includes(liveStatus as any) || liveStatus === null || liveStatus === undefined;
}

const videoRepository = new PrismaVideoRepository();
export default videoRepository;
