import { ServerlessMysql } from "serverless-mysql";
import { getSession } from "next-auth/client";
import { connectToDatabase } from "@util/database";

import type { NextApiRequest, NextApiResponse } from "next";
import type { IAuthSession } from "@customTypes/auth";
import type { ISessionsTableRow } from "@customTypes/database";
import type { ApiResponse } from "@customTypes/api";


/**
 * Typescript interface for the JSON serialized return value of this API route.
 */
export type Response = ApiResponse<{
	userId: string,
	lastSignInTime: string
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
		const lastSignInTime = await getLastSignInTime(mysql, userId).catch(err => { throw err; });

		// send the happy-route response
		res.status(200).json({
			timestamp: (new Date()).toISOString(),
			userId: userId,
			lastSignInTime: lastSignInTime.toISOString()
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
async function getLastSignInTime(mysql: ServerlessMysql, userId: string): Promise<Date> {
	const row = await mysql.query<ISessionsTableRow[]>(`
		SELECT created_at
		FROM sessions
		WHERE user_id = ?
		ORDER BY expires DESC
		LIMIT 1
	`, [ userId ]).catch(err => {
		console.error(`Error: failed to query database for enrolled topics for user \"${userId}\". Error message: `, err);
		throw err;
	});

	if(row.length == 0 || row.length > 1) {
		throw new Error("Invalid database response");
	}

	return new Date(row[0].created_at);
}