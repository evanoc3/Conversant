import type { NextApiRequest, NextApiResponse } from "next";
import type { Connection } from "mysql";
import { getDatabaseConnection, getTopics } from "@util/database";


export default async (req: NextApiRequest, res: NextApiResponse) => {
	let conn: Connection | undefined

	try {
		const query = req.query["query"] as string ?? "";

		conn = getDatabaseConnection();

		const topics = await getTopics(conn);

		res.status(200).json({
			timestamp: (new Date()).toISOString(),
			results: topics
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