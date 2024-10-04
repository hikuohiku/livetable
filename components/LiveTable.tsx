import { getServerSession } from 'next-auth';
import React, { ReactNode } from 'react';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import channelRepository from '@/services/repositories/channelRepository';
import userRepository, { subscriptionRepository } from '@/services/repositories/userRepository';
import videoRepository from '@/services/repositories/videoRepository';
import Video from '@/types/entities/video';

import LiveCard from './LiveCard';
import Splitter from './Splitter';


const LiveTable = async () => {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  const user = email && (await userRepository.findByEmail(email));
  const subscriptions = user && (await subscriptionRepository.findByUser(user));
  const channels =
    subscriptions &&
    (await Promise.all(
      subscriptions.map(async (subscription) => {
        return channelRepository.findByChannelId(subscription.channelId);
      }),
    ));
  const lives =
    subscriptions &&
    (await Promise.all(
      subscriptions.map(async (subscription) => {
        return videoRepository.findByChannelId(subscription.channelId).then((lives) =>
          lives.filter((live) => {
            return live.liveStatus === 'live' || live.liveStatus === 'upcoming';
          }),
        );
      }),
    ));
  const livesSortedByStartAt =
    lives &&
    lives.flat().toSorted((a, b) => (a.startAt ? (b.startAt ? a.startAt.getTime() - b.startAt.getTime() : -1) : 1));
  const livesGroupedByStartAtHour =
    livesSortedByStartAt &&
    livesSortedByStartAt.reduce<Record<string, Video[]>>((arr, live) => {
      const date = live.startAt?.toISOString().split('T')[0];
      const hour = live.startAt?.getHours();
      if (!date || !hour) {
        return arr;
      }
      const key = `${date} ${hour}`;
      if (!arr[key]) {
        arr[key] = [];
      }
      arr[key].push(live);
      return arr;
    }, {});

  return livesGroupedByStartAtHour ? (
    <CardContainer>
      {Object.entries(livesGroupedByStartAtHour).map(([key, values]) => {
        return (
          <React.Fragment key={key}>
            {values[0]?.startAt && <Splitter time={new Date(values[0].startAt.setMinutes(0, 0, 0))} />}
            {values.map((live) => {
              return (
                <LiveCard
                  key={live.videoId}
                  channel={
                    channels
                      ? channels.find((channel) => channel?.channelId === live.channelId) ?? undefined
                      : undefined
                  }
                  live={live}
                />
              );
            })}
          </React.Fragment>
        );
      })}
    </CardContainer>
  ) : (
    <div />
  );
};

export default LiveTable;
