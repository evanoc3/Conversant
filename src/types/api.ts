import type { TopicSearchResult } from "./topic-search"; 
import type { IEnrolledTopicsQueryResultRow } from "./database";
import type { Lesson } from "./lesson";


export interface BaseApiResponse {
	timestamp: string
}

export interface ErrorApiResponse {
	error: string
}


interface ErrorApiRouteResponse {
	timestamp: string,
	error: string
}


export type GetTopicsApiRouteResponse = ErrorApiRouteResponse | {
	timestamp: string,
	results?: TopicSearchResult[]
}


export type GetMyTopicsApiRouteResponse = ErrorApiRouteResponse | {
	timestamp: string,
	userId: number,
	enrolledTopics: IEnrolledTopicsQueryResultRow[]
}


export type GetLessonApiRouteResponse = ErrorApiRouteResponse | {
	timestamp: string,
	lesson: Lesson
}