import NextAuth from "next-auth/next";
import { getServerSession } from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!clientId) {
  throw new Error("GOOGLE_CLIENT_ID is not set");
}
if (!clientSecret) {
  throw new Error("GOOGLE_CLIENT_SECRET is not set");
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: clientId,
      clientSecret: clientSecret,
    }),
  ],
});

export { handler as GET, handler as POST };