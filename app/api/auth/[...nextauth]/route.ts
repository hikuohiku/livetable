import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import prisma from '@/lib/prismaClient';

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!clientId) {
  throw new Error('GOOGLE_CLIENT_ID is not set');
}
if (!clientSecret) {
  throw new Error('GOOGLE_CLIENT_SECRET is not set');
}

const handler = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: clientId,
      clientSecret: clientSecret,
      authorization: {
        params: {
          // access_type: 'offline',
          scope: 'openid email profile https://www.googleapis.com/auth/youtube.readonly',
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      // サインインのときだけ発火
      if (account && account.provider === 'google' && profile) {
        if (!(profile.email && profile.name)) {
          throw new Error('email and name are required');
        }

        const email = profile.email;
        const name = profile.name;
        const user = await prisma.user.upsert({
          where: { email },
          update: { name },
          create: { email, name },
        });

        const refreshToken = account.refresh_token as string;
        const accessToken = account.access_token;
        // console.log('accessToken', accessToken);

        if (!accessToken) {
          throw new Error('accessToken is required');
        }

        const userId = user.uuid;

        try {
          await prisma.googleUser.upsert({
            where: { userId },
            update: refreshToken ? { accessToken, refreshToken } : { accessToken },
            create: {
              userId,
              refreshToken,
              accessToken,
            },
          });
        } catch (e) {
          console.error(e);
          // TODO: ここにサインアップ時にリフレッシュトークンが帰ってこなかったときのエラー処理を書く
          // ユーザー側のOAuthの登録を解除とかしないといけない気がする．
        }

        token = {
          ...token,
          uuid: user.uuid,
        };
        return token;
      }

      return token;
    },
  },
});

export { handler as GET, handler as POST };
