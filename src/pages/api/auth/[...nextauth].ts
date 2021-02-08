import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";


export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, {
  providers: [
    Providers.Email({
      server: process.env.AUTH_SMTP_SERVER!,
      from: process.env.AUTH_SMTP_FROM_ADDR!
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
});