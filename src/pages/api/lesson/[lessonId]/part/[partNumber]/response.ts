import { connectToDatabase } from "@util/database";
import { getLessonPart } from "@pages/api/lesson/[lessonId]/part/[partNumber]/index";
import { getDoYouUnderstandResponseClassifier } from "@util/classifiers";

import type { NextApiRequest, NextApiResponse } from "next";
import type { ServerlessMysql } from "serverless-mysql";
import type { ApiResponse } from "@customTypes/api";
import { LessonPartResponseType } from "@customTypes/database";


export type Response = ApiResponse<{
}>


export default async function LessonPartsResponseApiRoute(req: NextApiRequest, res: NextApiResponse) {
	let mysql: ServerlessMysql | undefined;

	try { 
		// Ensure only POST requests are accepted
		if(req.method !== "POST") {
			throw new Error("This endpoint only accepts POST requests");
		}

		// Parse and validate the "lessonId" query parameter
		const lessonId = parseInt(req.query["lessonId"] as string);
		if(isNaN(lessonId)) {
			throw new Error("Invalid value provided for \"lessonId\" parameter, requires type \"number\".");
		}

		// Parse and validate the "partNumber" query parameter
		const partNumber = parseInt(req.query["partNumber"] as string);
		if(isNaN(partNumber)) {
			throw new Error("Invalid value provided for \"partNumber\" parameter, requires type \"number\".");
		}

		// Parse and validate the "message" field from the request body
		if(!("message" in req.body)) {
			throw new Error("Request must have a \"message\" field in the body.");
		}
		if(typeof req.body["message"] !== "string") {
			throw new Error(`Invalid type of message, expected \"string\" but got \"${typeof req.body["message"]}\".`);
		}

		const messageResponse = req.body["message"] as string;

		// connect to the database
		mysql = await connectToDatabase();

		// get the specific lesson part from the database
		const lessonPart = await getLessonPart(mysql, lessonId, partNumber).catch(err => { throw err; });

		switch(lessonPart.responseType) {
			case null:
				break;
			case LessonPartResponseType.yesNo:
				handleDoYouUnderstandResponse(res, messageResponse);
				break;
			default:
				throw new Error(`Unknown response type encountered: ${lessonPart.responseType}`);
		}
	}
	catch(err) {
		// In the event of any error while processing the request, send an error response
		res.status(500).json({
			timestamp: (new Date()).toISOString(),
			error: (err as Error).message
		} as Response);
	}
	finally {
		if(mysql !== undefined) {
			mysql.end();
		}
	}
};



function handleDoYouUnderstandResponse(res: NextApiResponse, msg: string): void {
	const classifier = getDoYouUnderstandResponseClassifier();

	const responseClassification = classifier.classify(msg) === "true";

	res.status(200).json({
		timestamp: (new Date()).toISOString(),
		responseClassification: responseClassification
	} as Response);
}