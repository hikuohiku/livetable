import Image from 'next/image';
import { ReactNode } from 'react';

interface LiveCardProps {
  channelThumbnail: string;
  liveThumbnail: string;
  onLive?: boolean;
}

function LiveCard({ channelThumbnail, liveThumbnail, onLive = false }: LiveCardProps) {
  const backGroundColor = onLive ? 'bg-red-600/20' : 'bg-inherit';
  return (
    <div className={`liveCard ${backGroundColor} flex justify-center items-center gap-2 rounded-lg m-2 p-1 w-72`}>
      <div className='relative'>
        <Image
          src={channelThumbnail}
          alt='Channel Thumbnail'
          className='rounded-full border-glass'
          width={64}
          height={64}
        />
      </div>
      <div className='relative'>
        <LiveThumbnailWrapper>
          <Image src={liveThumbnail} alt='Live Thumbnail' className='rounded-lg' width={192} height={144} />
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
