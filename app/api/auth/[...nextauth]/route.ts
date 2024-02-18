import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!clientId) {
  throw new Error("GOOGLE_CLIENT_ID is not set");
}
if (!clientSecret) {
  throw new Error("GOOGLE_CLIENT_SECRET is not set");
}

const prisma = new PrismaClient();

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: clientId,
      clientSecret: clientSecret,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      // サインインのときだけ発火
      if (account && account.provider === "google" && profile) {
        const uuid = token.uuid ? token.uuid as string : uuidv4();
        const email = profile.email as string;
        const name = profile.name as string;

        const user = await prisma.user.upsert({
          where: { email: email },
          update: { name: name },
          create: { uuid: uuid, email: email, name: name },
        })

        const userId = user.uuid;
        const refreshToken = account.refresh_token as string;
        const accessToken = account.access_token as string;

        await prisma.googleUser.upsert({
          where: { userId: userId },
          update: { refreshToken: refreshToken, accessToken: accessToken },
          create: { userId: userId, refreshToken: refreshToken, accessToken: accessToken },
        })

        token = {
          ...token,
          uuid: user.uuid,
        }
        return token;
      }

      return token;
    }
  }
});

export { handler as GET, handler as POST };