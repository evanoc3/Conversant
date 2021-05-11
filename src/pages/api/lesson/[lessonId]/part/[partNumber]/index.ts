import { getSession } from "next-auth/client";
import { connectToDatabase, getLessonPart } from "@util/database";

import type { NextApiRequest, NextApiResponse } from "next";
import type { Session } from "next-auth";
import type { User } from "next-auth";
import type { ServerlessMysql } from "serverless-mysql";
import type { ApiResponse } from "@customTypes/api";

import type { ILessonPartsTableRow } from "@customTypes/database";
import { LessonPartResponseType } from "@customTypes/lesson";



/**
 * Typescript interface for the JSON serialized response sent by this API route.
 */
export type Response = ApiResponse<
	Pick<ILessonPartsTableRow, "id" | "content" | "type" | "proceedTo" | "pause">
>


/**
 * Main function for this API route.
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
	let mysql: ServerlessMysql | undefined;
	let session: Session | null;

	try {
		// get the user's session
		session = await getSession({ req });

		// parse the relevant query parameters
		const lessonId = parseInt(req.query["lessonId"] as string);
		const partNumber = parseInt(req.query["partNumber"] as string);

		if(isNaN(lessonId)) {
			throw new Error(`Invalid lesson id requested (${req.query["partNumber"]})`);
		}

		if(isNaN(partNumber)) {
			throw new Error(`Invalid lesson part number requested (${req.query["partNumber"]})`);
		}

		// connect to the database
		mysql = await connectToDatabase();

		// query the database for the particular lesson
		const lessonPart = await getLessonPart(mysql, partNumber).catch(err => {
			throw err;
		});

		if(lessonPart.lesson !== lessonId) {
			throw new Error("Invalid lesson part requested (part's associated lesson is not the lesson specified)")
		}

		// Fills in template fields in the database-stored message with dynamic details.
		const processedLessonContent = processMessage(lessonPart.content, session?.user ?? null);

		let resp: Partial<Response> = {
			timestamp: (new Date()).toISOString(),
			id: lessonPart.id,
			content: processedLessonContent,
			pause: lessonPart.pause,
			type: lessonPart.type,
		};

		// If the lessonType is `proceed`, then add the field containing the next part to proceed to
		if(lessonPart.type === LessonPartResponseType.Proceed) {
			resp["proceedTo"] = lessonPart.proceedTo;
		}

		// Send the happy-route response
		res.status(200).json(resp);
	}
	catch(err) {
		// Send an error response if any errors are thrown
		res.status(500).json({
			timestamp: (new Date()).toISOString(),
			error: (err as Error).message,
			stack: (err as Error).stack
		} as Response);
	}
	finally {
		// Close the database connection
		if(mysql !== undefined) {
			mysql.end();
		}
	}
};


/**
 * Helper function which templates in the user's name to the message wherever it finds "[[NAME]]"
 */
function processMessage(messageText: string, user: User | null): string {
	// Replace "[[NAME]]" with the user's first name
	const nameRegex = /\s?\[\[NAME\]\]/gm;
	if(nameRegex.test(messageText)) {
		messageText = messageText.replace(nameRegex, (match: string) => {
			const hasSpacePrefix = match.startsWith(" ");
			const name = user?.name?.split(" ")[0];

			if(name) {
				return (hasSpacePrefix) ? ` ${name}` : name;
			}

			return "";
		});
	}


	return messageText;
}