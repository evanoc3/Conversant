import { getSession } from "next-auth/react";
import { connectToDatabase } from "@util/database";

import type ServerlessClient from "serverless-postgres";
import type { NextApiRequest, NextApiResponse } from "next";
import type { IAuthSession } from "@customTypes/auth";
import type { ApiResponse } from "@customTypes/api";


export interface TopicDetail {
	id: string,
	label: string
}


/**
 * Typescript interface for the JSON serialized return value of this API route.
 */
export type Response = ApiResponse<{
	userId: string,
	enrolledTopics: TopicDetail[]
}>


/**
 * Main function for this API route.
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
	let dbClient: ServerlessClient | undefined;

	try {
		// qet user session and query parameters
		const session = await getSession({ req }) as IAuthSession;
		const userId = session.user!.id!;

		// connect to the database
		dbClient = await connectToDatabase();

		// query the database for topics the current user is enrolled in
		const enrolledTopics = await getEnrolledTopics(dbClient, userId).catch(err => { throw err; });

		// send the happy-route response
		res.status(200).json({
			timestamp: (new Date()).toISOString(),
			userId: userId,
			enrolledTopics: enrolledTopics
		} as Response);
	}
	catch(err) {
		// Send an error response if any errors are thrown
		res.status(500).json({
			timestamp: (new Date()).toISOString(),
			error: (err as Error).message
		} as Response)
	}
	finally {
		// Do serverless MySQL cleanup
		if(dbClient) {
			dbClient.end();
		}
	}
};


/**
 * Helper function which queries the database for the list if topics that the current user has enrolled in.
 * 
 * @throws if the database query fails for any reason.
 */
async function getEnrolledTopics(dbClient: ServerlessClient, userId: string): Promise<TopicDetail[]> {
	const res = await dbClient.query(`
		SELECT DISTINCT topic, label
		FROM lesson_completions
		LEFT JOIN lessons ON lesson_completions.lesson = lessons.id
		LEFT JOIN topics on lessons.topic = topics.id
		WHERE "user" = $1
	`, [ userId ]).catch((err: any) => {
		console.error(`Error: failed to query database for enrolled topics for user \"${userId}\". Error message: `, err);
		throw err;
	});

	return res.rows.map((row: any) => {
		return {
			id: row.topic,
			label: row.label
		}
	});
}
