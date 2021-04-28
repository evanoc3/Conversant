import { LessonPartResponseType } from "@customTypes/lesson";


/**
 * Typescript interface for the Schema of the `lessons` table of the database.
 */
export interface ILessonsTableRow {
	id: number,
	topic: string,
	title: string,
	description: string
}


/**
 * Typescript interface for the Schema of the `topics` table of the database.
 */
export interface ITopicsTableRow {
	id: string,
	label: string,
	description: string | null
}


/**
 * Typescript interface for the Schema of the `lesson_parts` table in the database
 */
export interface ILessonPartsTableRow {
	id: number,
	lesson: number,
	part: number,
	content: string,
	type: LessonPartResponseType,
	proceedTo: number | null,
	onYes: number | null,
	onNo: number | null
}


/**
 * Typescript interface for the Schema of the `sessions` table in the database.
 */
export interface ISessionsTableRow {
	id: number,
	user_id: number,
	expires: string,
	session_token: string,
	access_token: string,
	created_at: string,
	updated_at: string
}


/**
 * Typescript interface for the schema of the `users` table in the database.
 */
export interface IUsersTableRow {
	id: number,
	name: string,
	email: string,
	email_verified: string,
	image: string,
	created_at: string,
	updated_at: string
}