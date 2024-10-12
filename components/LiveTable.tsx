'use client';
import React, { useSyncExternalStore } from 'react';

import Channel from '@/types/entities/channel';
import Video from '@/types/entities/video';

import LiveCard from './LiveCard';
import Splitter from './Splitter';

interface LiveTableProps {
  channels?: (Channel | null)[] | null;
  lives?: Video[] | null;
}

const LiveTable = ({ lives, channels }: LiveTableProps) => {
  const tableRef = React.useRef<HTMLDivElement>(null);

  const subscribeResize = React.useCallback((onResize: () => void) => {
    const observer = new ResizeObserver(onResize);
    if (tableRef.current) {
      observer.observe(tableRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);
  const tableColumnCount = useSyncExternalStore(
    subscribeResize,
    () => {
      return tableRef.current?.clientWidth && Math.floor(tableRef.current?.clientWidth / 288);
    },
    () => undefined,
  );

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
    <div ref={tableRef} className='flex flex-col w-full max-w-screen-xl ml-12 gap-2'>
      {livesStreamingNow && <LiveGroup lives={livesStreamingNow} channels={channels} columns={tableColumnCount} />}
      {livesUpcomingGroupedByStartAtHour &&
        Object.entries(livesUpcomingGroupedByStartAtHour).map(([key, values]) => {
          return (
            <React.Fragment key={key}>
              {values[0]?.startAt && <Splitter time={new Date(values[0].startAt.setMinutes(0, 0, 0))} />}
              <LiveGroup lives={values} channels={channels} columns={tableColumnCount} />
            </React.Fragment>
          );
        })}
    </div>
  ) : (
    <></>
  );
};

interface LiveGroupProps extends LiveTableProps {
  columns?: number;
}

const LiveGroup = ({ lives, channels, columns }: LiveGroupProps) => {
  const gridStyle = columns
    ? { gridTemplateColumns: `repeat(${columns}, minmax(288px, 1fr))` }
    : { gridTemplateColumns: `repeat('auto-fit', minmax(288px, 1fr))`, visibility: 'hidden' as const };
  const livesSortedByStartAt =
    lives &&
    lives.flat().toSorted((a, b) => (a.startAt ? (b.startAt ? a.startAt.getTime() - b.startAt.getTime() : -1) : 1));
  return livesSortedByStartAt && livesSortedByStartAt.length != 0 ? (
    <div className={`grid gap-4 px-4`} style={gridStyle}>
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
