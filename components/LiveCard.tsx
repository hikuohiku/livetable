import Image from 'next/image';
import { ReactNode } from 'react';

import Channel from '@/types/entities/channel';
import Video from '@/types/entities/video';
interface LiveCardProps {
  live: Video;
  channel?: Channel;
}

function LiveCard({ channel, live }: LiveCardProps) {
  const liveThumbnail = live.thumbnail ?? ''; // TODO: フォールバック
  const channelThumbnail = channel?.thumbnail ?? ''; // TODO: フォールバック
  const liveUrl = `https://www.youtube.com/watch?v=${live.videoId}`;
  const channelUrl = channel ? `https://www.youtube.com/channel/${channel.channelId}` : ''; // TODO: フォールバック
  const onLive = live?.liveStatus === 'live';
  const backGroundColor = onLive ? 'bg-red-600/20' : 'bg-inherit';
  return (
    <div className={`liveCard ${backGroundColor} flex justify-center items-center gap-2 rounded-lg m-2 p-1 w-72`}>
      <div className='relative'>
        <a href={channelUrl} target='_blank' rel='noopener noreferrer'>
          <Image
            src={channelThumbnail}
            alt='Channel Thumbnail'
            className='rounded-full border-glass'
            width={64}
            height={64}
          />
        </a>
      </div>
      <div className='relative'>
        <LiveThumbnailWrapper>
          <a href={liveUrl} target='_blank' rel='noopener noreferrer'>
            <Image src={liveThumbnail} alt='Live Thumbnail' className='rounded-lg' width={192} height={144} />
          </a>
        </LiveThumbnailWrapper>
      </div>
    </div>
  );
}

// 16:9に縁取りする
function LiveThumbnailWrapper({ children }: { children: ReactNode }) {
  return (
    <div className='flex justify-center items-center relative overflow-hidden bg-gray-200 rounded-sm w-[192px] h-[108px]'>
      {children}
    </div>
  );
}

export default LiveCard;
