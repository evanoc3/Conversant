import type { NextApiRequest, NextApiResponse } from "next";
import type { Connection } from "mysql";
import { getSession } from "next-auth/client";
import { getDatabaseConnection, getEnrolledTopics } from "@util/database";
import type { IAuthSession } from "@customTypes/auth";


export default async (req: NextApiRequest, res: NextApiResponse) => {
	let conn: Connection | undefined;

	try {
		const session = await getSession({ req }) as IAuthSession;
		const userId = session.user.id!;

		conn = getDatabaseConnection();

		const enrolledTopics = await getEnrolledTopics(conn, userId);

		res.status(200).json({
			timestamp: (new Date()).toISOString(),
			userId: userId,
			enrolledTopics: enrolledTopics
		});
	}
	catch(err) {
		// Send an error response if any errors are thrown
		res.status(500).json({
			timestamp: (new Date()).toISOString(),
			error: (err as Error).message
		})
	}
	finally {
		// Close the database connection
		if(conn !== undefined) {
			conn.end();
		}
	}
};