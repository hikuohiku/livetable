import React from 'react';

import Channel from '@/types/entities/channel';
import Video from '@/types/entities/video';

import LiveCard from './LiveCard';
import Splitter from './Splitter';

interface LiveTableProps {
  channels?: (Channel | null)[] | null;
  lives?: Video[] | null;
}

const LiveTable = ({ lives, channels }: LiveTableProps) => {
  const livesSortedByStartAt = lives?.toSorted((a, b) =>
    a.startAt ? (b.startAt ? a.startAt.getTime() - b.startAt.getTime() : -1) : 1,
  );
  const livesStreamingNow = livesSortedByStartAt?.filter((live) => {
    return live.liveStatus === 'live';
  });
  const livesUpcoming = livesSortedByStartAt?.filter((live) => {
    return live.liveStatus === 'upcoming';
  });
  const livesUpcomingGroupedByStartAtHour = livesUpcoming?.reduce<Record<string, Video[]>>((arr, live) => {
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

  return livesStreamingNow || livesUpcomingGroupedByStartAtHour ? (
    <div className='flex flex-col ml-12 min-w-[304px] flex-1'>
      {livesStreamingNow && <LiveGroup lives={livesStreamingNow} channels={channels} />}
      {livesUpcomingGroupedByStartAtHour &&
        Object.entries(livesUpcomingGroupedByStartAtHour).map(([key, values]) => {
          return (
            <React.Fragment key={key}>
              {values[0]?.startAt && <Splitter time={new Date(values[0].startAt.setMinutes(0, 0, 0))} />}
              <LiveGroup lives={values} channels={channels} />
            </React.Fragment>
          );
        })}
    </div>
  ) : (
    <></>
  );
};

interface LiveGroupProps extends LiveTableProps {}

const LiveGroup = ({ lives, channels }: LiveGroupProps) => {
  const livesSortedByStartAt =
    lives &&
    lives.flat().toSorted((a, b) => (a.startAt ? (b.startAt ? a.startAt.getTime() - b.startAt.getTime() : -1) : 1));
  return livesSortedByStartAt && livesSortedByStartAt.length != 0 ? (
    <div className='flex flex-wrap flex-1'>
      {livesSortedByStartAt.map((live) => {
        return (
          <LiveCard
            key={live.videoId}
            channel={channels && channels.find((channel) => channel?.channelId === live.channelId)}
            live={live}
          />
        );
      })}
    </div>
  ) : (
    <></>
  );
};

export default LiveTable;
