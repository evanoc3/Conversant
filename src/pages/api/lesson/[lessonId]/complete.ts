import { getSession } from "next-auth/client";
import { connectToDatabase, checkIfUserHasCompletedLesson } from "@util/database";

import type { NextApiRequest, NextApiResponse } from "next";
import type { ServerlessMysql } from "serverless-mysql";
import type { ApiResponse } from "@customTypes/api";
import type { IAuthSession } from "@customTypes/auth"; 



/**
 * Typescript interface for the JSON serialized response sent by this API route.
 */
export type Response = ApiResponse<{
	success: boolean
}>


/**
 * Main function for this API route.
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
	let mysql: ServerlessMysql | undefined;

	try {
		// Only response to POST requests
		if(req.method !== "POST") {
			throw new Error("This endpoint only accepts POST requests");
		}

		// See if the user sending the request has a session
		const session: IAuthSession | null = await getSession({ req });

		// Ensure the user cannot use this endpoint if they are not signed in
		if(session === null) {
			throw new Error("User must be authenticated to register finishing the lesson");
		}

		// parse the relevant query parameters
		const lessonId = req.query["lessonId"] as string ?? "";

		// connect to the database
		mysql = await connectToDatabase();

		// Ensure that the database does not already contain a record of this user completing this database
		if(await checkIfUserHasCompletedLesson(mysql, session.user!.id!, lessonId) ) {
			throw new AlreadyCompletedError(`User ${session.user?.id} is already marked as having completed lesson ${lessonId}`);
		}

		// Add the row to the database to show that this user has completed this lesson
		await addLessonCompletion(mysql, session.user!.id!, lessonId);

		// send the happy-route response
		res.status(200).json({
			timestamp: (new Date()).toISOString(),
			success: true
		} as Response);
	}
	catch(err) {
		// If the user has already completed this lesson, send a happy response anyway
		if(err instanceof AlreadyCompletedError) {
			res.status(200).json({
				timestamp: (new Date()).toISOString(),
				success: true
			} as Response);
		} 
		// Send an error response if any other errors are thrown
		else {
			res.status(500).json({
				timestamp: (new Date()).toISOString(),
				error: (err as Error).message
			} as Response);
		}
	}
	finally {
		// Close the database connection
		if(mysql !== undefined) {
			mysql.end();
		}
	}
};


/**
 * Adds a row into the lesson_completions table with the specified userId, and lessonId.
 * 
 * @throws Any database-related error occurs during the query.
 */
async function addLessonCompletion(mysql: ServerlessMysql, userId: string, lessonId: string): Promise<void> {
	await mysql.query(`
		INSERT INTO lesson_completions(user, lesson) VALUES (?, ?);
	`, [ userId, lessonId ]).catch(err => {
		console.error(`Error: failed to insert lesson completion into database. Error message: `, err);
		throw new Error(err);
	});

	return;
}


class AlreadyCompletedError extends Error {}