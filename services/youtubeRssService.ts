import Channel from '@/types/entities/channel';
import Video from '@/types/entities/video';

import Parser from 'rss-parser';

const youtubeRssUrl = 'https://www.youtube.com/feeds/videos.xml?channel_id=';

type CustomField = {
  'yt:videoId': string;
};

export class YoutubeRssService {
  private parser: Parser;

  constructor() {
    // 第一テンプレート引数は指定する必要ないが，暗黙的にデフォルト値を指定する方法がわからん
    this.parser = new Parser<any, CustomField>({
      // rss-parserのデフォルトで定義されないフィールドを定義する
      customFields: {
        item: [
          ['yt:videoId', 'videoId'],
          // media:descriptionを直接取得する方法がわからなかったので親要素を取得してたどる
          ['media:group', 'media:group', { keepArray: true }],
        ],
      },
    });
  }

  private async getFeed(channel: Channel) {
    try {
      const feed = await this.parser.parseURL(youtubeRssUrl + channel.channelId);
      return feed;
    } catch (error) {
      // TODO: この辺勉強してちゃんと書く
      console.error(error);
      throw new Error('Failed to get feed');
    }
  }

  async getStreams(channel: Channel): Promise<Video[]> {
    const feed = await this.getFeed(channel);
    const streams = feed.items.map((item) => {
      const descriptionArray = (item['media:group']?.[0]?.['media:description'] as String[]) ?? '';
      const description = descriptionArray.join('');
      const stream: Video = {
        videoId: item.videoId,
        channelId: channel.channelId,
        title: item.title,
        description: description,
        thumbnail: item['media:group']?.[0]?.['media:thumbnail']?.[0]?.$.url,
      };
      return stream;
    });
    return streams.slice(0, 5);
  }
}

const youtubeRssService = new YoutubeRssService();

export default youtubeRssService;
