import CardContainer from '@/components/CardContainer';
import Header from '@/components/Header';
import LiveCard from '@/components/LiveCard';
import Splitter from '@/components/Splitter';
import channelRepository from '@/services/repositories/channelRepository';
import userRepository, { subscriptionRepository } from '@/services/repositories/userRepository';
import videoRepository from '@/services/repositories/videoRepository';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import LoginButton from '@/components/LoginButton';

type Live = {
  videoId: string;
  thumbnail: string;
  chnnelThumbnail: string;
  liveStatus: string;
  startAt: Date;
};

async function fetchData() {
  const session = await getServerSession(authOptions);
  if (!session) return;
  const email = session.user?.email;
  if (!email) return;
  const user = await userRepository.findByEmail(email);
  if (!user) return;
  const subscriptions = await subscriptionRepository.findByUser(user);
  if (!subscriptions) return;
  const lives = await Promise.all(
    subscriptions.map(async (subscription) => {
      return await videoRepository.findByChannelId(subscription.channelId);
    }),
  );
  const livesWithChannelThumbnail: Live[][] = await Promise.all(
    lives.map(async (lives) => {
      if (!lives.length) return [];
      const channel = await channelRepository.findByChannelId(lives[0].channelId);
      return lives.map((live) => ({
        videoId: live.videoId ?? '',
        thumbnail: live.thumbnail ?? '',
        chnnelThumbnail: channel?.thumbnail ?? '',
        liveStatus: live.liveStatus ?? '',
        startAt: live.startAt ?? new Date(),
      }));
    }),
  );
  return livesWithChannelThumbnail;
}

function groupByHour(lives: Live[]) {
  const groups: Live[][] = [];
  let currentGroup: Live[] = [];
  let currentHour = -1;
  lives.forEach((live) => {
    const hour = live.startAt.getHours();
    if (hour !== currentHour) {
      if (currentGroup.length) groups.push(currentGroup);
      currentGroup = [];
      currentHour = hour;
    }
    currentGroup.push(live);
  });
  if (currentGroup.length) groups.push(currentGroup);
  return groups;
}

export default async function Page() {
  const liveGroups = await fetchData();
  const sortedLives = liveGroups?.flat().sort((a, b) => a.startAt?.getTime() - b.startAt?.getTime());
  const groupedLives = groupByHour(sortedLives ?? []);
  const session = await getServerSession(authOptions);
  return (
    <>
      <Header />
      <div className='relative flex flex-wrap justify-end top-16 mx-4'>
        {session === null && (<LoginButton />)}
        <CardContainer>
          {groupedLives?.map((group, index) => {
            const hasValidLive = group.some((live) => live.liveStatus === 'live' || live.liveStatus === 'upcoming');
            return (
              <>
                {hasValidLive && <Splitter time={group[0].startAt} />}
                {group.map((live) =>
                  live.liveStatus === 'upcoming' ? (
                    <LiveCard
                      key={live.videoId}
                      channelThumbnail={live.chnnelThumbnail}
                      liveThumbnail={live.thumbnail}
                    />
                  ) : live.liveStatus === 'live' ? (
                    <LiveCard
                      key={live.videoId}
                      channelThumbnail={live.chnnelThumbnail}
                      liveThumbnail={live.thumbnail}
                      onLive
                    />
                  ) : null,
                )}
              </>
            );
          })}
        </CardContainer>
      </div>
    </>
  );
}
