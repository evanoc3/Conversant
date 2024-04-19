import type { Session, DefaultUser } from "next-auth";


export interface IUser extends DefaultUser {
	id: string
}


export interface IAuthSession extends Session {
	user?: IUser
}
