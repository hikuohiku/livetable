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
import youtubeApiService from '@/services/youtubeApiService';
import Stream from '@/types/entities/stream';

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

youtubeApiService.getStartAtTime(streams).then((streams) => {
  console.log(streams);
});
*/

/* 確認用
import youtubeApiService from '@/services/youtubeApiService';
import { GoogleUser } from '@/types/entities/user';

const user: GoogleUser = {
  uuid: '1',
  email: '1',
  token: 'ya29.a0AfB_byDXvXIQT2VdyMYtBd5Luf9n0sGaQTEfljNu2GO5bYk0icC1A1djxUvd5kIhav5flnlOU0MJHEo13oNxpuYdAbB_F9bp7Hfc-BBGP-dMpJRm1N_kmaMJQEmQyHzmJ4drSbyHWlxr5Lm-N3TLf-IoGMcDJmROzVpnaCgYKAcMSARMSFQHGX2MiJwtAblXIf7f5574vT1pScQ0171',
};

youtubeApiService.getSubscription(user).then((subscriptions) => {
  console.log(subscriptions);
});
*/

/* 確認用
import youtubeApiService from '@/services/youtubeApiService';
import Channel from '@/types/entities/channel';

const channel: Channel = {
  channelId: 'UCIBY1ollUsauvVi4hW4cumw',
};

youtubeApiService.getChannel([channel]).then((channel) => {
  console.log(channel);
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