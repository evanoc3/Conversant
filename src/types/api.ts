import type { TopicSearchResult } from "./topic-search"; 
import type { IEnrolledTopicsQueryResultRow } from "./database";


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