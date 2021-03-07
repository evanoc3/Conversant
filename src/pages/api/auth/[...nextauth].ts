import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import type { IAuthSession, IUser } from "@customTypes/auth";


export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, {
  providers: [
    Providers.Email({
      server: process.env.AUTH_SMTP_SERVER!,
      from: process.env.AUTH_SMTP_FROM_ADDR!
    }),
    Providers.Apple({
      clientId: process.env.OAUTH_APPLE_CLIENT_ID!,
      clientSecret: {
        appleId: process.env.OAUTH_APPLE_CLIENT_ID!,
        teamId: process.env.OAUTH_APPLE_TEAM_ID!,
        keyId: process.env.OAUTH_APPLE_KEY_ID!,
        privateKey: process.env.OAUTH_APPLE_PRIVATE_KEY!
      }
    }),
		Providers.Google({
			clientId: process.env.OAUTH_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.OAUTH_GOOGLE_SECRET!
		}),
    Providers.GitHub({
      clientId: process.env.OAUTH_GITHUB_CLIENT_ID!,
      clientSecret: process.env.OAUTH_GITHUB_SECRET!
    })
  ],
  secret: process.env.AUTH_SECRET,
  database: process.env.AUTH_DATABASE,
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    session: async (session: IAuthSession, user: IUser) => {
      if(user?.id) {
        session.user.id = user.id;
      }
      return session;
    }
  }
});