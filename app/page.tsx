import { getServerSession } from "next-auth";
import { Suspense } from "react";

import Header from "@/components/Header";
import LiveTable from "@/components/LiveTable";
import LoginButton from "@/components/LoginButton";
import channelRepository from "@/services/repositories/channelRepository";
import userRepository, {
  googleUserRepository,
  subscriptionRepository,
} from "@/services/repositories/userRepository";
import videoRepository from "@/services/repositories/videoRepository";

import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  const user = email == undefined || email == null
    ? email
    : await userRepository.findByEmail(email);
  const googleUser = user && (await googleUserRepository.find(user));
  const subscriptions = user && (await subscriptionRepository.findByUser(user));
  const channels = subscriptions &&
    (await Promise.all(
      subscriptions.map(async (subscription) => {
        return channelRepository.findByChannelId(subscription.channelId);
      }),
    ));
  const lives = subscriptions &&
    (
      await Promise.all(
        subscriptions.map(async (subscription) => {
          return videoRepository.findByChannelId(subscription.channelId).then((
            lives,
          ) =>
            lives.filter((live) => {
              return live.liveStatus === "live" ||
                live.liveStatus === "upcoming";
            })
          );
        }),
      )
    ).flat();
  return (
    <>
      <Header user={googleUser} />
      <div className="relative flex flex-column justify-center top-16 mx-4">
        {!session && <LoginButton />}
        <Suspense>
          <LiveTable lives={lives} channels={channels} />
        </Suspense>
      </div>
    </>
  );
}
