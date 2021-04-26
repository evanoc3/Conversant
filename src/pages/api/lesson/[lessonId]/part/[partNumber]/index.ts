import { getSession } from "next-auth/client";
import { connectToDatabase } from "@util/database";

import type { NextApiRequest, NextApiResponse } from "next";
import type { Session } from "next-auth";
import type { User } from "next-auth";
import type { ServerlessMysql } from "serverless-mysql";
import type { ApiResponse } from "@customTypes/api";

import type { ILessonPartsTableRow } from "@customTypes/database";



/**
 * Typescript interface for the JSON serialized response sent by this API route.
 */
export type Response = ApiResponse<Pick<ILessonPartsTableRow, "content" | "responseType" | "proceedTo">>


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
		const lessonPart = await getLessonPart(mysql, lessonId, partNumber).catch(err => {
			throw err;
		});

		const lessonPartContent = lessonPart.content;

		const processedLessonContent = processMessage(lessonPartContent, session?.user ?? null);

		let resp: Response = {
			timestamp: (new Date()).toISOString(),
			content: processedLessonContent,
			responseType: lessonPart.responseType
		};

		if(lessonPart.responseType === null) {
			resp["proceedTo"] = lessonPart.proceedTo;
		}

		// send the happy-route response
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
 * Helper function which queries the database for a particular part of a lesson  
 *
 * @throws if a database error occurs.
 * @throws if anything other than 1 row is returned by the database query.
 */
export async function getLessonPart(mysql: ServerlessMysql, lessonId: number, partNumber: number): Promise<ILessonPartsTableRow> {
	const lessonPartRows = await mysql.query<ILessonPartsTableRow[]>(`
		SELECT id, lesson, part, content, responseType, proceedTo, onYes, onNo
		FROM lesson_parts
		WHERE lesson = ? AND part = ?
	`, [ lessonId, partNumber ]).catch(err => {
		console.error(`Error: failed to query database for lesson ${lessonId}. Error message: `, err);
		throw new Error(err);
	});

	// if anything except 1 rows is returned then throw an error
	if(lessonPartRows.length !== 1) {
		console.error(`Error: found ${lessonPartRows.length} rows when querying the database for lesson ${lessonId} part ${partNumber}`);
		throw new Error(`No lesson part was found matching the ID ${partNumber}`);
	}

	return lessonPartRows[0];
}


function processMessage(messageText: string, user: User | null): string {
	// Replace "[[NAME]]" with the user's first name
	const nameRegex = /\s\[\[NAME\]\]/gmi;

	if(nameRegex.test(messageText)) {
		const name = (user && user.name) ? ` ${user.name.split(" ")[0]}` : "";
		messageText = messageText.replace(nameRegex, name);
	}

	return messageText;
}