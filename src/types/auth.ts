import type { User as NextAuthUser } from "next-auth";
import type { SessionBase as NextAuthSessionBase } from "next-auth/_utils";


export interface IUser extends NextAuthUser {
	id?: string
}

export interface IAuthSession extends NextAuthSessionBase {
	user: IUser
}



