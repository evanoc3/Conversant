import NextAuth from "next-auth";
import { TypeORMAdapter } from "@auth/typeorm-adapter";
import EmailProvider from "next-auth/providers/email";
import AppleProvider from "next-auth/providers/apple";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import type { IAuthSession, IUser } from "@customTypes/auth";


interface SessionParams {
  session: IAuthSession
  user: IUser
}


export default NextAuth({
  providers: [
    EmailProvider({
      server: process.env.AUTH_SMTP_SERVER!,
      from: process.env.AUTH_SMTP_FROM_ADDR!
    }),
    AppleProvider({
      clientId: process.env.OAUTH_APPLE_CLIENT_ID!,
      clientSecret: process.env.OAUTH_APPLE_PRIVATE_KEY!
    }),
		GoogleProvider({
			clientId: process.env.OAUTH_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.OAUTH_GOOGLE_SECRET!
		}),
    GitHubProvider({
      clientId: process.env.OAUTH_GITHUB_CLIENT_ID!,
      clientSecret: process.env.OAUTH_GITHUB_SECRET!
    })
  ],
  secret: process.env.AUTH_SECRET,
  // @ts-ignore
  adapter: TypeORMAdapter(process.env.AUTH_DATABASE!),
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    session: async ({ session, user }: SessionParams) => {
      if(user?.id) {
        session.user!.id = user.id;
      }
      return session;
    }
  }
});
