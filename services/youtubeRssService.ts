import Channel from "@/types/channel";
import Stream from "@/types/stream";

import Parser from "rss-parser";

const youtubeRssUrl = "https://www.youtube.com/feeds/videos.xml?channel_id=";

type CustomField = {
  "yt:videoId": string;
};

export class YoutubeRssService {
  private parser: Parser;

  constructor() {
    this.parser = new Parser<any, CustomField>({
      customFields: {
        item: [
          ["yt:videoId", "videoId"],
          ["media:group", "media:group", { keepArray: true }],
        ],
      },
    });
  }

  private async getFeed(channel: Channel) {
    const feed = await this.parser.parseURL(youtubeRssUrl + channel.channelId);
    return feed;
  }

  async getStreams(channel: Channel): Promise<Stream[]> {
    const feed = await this.getFeed(channel);
    const streams = feed.items.map((item) => {
      const stream: Stream = {
        videoId: item.videoId,
        channelId: channel.channelId,
        title: item.title,
        description: item["media:group"][0]["media:description"],
      };
      return stream;
    });
    return streams;
  }

}

const youtubeRssService = new YoutubeRssService();

export default youtubeRssService;
