import Video from "@/types/entities/video";

import LiveCard from "./LiveCard";

import type { Meta, StoryObj } from "@storybook/react";



const meta = {
  title: "LiveCard",
  component: LiveCard,
} satisfies Meta<typeof LiveCard>;

const channel = {
  channelId: "UC_vMYWcDjmfdpH6r4TTn1MQ",
  channelName: "Iroha ch. 風真いろは - holoX -",
  handle: null,
  thumbnail:
    "https://yt3.ggpht.com/IzJcA0QlV4JwWH9yXi7Voa3359fHUB182xd_xxs92xd_3kuw_pa45dKeyQ9hvKl_1OhwbT6M3g=s88-c-k-c0x00ffffff-no-rj",
};
const live = {
  videoId: "7K5lUvMrjik",
  channelId: "UC0TXe_LYZ4scaW2XMyi5_kw",
  title:
    "【111万人耐久歌枠】1,111,111人目指して歌う！！！！！カラオケJOYSOUND for STREAMER / SINGING STREAM【ホロライブ / AZKi】",
  description: "1,111,111人の瞬間を皆と迎えたい！\n" +
    "チャンネル登録ぜひよろしくお願いします！！！\n" +
    "\n" +
    "┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n" +
    "\n" +
    "提供︓XING INC.\n" +
    "※JOYSOUND音源を使用しているため本動画の切り抜きはご遠慮ください。\n" +
    "--------------------------------------------------------------------------------------\n" +
    "JOYSOUNDがお届けする「ライブ配信のためのカラオケ」、始まります。\n" +
    "「カラオケJOYSOUND for STREAMER」\n" +
    "▼Steam製品ページはこちら︕\n" +
    "https://store.steampowered.com/app/2939590/JOYSOUND_for_STREAMER/\n" +
    "--------------------------------------------------------------------------------------\n" +
    "▼Xで情報発信しています︕\n" +
    "https://x.com/joysound_skara\n" +
    "#ストリーマーカラオケ#JOYSOUND\n" +
    "\n" +
    "┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n" +
    "\n" +
    "サムネイラスト：シマダ 様\n" +
    "https://x.com/Odddddd64\n" +
    "\n" +
    "┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n" +
    "\n" +
    "【最新情報 / News】\n" +
    "\n" +
    "🌟AZKi Major Debut LiVE「声音エントロピー」追加公演\n" +
    "2024年9月17日(火)＆9月18日(水) 豊洲PIT\n" +
    "\n" +
    "▼アーカイブ DAY1＆DAY2 配信中！　\n" +
    "https://virtual.spwn.jp/_events/evt_RIqkGKv7TuVixfemtR8S\n" +
    "\n" +
    "・スペシャルプライス 3,900円！✨\n" +
    "・販売期間：10/20(日) 20:00まで\n" +
    "・視聴期間：10/20(日) 23:59まで\n" +
    "\n" +
    "🌟AZKi メジャー1stアルバム「Route If」7月24日リリース！\n" +
    "特設サイト：https://www.jvcmusic.co.jp/AZKi/65984/\n" +
    "配信リンク：https://azki.lnk.to/route_If\n" +
    "\n" +
    "【ハッシュタグ】\n" +
    "・アルバム：#ルートAZKi\n" +
    "・ライブ：#AZKiワンマン \n" +
    "\n" +
    "┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n" +
    "\n" +
    "💐AZKi 2024生誕グッズ💐\n" +
    "https://shop.hololivepro.com/products/azki_bd2024\n" +
    "\n" +
    "🌟ホロライブ公式スタンプ「AZKi」 \n" +
    "https://line.me/S/sticker/24738748\n" +
    "\n" +
    "🎙AZKi 最新ボイス\n" +
    "🎃ハロウィンボイス2024 -with villains-\n" +
    "https://shop.hololivepro.com/products/hololive_halloweenvoice2024_villains\n" +
    "🌕️日常ささやき「一緒にお月見」ボイス\n" +
    "https://shop.hololivepro.com/products/hololive_asmr_underthefullmoon\n" +
    "❤️‍🩹デレの極ボイス（ヤンデレボイス）\n" +
    "https://shop.hololivepro.com/products/hololive_4types_extremelovevoice\n" +
    "☕ASMRボイス(長編)「癒しカフェでのひととき」\n" +
    "https://shop.hololivepro.com/products/azki_asmr_cafechillin\n" +
    "👻日常ささやき「一緒にホラー体験」\n" +
    "https://shop.hololivepro.com/products/hololive_asmr_iscream_youscream\n" +
    "🍀ASMRボイス(コラボ)「天使の止まり木」\n" +
    "https://shop.hololivepro.com/products/hololive_asmr_angelsperch\n" +
    "\n" +
    "🧸AZKi ぬいぐるみ\n" +
    "「hololive friends with u AZKi」\n" +
    "https://shop.hololivepro.com/products/hololivefriends_azki\n" +
    "「hololive friends to Go AZKi」*持ち運びがしやすいサイズ\n" +
    "https://shop.hololivepro.com/products/hololivefriends_togo_azki\n" +
    "\n" +
    "🛒AZKi 関連グッズ\n" +
    "https://shop.hololivepro.com/collections/azki\n" +
    "\n" +
    "┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n" +
    "\n" +
    "🔻AZKiの関する情報はこちらから🔻\n" +
    "\n" +
    "⚒ AZKiのX (旧Twitter)\n" +
    "https://x.com/AZKi_VDiVA/\n" +
    "\n" +
    "🎶 AZKiのTikTok\n" +
    "https://www.tiktok.com/@azki_hololive\n" +
    "\n" +
    "📒 AZKiの公式プロフィール\n" +
    "https://hololive.hololivepro.com/talents/azki/\n" +
    "\n" +
    "┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n" +
    "\n" +
    "【開拓者組合(Membership)特典（¥490/月）】\n" +
    "https://www.youtube.com/channel/UC0TXe_LYZ4scaW2XMyi5_kw/join\n" +
    "\n" +
    "・バッジ・カスタム絵文字\n" +
    "　├コメントとチャットでユーザー名の横に表示するメンバー用バッジ\n" +
    "　└コメントやチャットで使えるカスタム絵文字\n" +
    "・メンバー限定マンスリー画像\n" +
    "　└毎月メンバー限定の画像をプレゼントします\n" +
    "・新曲の先行公開\n" +
    "　└毎月メンバー限定で未公開＆制作中音源の先行公開します\n" +
    "・メンバー限定配信\n" +
    "　└メンバー限定の配信を視聴できます\n" +
    "・AZKiの開拓日記\n" +
    "　└AZKiの日記を公開します\n" +
    "\n" +
    "┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n" +
    "\n" +
    "【ハッシュタグ】\n" +
    "\n" +
    "ファンアート：#AZKiART\n" +
    "ファンネーム：#開拓者\n" +
    "配信タグ：#あずきんち\n" +
    "ホロリー＆聖地巡礼：#どこAZ\n" +
    "楽曲感想：#AZ歌\n" +
    "ボイス感想：#AZ声\n" +
    "ショート：#ぷちあず\n" +
    "マイクラ案：#AZ基地\n" +
    "その他タグ：#AZKi\n" +
    "ファンマーク：⚒\n" +
    "\n" +
    "※ファンアートはサムネで使用させていただく場合があります！\n" +
    "\n" +
    "┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n" +
    "\n" +
    "【配信に関するクレジット】\n" +
    "\n" +
    "OP/ED映像：シマダ 様　https://x.com/Odddddd64\n" +
    "OP/ED音楽：Twinfield 様　https://x.com/Twinfieldnex\n" +
    "配信部屋：となりける 様　https://x.com/keru720\n" +
    "\n" +
    "┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n" +
    "\n" +
    "✉お手紙はこちら\n" +
    "\n" +
    "〒173-0003\n" +
    "東京都板橋区加賀1丁目6番1号\n" +
    "ネットデポ新板橋\n" +
    "カバー株式会社　プレゼント係分　AZKi宛\n" +
    "\n" +
    "詳細・問い合わせ\n" +
    "https://www.hololive.tv/contact\n" +
    "\n" +
    "┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n" +
    "\n" +
    "ホロライブ公式YouTubeチャンネル▷ https://www.youtube.com/channel/UCJFZiqLMntJufDCHc6bQixg\n" +
    "ホロライブ公式Twitter▷ https://x.com/hololivetv\n" +
    "ホロライブ公式サイト▷ https://hololive.hololivepro.com/\n" +
    "ホロジュール▷ https://schedule.hololive.tv/\n" +
    "オンラインショップ▷ https://shop.hololivepro.com/\n" +
    "\n" +
    "※ホロライブプロダクションから未成年の視聴者の方々へのお願い\n" +
    "[カバー 未成年者の方々へ]で検索してお読みいただくか、下記リンクをご確認の上、お楽しみください。\n" +
    "https://hololivepro.com/request-to-minors/",
  url: null,
  thumbnail: "https://i4.ytimg.com/vi/7K5lUvMrjik/hqdefault.jpg",
  startAt: new Date("2024-10-09T10:02:02.000Z"),
  endAt: null,
  liveStatus: "live",
} as Video;

export const Default: StoryObj<typeof meta> = {
  args: {
    live,
    channel,
  },
};
export default meta;
