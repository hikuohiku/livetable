import CardContainer from '@/components/CardContainer';
import Header from '@/components/Header';
import LiveCard from '@/components/LiveCard';
import channelRepository from '@/services/repositories/channelRepository';
import userRepository, { subscriptionRepository } from '@/services/repositories/userRepository';
import videoRepository from '@/services/repositories/videoRepository';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';

type Live = {
  videoId: string;
  thumbnail: string;
  chnnelThumbnail: string;
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
      }));
    }),
  );
  return livesWithChannelThumbnail;
}

export default async function Page() {
  const liveGroups = await fetchData();
  return (
    <>
      <Header />
      <div className='relative flex flex-wrap justify-end top-16 mx-4'>
        <CardContainer>
          {liveGroups?.map((lives) =>
            lives.map((live) => (
              <LiveCard key={live.videoId} channelThumbnail={live.chnnelThumbnail} liveThumbnail={live.thumbnail} />
            )),
          )}
        </CardContainer>
      </div>
    </>
  );
}
