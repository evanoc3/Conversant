import { getSession } from "next-auth/react";
import { connectToDatabase, checkIfUserHasCompletedLesson, getLesson } from "@util/database";

import type { NextApiRequest, NextApiResponse } from "next";
import type { ServerlessMysql } from "serverless-mysql";
import type { ApiResponse } from "@customTypes/api";
import type { Lesson } from "@customTypes/lesson";
import type { IAuthSession } from "@customTypes/auth"; 


/**
 * Typescript interface for the JSON serialized response sent by this API route.
 */
export type Response = ApiResponse<{
	lesson: Lesson,
	completed: boolean
}>


/**
 * Main function for this API route.
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
	let mysql: ServerlessMysql | undefined;
	let hasUserCompletedLesson = false;

	try {
		// See if the user sending the request has a session
		const session: IAuthSession | null = await getSession({ req });

		// parse the relevant query parameters
		const lessonId = req.query["lessonId"] as string ?? "";

		// connect to the database
		mysql = await connectToDatabase();

		// query the database for the particular lesson
		const lesson = await getLesson(mysql, lessonId).catch(err => {
			throw err;
		});

		// if the user has a session, check if that user has completed the lesson
		if(session?.user?.id !== undefined) {
			hasUserCompletedLesson = await checkIfUserHasCompletedLesson(mysql, session.user.id, lessonId);
		}

		// send the happy-route response
		res.status(200).json({
			timestamp: (new Date()).toISOString(),
			lesson: lesson,
			completed: hasUserCompletedLesson
		} as Response);
	}
	catch(err) {
		// Send an error response if any errors are thrown
		res.status(500).json({
			timestamp: (new Date()).toISOString(),
			error: (err as Error).message
		} as Response);
	}
	finally {
		// Close the database connection
		if(mysql !== undefined) {
			mysql.end();
		}
	}
};
