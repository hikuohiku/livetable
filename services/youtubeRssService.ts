import Channel from "@/types/entities/channel";
import Stream from "@/types/entities/stream";

import Parser from "rss-parser";

const youtubeRssUrl = "https://www.youtube.com/feeds/videos.xml?channel_id=";

type CustomField = {
  "yt:videoId": string;
};

export class YoutubeRssService {
  private parser: Parser;

  constructor() {
    // 第一テンプレート引数は指定する必要ないが，暗黙的にデフォルト値を指定する方法がわからん
    this.parser = new Parser<any, CustomField>({
      // rss-parserのデフォルトで定義されないフィールドを定義する
      customFields: {
        item: [
          ["yt:videoId", "videoId"],
          // media:descriptionを直接取得する方法がわからなかったので親要素を取得してたどる
          ["media:group", "media:group", { keepArray: true }],
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
      throw new Error("Failed to get feed");
    }
  }

  async getStreams(channel: Channel): Promise<Stream[]> {
    const feed = await this.getFeed(channel);
    const streams = feed.items.map((item) => {
      const stream: Stream = {
        videoId: item.videoId,
        channelId: channel.channelId,
        title: item.title,
        description: item["media:group"]?.[0]?.["media:description"] ?? "",
      };
      return stream;
    });
    return streams;
  }

}

const youtubeRssService = new YoutubeRssService();

export default youtubeRssService;
