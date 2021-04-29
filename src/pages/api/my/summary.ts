import { ServerlessMysql } from "serverless-mysql";
import { getSession } from "next-auth/client";
import { connectToDatabase } from "@util/database";

import type { NextApiRequest, NextApiResponse } from "next";
import type { IAuthSession } from "@customTypes/auth";
import type { ISessionsTableRow, IUsersTableRow } from "@customTypes/database";
import type { ApiResponse } from "@customTypes/api";


/**
 * Typescript interface containing the 
 */
export interface HappyResponsePayload {
	userId: string,
	lessonsCompleted: number,
	lastSignInTime: string,
	accountCreationTime: string,
}

/**
 * Typescript interface for the JSON serialized return value of this API route.
 */
export type Response = ApiResponse<HappyResponsePayload>


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
		const lastSignInTime = await getLastSignInTime(mysql, userId).catch(err => { throw err; });
		const accountCreationTime = await getAccountCreationTime(mysql, userId).catch(err => { throw err });
		const completedLessons = await getNumberOfLessonsCompleted(mysql, userId).catch(err => { throw err });

		// send the happy-route response
		res.status(200).json({
			timestamp: (new Date()).toISOString(),
			userId: userId,
			lastSignInTime: lastSignInTime.toISOString(),
			accountCreationTime: accountCreationTime.toISOString(),
			lessonsCompleted: completedLessons
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
 * @throws if the amount of rows returned by the query is not equal to 1.
 */
async function getLastSignInTime(mysql: ServerlessMysql, userId: string): Promise<Date> {
	const row = await mysql.query<Pick<ISessionsTableRow, "updated_at">[]>(`
		SELECT updated_at
		FROM sessions
		WHERE user_id = ?
		ORDER BY updated_at DESC
		LIMIT 1
	`, [ userId ]).catch(err => {
		console.error(`Error: failed to query database for enrolled topics for user \"${userId}\". Error message: `, err);
		throw err;
	});

	if(row.length !== 1) {
		throw new Error("Invalid row count for query result of last sign in time query");
	}

	return new Date(row[0].updated_at);
}


/**
 * Helper function which queries the database for the `created_at` field of the user's row in the `users` database table, and returns it as a Date object.
 * 
 * @throws if the database query fails for any reason.
 * @throws if the amount of rows returned by the query is not equal to 1.
 */
async function getAccountCreationTime(mysql: ServerlessMysql, userId: string): Promise<Date> {
	const row = await mysql.query<Pick<IUsersTableRow, "created_at">[]>(`
		SELECT created_at from users WHERE id = ?
	`, [ userId ]).catch(err => {
		console.error(`Error: failed to query database for account create time of user \"${userId}\". Error message: `, err);
		throw err
	});

	if(row.length !== 1) {
		throw new Error("Invalid row count for query result of user account creation time query");
	}

	return new Date(row[0].created_at);
}


/**
 * Helper function which queries the number of rows there are in the `lesson_completions` table for the specified user
 * 
 * @throws if the database query fails for any reason.
 * @throws if the amount of rows returned by the query is not equal to 1.
 */
async function getNumberOfLessonsCompleted(mysql: ServerlessMysql, userId: string): Promise<number> {
	const row = await mysql.query<{count: number}[]>(`
		SELECT COUNT(*) as count from lesson_completions WHERE user = ?
	`, [ userId ]).catch(err => {
		console.error(`Error: failed to query database for number of completed lessons. Error message: `, err);
		throw err
	});

	if(row.length !== 1) {
		throw new Error("Invalid row count for query result of number of completed lessons query");
	}

	return row[0].count;
}