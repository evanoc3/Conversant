export interface TopicSearchResult {
	label: string,
	id: string
}

export type GetTopicsApiRouteResponse = {
	timestamp: string,
	error: string
} | {
	timestamp: string,
	results: TopicSearchResult[]
}