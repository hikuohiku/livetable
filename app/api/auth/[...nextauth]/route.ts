import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import userRepository from '@/services/repositories/userRepository';
import { googleUserRepository } from '@/services/repositories/userRepository';

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
      // profileはサインイン時のみ存在する
      if (account && account.provider === 'google' && account.access_token && profile && profile.email) {
        // ユーザー情報をDBに保存
        // usersテーブル
        const email = profile.email;
        const name = profile.name;

        const user = await userRepository.upsertByEmail(email, name);

        // google_usersテーブル
        const accessToken = account.access_token;

        await googleUserRepository.upsert({
          ...user,
          token: accessToken,
        });

        // JWTにユーザーidを追加
        token = {
          ...token,
          uuid: user.uuid,
        };
        return token;
      }

      // TODO: エラーハンドリング
      throw new Error('jwt callback error');
    },
  },
});

export { handler as GET, handler as POST };
