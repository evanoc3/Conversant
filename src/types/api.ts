interface BaseApiResponse {
	timestamp: string
}

export type ErrorApiResponse = BaseApiResponse & {
	error: string,
	stack?: string
}

export type ApiResponse<P> = ErrorApiResponse | (BaseApiResponse & P)