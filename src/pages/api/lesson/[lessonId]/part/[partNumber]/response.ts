import { connectToDatabase, getLessonPart } from "@util/database";
import { getDoYouUnderstandResponseClassifier } from "@util/classifiers";

import type { NextApiRequest, NextApiResponse } from "next";
import type { ServerlessMysql } from "serverless-mysql";
import type { ApiResponse } from "@customTypes/api";
import { LessonPartResponseType } from "@customTypes/lesson";


export type Response = ApiResponse<{
	proceedTo?: number,
	isLessonEnded?: boolean
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

		// Connect to the database
		mysql = await connectToDatabase();

		// Get the specific lesson part from the database
		const lessonPart = await getLessonPart(mysql, partNumber).catch(err => { throw err; });

		// Determine how to handle the response, depending on the `type` of the lesson part
		switch(lessonPart.type) {
			case LessonPartResponseType.Proceed:
				handleNoResponse(res);
				break;
			case LessonPartResponseType.YesNo:
				handleYesNoResponse(res, messageResponse, lessonPart.onYes!, lessonPart.onNo!);
				break;
			case LessonPartResponseType.EndOfLesson:
				handleEndOfLessonResponse(res);
				break;
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


/**
 * This function handles the response when the lesson part being responded to is of type `proceed`.
 */
function handleNoResponse(res: NextApiResponse): void {
	res.status(200).json({
		timestamp: (new Date()).toISOString(),
		error: "No response is required to this message"
	} as Response);
}


/**
 * This function handles the classification and response when the lesson part being responded to is of type `YesNo`.
 */
function handleYesNoResponse(res: NextApiResponse, msg: string, onYes: number, onNo: number): void {
	const classifier = getDoYouUnderstandResponseClassifier();

	const responseClassification = classifier.classify(msg) === "true";

	res.status(200).json({
		timestamp: (new Date()).toISOString(),
		responseClassification: responseClassification,
		proceedTo: (responseClassification === true) ?  onYes : onNo
	} as Response);
}


/**
 * Helper function which handles sending the response, if the r
 */
function handleEndOfLessonResponse(res: NextApiResponse): void {
	res.status(200).json({
		timestamp: (new Date()).toISOString(),
		error: "No response neccessary"
	});
}
