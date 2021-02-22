export interface IEnrolmentsTableRow {
	id: number,
	userId: number,
	topic: string,
	timestamp: Date | string
}


export interface ILessonsTableRow {
	id: number,
	topic: string,
	title: string,
	content: string,
	preceededBy: number | null,
	followedBy: number | null
}


export interface ITopicsTableRow {
	id: string,
	label: string
}


export interface IEnrolledTopicsQueryResultRow extends ITopicsTableRow {
	timestamp: Date | string
}