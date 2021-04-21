export interface Lesson {
	id: number,
	title: string,
	topic: string,
	topicLabel: string,
}

export enum LessonPartResponseType {
	YesNo = "yesNo",
	Proceed = "proceed"
}