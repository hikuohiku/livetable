'use client';
import Image from 'next/image';
import { ReactNode, useState } from 'react';

import Channel from '@/types/entities/channel';
import Video from '@/types/entities/video';

interface LiveCardProps {
  live: Video;
  channel?: Channel | null;
}

const LiveCard = ({ channel, live }: LiveCardProps) => {
  const liveThumbnail = live.thumbnail ?? ''; // TODO: フォールバック
  const channelThumbnail = channel?.thumbnail ?? ''; // TODO: フォールバック
  const liveUrl = `https://www.youtube.com/watch?v=${live.videoId}`;
  const channelUrl = channel ? `https://www.youtube.com/channel/${channel.channelId}` : ''; // TODO: フォールバック
  const onLive = live?.liveStatus === 'live';
  const backGroundColor = onLive ? 'bg-red-600/20' : 'bg-inherit';
  return (
    <div className={`glass ${backGroundColor} flex justify-center items-center gap-2 rounded-lg p-1`}>
      <div className='w-1/4'>
        <ChannelThumbnail channelThumbnail={channelThumbnail} channelUrl={channelUrl} />
      </div>
      <div className='w-3/4'>
        <LiveThumbnail liveThumbnail={liveThumbnail} liveUrl={liveUrl} />
      </div>
    </div>
  );
};

const ChannelThumbnail = ({ channelThumbnail, channelUrl }: { channelThumbnail: string; channelUrl: string }) => {
  const [hasError, setHasError] = useState(false);
  const fallbackImage = 'https://placehold.co/240x240';
  return (
    <ChannelThumbnailWrapper>
      <a href={channelUrl} target='_blank' rel='noopener noreferrer'>
        <Image
          src={hasError ? fallbackImage : channelThumbnail}
          alt='Channel Thumbnail'
          className='rounded-full border-glass'
          width={240}
          height={240}
          onError={() => {
            setHasError(true);
          }}
        />
      </a>
    </ChannelThumbnailWrapper>
  );
};

const ChannelThumbnailWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className='flex justify-center items-center relative overflow-hidden bg-gray-200 rounded-full aspect-square w-full'>
      {children}
    </div>
  );
};

const LiveThumbnail = ({ liveThumbnail, liveUrl }: { liveThumbnail: string; liveUrl: string }) => {
  const [hasError, setHasError] = useState(false);
  const fallbackImage = 'https://placehold.co/480x360';
  return (
    <LiveThumbnailWrapper>
      <a href={liveUrl} target='_blank' rel='noopener noreferrer'>
        <Image
          src={hasError ? fallbackImage : liveThumbnail}
          alt='Live Thumbnail'
          className='rounded-lg'
          width={480}
          height={360}
          onError={() => {
            setHasError(true);
          }}
        />
      </a>
    </LiveThumbnailWrapper>
  );
};

// 16:9に縁取りする
const LiveThumbnailWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className='flex justify-center items-center relative overflow-hidden bg-gray-200 rounded-sm aspect-video w-full'>
      {children}
    </div>
  );
};

export default LiveCard;
