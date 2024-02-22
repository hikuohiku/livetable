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

/* 確認用
import { getSubscription } from '@/services/youtubeApiService';
import { GoogleUser } from '@/types/user';

const user: GoogleUser = {
  uuid: '1',
  email: '1',
  token: 'ya29.a0AfB_byBMBWacOsdbA7OLFFfaTgRt7jYww8MGl7ez659sqKu4yG0VgvW2_s-y4cDLR5t3_mb_sB84yx5sTjReXX0Kv8jjdV6rOSJc__F1LitFSQPkxNJ5zPMx6-tuXMR-f4C_DW7ic6jP50tfmnCBa_vIylCDs_eP3iKEaCgYKAcMSARMSFQHGX2MiKwv9KQrlJGgcgtJQUd9_0g0171',
};

getSubscription(user).then((subscription) => {
  console.log(subscription);
});
*/

/* 確認用
import { getChannel } from '@/services/youtubeApiService';
import Channel from '@/types/channel';

const channel: Channel = {
  channelId: 'UCIBY1ollUsauvVi4hW4cumw',
};

getChannel([channel]).then((channel) => {
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