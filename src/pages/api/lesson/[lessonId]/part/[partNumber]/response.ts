import { connectToDatabase, getLessonPart } from "@util/database";
import { getClassifier as getYesNoClassifier, Classes as YesNoClasses } from "@util/classifiers/yesNo";
import { getClassifier as getMultipleChoiceClassifier, Classes as MultipleChoiceClasses } from "@util/classifiers/multipleChoice";

import type { NextApiRequest, NextApiResponse } from "next";
import type ServerlessClient from "serverless-postgres";
import type { ApiResponse } from "@customTypes/api";
import { LessonPartResponseType } from "@customTypes/lesson";


export type Response = ApiResponse<{
	responseClassification: string | undefined,
	confidence: number,
	proceedTo: number,
	classes?: any
}>


/**
 * Main function for handling requests to this API route.
 * 
 * 
 */
export default async function LessonPartsResponseApiRoute(req: NextApiRequest, res: NextApiResponse) {
	let dbClient: ServerlessClient | undefined;

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

		const messageResponse = (req.body["message"] as string).toLowerCase();

		// Connect to the database
		dbClient = await connectToDatabase();

		// Get the specific lesson part from the database
		const lessonPart = await getLessonPart(dbClient, partNumber).catch(err => { throw err; });

		// Determine how to handle the response, depending on the `type` of the lesson part
		const { onYes, onNo, onUndecided, onA, onB, onC, onD } = lessonPart;

		switch(lessonPart.type) {
			// Handle response to a message which does not require a response
			case LessonPartResponseType.Proceed:
			case LessonPartResponseType.EndOfLesson:
				handleUnexpectedResponse(res);
				break;
			// Handle a response to a Yes/No question
			case LessonPartResponseType.YesNo:
				handleYesNoResponse(res, messageResponse, onYes!, onNo!, onUndecided!);
				break;
			// Handle a response to a A/B/C/D question
			case LessonPartResponseType.MultipleChoice:
				handleMultipleChoiceResponse(res, messageResponse, onA!, onB!, onC!, onD!, onUndecided!);
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
		if(dbClient) {
			dbClient.end();
		}
	}
};


/**
 * This function handles the response when the lesson part being responded to is of type `proceed`.
 */
function handleUnexpectedResponse(res: NextApiResponse): void {
	res.status(200).json({
		timestamp: (new Date()).toISOString(),
		error: "No response is required to this message"
	} as Response);
}


/**
 * This function handles the classification and response when the lesson part being responded to is of type `YesNo`.
 */
function handleYesNoResponse(res: NextApiResponse, msg: string, onYes: number, onNo: number, onUndecided: number): void {
	const classifier = getYesNoClassifier();
	const classes = classifier.getClassifications(msg).reduce<{[key: string]: number}>((map, obj) => (map[obj.label] = obj.value, map), {});
	const confidence = classes[YesNoClasses.True] - classes[YesNoClasses.False];

	let resp: Partial<Response> = {
		timestamp: (new Date()).toISOString(),
		responseClassification: (classes[YesNoClasses.True] >= classes[YesNoClasses.False]) ? YesNoClasses.True : YesNoClasses.False,
		confidence: confidence,
		proceedTo: (classes[YesNoClasses.True] >= classes[YesNoClasses.False]) ? onYes : onNo
	};

	if(Math.abs(confidence) < 0.001) {
		resp.responseClassification = "undefined";
		resp.proceedTo = onUndecided;
	}

	res.status(200).json(resp);
}


/**
 * Helper function which uses handles this API route's response to a multiple choice quesiton.
 */
function handleMultipleChoiceResponse(res: NextApiResponse, msg: string, onA: number, onB: number, onC: number, onD: number, onUndecided: number): void {
	const multipleChoiceRegex = /(?:^|\s)([abcd])(?:\s|\.|$)/mi;
	const matches = msg.match(multipleChoiceRegex);

	let classification: MultipleChoiceClasses;

	// If the response is particularly short and easy to parse, use a regex
	if(matches !== null) {
		classification = matches[1].toUpperCase() as MultipleChoiceClasses;
	}
	// Otherwise, take a best guess with the multiple choice classifier
	else {
		const classifier = getMultipleChoiceClassifier();
		classification = classifier.classify(msg) as MultipleChoiceClasses;
	}


	let resp: Partial<Response> = {
		timestamp: (new Date()).toISOString(),
		responseClassification: classification,
	};

	switch(classification) {
		case MultipleChoiceClasses.A:
			resp["proceedTo"] = onA;
			break;
		case MultipleChoiceClasses.B:
			resp["proceedTo"] = onB;
			break;
		case MultipleChoiceClasses.C:
			resp["proceedTo"] = onC;
			break;
		case MultipleChoiceClasses.D:
			resp["proceedTo"] = onD;
			break;
		default:
			resp["proceedTo"] = onUndecided;
	}

	res.status(200).json(resp);
}
