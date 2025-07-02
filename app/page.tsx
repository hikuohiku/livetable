import { getServerSession } from "next-auth";
import { Suspense } from "react";

import { authOptions } from "./api/auth/[...nextauth]/route";

import Header from "@/components/Header";
import LiveTable from "@/components/LiveTable";
import LoginButton from "@/components/LoginButton";
import userApiService from "@/services/api/userService";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  
  let googleUser = null;
  let subscriptions = [];
  let channels = [];
  let lives = [];

  if (email) {
    try {
      const userData = await userApiService.getUserWithData(email);
      googleUser = userData.user;
      subscriptions = userData.subscriptions;
      channels = userData.channels;
      lives = userData.videos;
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  }

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
