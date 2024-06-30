import CardContainer from '@/components/CardContainer';
import Header from '@/components/Header';
import LiveCard from '@/components/LiveCard';
import Splitter from '@/components/Splitter';
import userRepository, { subscriptionRepository } from '@/services/repositories/userRepository';
import videoRepository from '@/services/repositories/videoRepository';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';

async function fetchLives() {
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
  return lives;
}

export default function Page() {
  const lives = fetchLives();
  return (
    <>
      <Header />
      <div className='relative flex flex-wrap justify-end top-16 mx-4'>
        <CardContainer>
          <LiveCard
            channelThumbnail='https://yt3.googleusercontent.com/WO7ItKNmy6tW_NQ82g8c1y74CZSw6GsSdynsE5s2csuEok2fHRrAaGcBV3JJO-2BxEOXXA8lvw=s176-c-k-c0x00ffffff-no-rj'
            liveThumbnail='https://i2.ytimg.com/vi/11CorwQBbuA/hqdefault.jpg'
          />
          <Splitter time={new Date()} />
          <LiveCard
            channelThumbnail='https://yt3.googleusercontent.com/WO7ItKNmy6tW_NQ82g8c1y74CZSw6GsSdynsE5s2csuEok2fHRrAaGcBV3JJO-2BxEOXXA8lvw=s176-c-k-c0x00ffffff-no-rj'
            liveThumbnail='https://i2.ytimg.com/vi/11CorwQBbuA/hqdefault.jpg'
          />
          <LiveCard
            channelThumbnail='https://yt3.googleusercontent.com/WO7ItKNmy6tW_NQ82g8c1y74CZSw6GsSdynsE5s2csuEok2fHRrAaGcBV3JJO-2BxEOXXA8lvw=s176-c-k-c0x00ffffff-no-rj'
            liveThumbnail='https://i2.ytimg.com/vi/11CorwQBbuA/hqdefault.jpg'
          />
          <LiveCard
            channelThumbnail='https://yt3.googleusercontent.com/WO7ItKNmy6tW_NQ82g8c1y74CZSw6GsSdynsE5s2csuEok2fHRrAaGcBV3JJO-2BxEOXXA8lvw=s176-c-k-c0x00ffffff-no-rj'
            liveThumbnail='https://i2.ytimg.com/vi/11CorwQBbuA/hqdefault.jpg'
          />
          <Splitter time={new Date()} />
          <LiveCard
            channelThumbnail='https://yt3.googleusercontent.com/WO7ItKNmy6tW_NQ82g8c1y74CZSw6GsSdynsE5s2csuEok2fHRrAaGcBV3JJO-2BxEOXXA8lvw=s176-c-k-c0x00ffffff-no-rj'
            liveThumbnail='https://i2.ytimg.com/vi/11CorwQBbuA/hqdefault.jpg'
          />
          <LiveCard
            channelThumbnail='https://yt3.googleusercontent.com/WO7ItKNmy6tW_NQ82g8c1y74CZSw6GsSdynsE5s2csuEok2fHRrAaGcBV3JJO-2BxEOXXA8lvw=s176-c-k-c0x00ffffff-no-rj'
            liveThumbnail='https://i2.ytimg.com/vi/11CorwQBbuA/hqdefault.jpg'
          />
          <LiveCard
            channelThumbnail='https://yt3.googleusercontent.com/WO7ItKNmy6tW_NQ82g8c1y74CZSw6GsSdynsE5s2csuEok2fHRrAaGcBV3JJO-2BxEOXXA8lvw=s176-c-k-c0x00ffffff-no-rj'
            liveThumbnail='https://i2.ytimg.com/vi/11CorwQBbuA/hqdefault.jpg'
          />
          <LiveCard
            channelThumbnail='https://yt3.googleusercontent.com/WO7ItKNmy6tW_NQ82g8c1y74CZSw6GsSdynsE5s2csuEok2fHRrAaGcBV3JJO-2BxEOXXA8lvw=s176-c-k-c0x00ffffff-no-rj'
            liveThumbnail='https://i2.ytimg.com/vi/11CorwQBbuA/hqdefault.jpg'
          />
          <LiveCard
            channelThumbnail='https://yt3.googleusercontent.com/WO7ItKNmy6tW_NQ82g8c1y74CZSw6GsSdynsE5s2csuEok2fHRrAaGcBV3JJO-2BxEOXXA8lvw=s176-c-k-c0x00ffffff-no-rj'
            liveThumbnail='https://i2.ytimg.com/vi/11CorwQBbuA/hqdefault.jpg'
          />
          <LiveCard
            channelThumbnail='https://yt3.googleusercontent.com/WO7ItKNmy6tW_NQ82g8c1y74CZSw6GsSdynsE5s2csuEok2fHRrAaGcBV3JJO-2BxEOXXA8lvw=s176-c-k-c0x00ffffff-no-rj'
            liveThumbnail='https://i2.ytimg.com/vi/11CorwQBbuA/hqdefault.jpg'
          />
          <LiveCard
            channelThumbnail='https://yt3.googleusercontent.com/WO7ItKNmy6tW_NQ82g8c1y74CZSw6GsSdynsE5s2csuEok2fHRrAaGcBV3JJO-2BxEOXXA8lvw=s176-c-k-c0x00ffffff-no-rj'
            liveThumbnail='https://i2.ytimg.com/vi/11CorwQBbuA/hqdefault.jpg'
          />
          <LiveCard
            channelThumbnail='https://yt3.googleusercontent.com/WO7ItKNmy6tW_NQ82g8c1y74CZSw6GsSdynsE5s2csuEok2fHRrAaGcBV3JJO-2BxEOXXA8lvw=s176-c-k-c0x00ffffff-no-rj'
            liveThumbnail='https://i2.ytimg.com/vi/11CorwQBbuA/hqdefault.jpg'
          />{' '}
          <LiveCard
            channelThumbnail='https://yt3.googleusercontent.com/WO7ItKNmy6tW_NQ82g8c1y74CZSw6GsSdynsE5s2csuEok2fHRrAaGcBV3JJO-2BxEOXXA8lvw=s176-c-k-c0x00ffffff-no-rj'
            liveThumbnail='https://i2.ytimg.com/vi/11CorwQBbuA/hqdefault.jpg'
          />
          <LiveCard
            channelThumbnail='https://yt3.googleusercontent.com/WO7ItKNmy6tW_NQ82g8c1y74CZSw6GsSdynsE5s2csuEok2fHRrAaGcBV3JJO-2BxEOXXA8lvw=s176-c-k-c0x00ffffff-no-rj'
            liveThumbnail='https://i2.ytimg.com/vi/11CorwQBbuA/hqdefault.jpg'
          />
          <LiveCard
            channelThumbnail='https://yt3.googleusercontent.com/WO7ItKNmy6tW_NQ82g8c1y74CZSw6GsSdynsE5s2csuEok2fHRrAaGcBV3JJO-2BxEOXXA8lvw=s176-c-k-c0x00ffffff-no-rj'
            liveThumbnail='https://i2.ytimg.com/vi/11CorwQBbuA/hqdefault.jpg'
          />
          <LiveCard
            channelThumbnail='https://yt3.googleusercontent.com/WO7ItKNmy6tW_NQ82g8c1y74CZSw6GsSdynsE5s2csuEok2fHRrAaGcBV3JJO-2BxEOXXA8lvw=s176-c-k-c0x00ffffff-no-rj'
            liveThumbnail='https://i2.ytimg.com/vi/11CorwQBbuA/hqdefault.jpg'
          />
          <LiveCard
            channelThumbnail='https://yt3.googleusercontent.com/WO7ItKNmy6tW_NQ82g8c1y74CZSw6GsSdynsE5s2csuEok2fHRrAaGcBV3JJO-2BxEOXXA8lvw=s176-c-k-c0x00ffffff-no-rj'
            liveThumbnail='https://i2.ytimg.com/vi/11CorwQBbuA/hqdefault.jpg'
          />
          <LiveCard
            channelThumbnail='https://yt3.googleusercontent.com/WO7ItKNmy6tW_NQ82g8c1y74CZSw6GsSdynsE5s2csuEok2fHRrAaGcBV3JJO-2BxEOXXA8lvw=s176-c-k-c0x00ffffff-no-rj'
            liveThumbnail='https://i2.ytimg.com/vi/11CorwQBbuA/hqdefault.jpg'
          />
          <LiveCard
            channelThumbnail='https://yt3.googleusercontent.com/WO7ItKNmy6tW_NQ82g8c1y74CZSw6GsSdynsE5s2csuEok2fHRrAaGcBV3JJO-2BxEOXXA8lvw=s176-c-k-c0x00ffffff-no-rj'
            liveThumbnail='https://i2.ytimg.com/vi/11CorwQBbuA/hqdefault.jpg'
          />
          <LiveCard
            channelThumbnail='https://yt3.googleusercontent.com/WO7ItKNmy6tW_NQ82g8c1y74CZSw6GsSdynsE5s2csuEok2fHRrAaGcBV3JJO-2BxEOXXA8lvw=s176-c-k-c0x00ffffff-no-rj'
            liveThumbnail='https://i2.ytimg.com/vi/11CorwQBbuA/hqdefault.jpg'
          />
          <LiveCard
            channelThumbnail='https://yt3.googleusercontent.com/WO7ItKNmy6tW_NQ82g8c1y74CZSw6GsSdynsE5s2csuEok2fHRrAaGcBV3JJO-2BxEOXXA8lvw=s176-c-k-c0x00ffffff-no-rj'
            liveThumbnail='https://i2.ytimg.com/vi/11CorwQBbuA/hqdefault.jpg'
          />
          <LiveCard
            channelThumbnail='https://yt3.googleusercontent.com/WO7ItKNmy6tW_NQ82g8c1y74CZSw6GsSdynsE5s2csuEok2fHRrAaGcBV3JJO-2BxEOXXA8lvw=s176-c-k-c0x00ffffff-no-rj'
            liveThumbnail='https://i2.ytimg.com/vi/11CorwQBbuA/hqdefault.jpg'
          />
          <LiveCard
            channelThumbnail='https://yt3.googleusercontent.com/WO7ItKNmy6tW_NQ82g8c1y74CZSw6GsSdynsE5s2csuEok2fHRrAaGcBV3JJO-2BxEOXXA8lvw=s176-c-k-c0x00ffffff-no-rj'
            liveThumbnail='https://i2.ytimg.com/vi/11CorwQBbuA/hqdefault.jpg'
          />
        </CardContainer>
      </div>
    </>
  );
}
