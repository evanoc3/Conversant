import type { NextApiRequest, NextApiResponse } from "next";
import { ServerlessMysql } from "serverless-mysql";
import { getSession } from "next-auth/client";
import type { ITopicsTableRow, IEnrolmentsTableRow } from "@customTypes/database";
import { connectToDatabase } from "@util/database";
import type { IAuthSession } from "@customTypes/auth";
import type { ApiResponse } from "@customTypes/api";



/**
 * Helper Typescript interface for the value produced by the database query this route performs.
 */
export type IEnrolledTopicsQueryResultRow = Pick<ITopicsTableRow, "id" | "label"> & Pick<IEnrolmentsTableRow, "userId" | "timestamp" | "currentLesson">


/**
 * Typescript interface for the JSON serialized return value of this API route.
 */
export type Response = ApiResponse<{
	userId: string,
	enrolledTopics: IEnrolledTopicsQueryResultRow[]
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
		const userId = session.user.id!;

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
async function getEnrolledTopics(mysql: ServerlessMysql, userId: string): Promise<IEnrolledTopicsQueryResultRow[]> {
	const rows = await mysql.query<IEnrolledTopicsQueryResultRow[]>(`
		SELECT enrolments.topic as id, enrolments.timestamp, topics.label, enrolments.currentLesson
		FROM enrolments
		LEFT JOIN topics ON enrolments.topic = topics.id
		WHERE enrolments.userId = ?
		ORDER BY timestamp DESC
		LIMIT 10
	`, [ userId ]).catch(err => {
		console.error(`Error: failed to query database for enrolled topics for user \"${userId}\". Error message: `, err);
		throw err;
	});

	return rows;
}