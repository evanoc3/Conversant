import type { User as NextAuthUser } from "next-auth";
import type { SessionBase as NextAuthSessionBase } from "next-auth/_utils";
import { IUserProfile } from "./profile";


export interface IUser extends NextAuthUser {
	id?: string
}

export interface IAuthSession extends NextAuthSessionBase {
	user: IUser
}

export interface IUserDocument {
	name: string | null,
	email: string | null,
	image: string | null,
	createdAt: Date,
	updatedAt: Date,
	emailVerified: boolean,
	profile: IUserProfile
}



