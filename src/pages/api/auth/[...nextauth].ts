import NextAuth from "next-auth";
import PostgresAdapter from "@auth/pg-adapter";
import { Pool } from "pg";
import EmailProvider from "next-auth/providers/email";
import AppleProvider from "next-auth/providers/apple";
import GoogleProvider from "next-auth/providers/google";
import type { IAuthSession, IUser } from "@customTypes/auth";
import type { NextApiRequest, NextApiResponse } from "next";


interface SessionParams {
  session: IAuthSession
  user: IUser
}


export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  // @ts-ignore
  return await NextAuth(req, res, {
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
      })
    ],
    secret: process.env.AUTH_SECRET,
    adapter: PostgresAdapter(new Pool({
      connectionString: process.env.DATABASE!,
      max: 5
    })),
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
}
