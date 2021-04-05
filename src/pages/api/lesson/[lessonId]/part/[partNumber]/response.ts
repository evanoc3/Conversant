import type { NextApiRequest, NextApiResponse } from "next";
import type { ApiResponse } from "@customTypes/api";


export type Response = ApiResponse<{
	youSaid: string
}>


export default function LessonPartsResponseApiRoute(req: NextApiRequest, res: NextApiResponse) {
	try { 
		// Ensure only POST requests are accepted
		if(req.method !== "POST") {
			throw new Error("This endpoint only accepts POST requests");
		}

		// Ensure that requests have the required fields
		if(!("message" in req.body)) {
			throw new Error("Request must have a \"message\" field in the body");
		}

		const messageResponse = req.body["message"] as string;

		// Send happy-path response
		res.status(200).json({
			timestamp: (new Date()).toISOString(),
			youSaid: messageResponse
		} as Response);
	}
	catch(err) {
		// In the event of any error while processing the request, send an error response
		res.status(500).json({
			timestamp: (new Date()).toISOString(),
			error: (err as Error).message
		} as Response);
	}
	finally {
	}
};