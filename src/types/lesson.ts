export interface Lesson {
	id: number,
	title: string,
	topic: string,
	content: string | LessonChunkTypes.Base[]
}


export namespace LessonChunkTypes {
	export interface Base {}

	export interface Statement extends Base {
		message: string
	}

	export interface Question extends Base {
		message: string,
		answers: any[]
	}

	export interface MultipleChoice extends Base {
		message: string | undefined,
		choices: any[]
	}

}