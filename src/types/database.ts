/**
 * Typescript interface for the Schema of the `enrolments` table of the database.
 */
export interface IEnrolmentsTableRow {
	id: number,
	userId: number,
	topic: string,
	timestamp: Date | string,
	currentLesson: number
}


/**
 * Typescript interface for the Schema of the `lessons` table of the database.
 */
export interface ILessonsTableRow {
	id: number,
	topic: string,
	title: string,
	description: string,
	content: string,
	preceededBy: number | null,
	followedBy: number | null
}


/**
 * Typescript interface for the Schema of the `topics` table of the database.
 */
export interface ITopicsTableRow {
	id: string,
	label: string,
	description: string | null
}