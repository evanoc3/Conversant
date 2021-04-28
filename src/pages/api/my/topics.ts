import { getSession } from "next-auth/client";
import { connectToDatabase } from "@util/database";

import type { ServerlessMysql } from "serverless-mysql";
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
	// let conn: Connection | undefined;
	let mysql: ServerlessMysql | undefined;

	try {
		// qet user session and query parameters
		const session = await getSession({ req }) as IAuthSession;
		const userId = session.user!.id!;

		// connect to the database
		const mysql = await connectToDatabase();

		// query the database for topics the current user is enrolled in
		const enrolledTopics = await getEnrolledTopics(mysql, userId).catch(err => { throw err; });

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
		if(mysql !== undefined) {
			mysql.end();
		}
	}
};


/**
 * Helper function which queries the database for the list if topics that the current user has enrolled in.
 * 
 * @throws if the database query fails for any reason.
 */
async function getEnrolledTopics(mysql: ServerlessMysql, userId: string): Promise<TopicDetail[]> {
	const rows = await mysql.query<{topic: string, label: string}[]>(`
		SELECT DISTINCT topic, label
		FROM lesson_completions
		LEFT JOIN lessons ON lesson_completions.lesson = lessons.id
		LEFT JOIN topics on lessons.topic = topics.id
		WHERE \`user\` = ?
	`, [ userId ]).catch(err => {
		console.error(`Error: failed to query database for enrolled topics for user \"${userId}\". Error message: `, err);
		throw err;
	});

	return rows.map(row => {
		return {
			id: row.topic,
			label: row.label
		}
	});
}