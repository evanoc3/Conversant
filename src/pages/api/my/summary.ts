import { getSession } from "next-auth/react";
import { connectToDatabase } from "@util/database";

import type ServerlessClient from "serverless-postgres";
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
	let dbClient: ServerlessClient | undefined;

	try {
		// qet user session and query parameters
		const session = await getSession({ req }) as IAuthSession;
		const userId = session.user!.id!;

		// connect to the database
		dbClient = await connectToDatabase();

		// query the database for topics the current user is enrolled in
		const lastSignInTime = await getLastSignInTime(dbClient, userId).catch(err => { throw err; });
		const accountCreationTime = await getAccountCreationTime(dbClient, userId).catch(err => { throw err });
		const completedLessons = await getNumberOfLessonsCompleted(dbClient, userId).catch(err => { throw err });

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
		if(dbClient) {
			dbClient.end();
		}
	}
};


/**
 * Helper function which queries the database for the list if topics that the current user has enrolled in.
 * 
 * @throws if the database query fails for any reason.
 * @throws if the amount of rows returned by the query is not equal to 1.
 */
async function getLastSignInTime(dbClient: ServerlessClient, userId: string): Promise<Date> {
	const res = await dbClient.query(`
		SELECT updated_at
		FROM sessions
		WHERE user_id = $1
		ORDER BY updated_at DESC
		LIMIT 1
	`, [ userId ]).catch(err => {
		console.error(`Error: failed to query database for enrolled topics for user \"${userId}\". Error message: `, err);
		throw err;
	});

	if(res.rows.length !== 1) {
		throw new Error("Invalid row count for query result of last sign in time query");
	}

	return new Date(res.rows[0].updated_at);
}


/**
 * Helper function which queries the database for the `created_at` field of the user's row in the `users` database table, and returns it as a Date object.
 * 
 * @throws if the database query fails for any reason.
 * @throws if the amount of rows returned by the query is not equal to 1.
 */
async function getAccountCreationTime(dbClient: ServerlessClient, userId: string): Promise<Date> {
	const res = await dbClient.query(`
		SELECT created_at from users WHERE id = $1
	`, [ userId ]).catch(err => {
		console.error(`Error: failed to query database for account create time of user \"${userId}\". Error message: `, err);
		throw err;
	});

	if(res.rows.length !== 1) {
		throw new Error("Invalid row count for query result of user account creation time query");
	}

	return new Date(res.rows[0].created_at);
}


/**
 * Helper function which queries the number of rows there are in the `lesson_completions` table for the specified user
 * 
 * @throws if the database query fails for any reason.
 * @throws if the amount of rows returned by the query is not equal to 1.
 */
async function getNumberOfLessonsCompleted(dbClient: ServerlessClient, userId: string): Promise<number> {
	const res = await dbClient.query(`
		SELECT COUNT(*) as count from lesson_completions WHERE user = $1
	`, [ userId ]).catch(err => {
		console.error(`Error: failed to query database for number of completed lessons. Error message: `, err);
		throw err
	});

	if(res.rows.length !== 1) {
		throw new Error("Invalid row count for query result of number of completed lessons query");
	}

	return res.rows[0].count;
}
