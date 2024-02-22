import * as React from 'react';
import { AppBar } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

/* 確認用
import youtubeRssService from '@/services/youtubeRssService';

youtubeRssService.getStreams({ channelId: 'UCt30jJgChL8qeT9VPadidSw' }).then((streams) => {
  console.log(streams);
}
);
*/

/* 確認用
import { getStartAtTime } from '@/services/youtubeApiService';
import Stream from '@/types/stream';

const streams: Stream[] = [
  {
    videoId: 'zoHoVtb-yww',
    channelId: 'UCvaTdHTWBGv3MKj3KVqJVCw',
  },
  {
    videoId: 'T0-I9G9w7hA',
    channelId: 'UCvaTdHTWBGv3MKj3KVqJVCw',
  },
];

getStartAtTime(streams).then((streams) => {
  console.log(streams);
});
*/

export default function Page() {
  return (
    <AppBar>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h5" noWrap component="div" sx={{ flexGrow: 1 }}>
          livetable
        </Typography>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}