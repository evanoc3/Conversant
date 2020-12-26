export namespace Login {
	export interface SuccessPayload {
		auth_token: string,
		success: true,
		user_id: number
	}

	export interface FailedPayload {
		success: false,
		user_id: number
	}

	export interface Response {
		login: SuccessPayload | FailedPayload,
		timstamp: string
	}
}