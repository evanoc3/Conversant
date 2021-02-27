import type { NextApiRequest, NextApiResponse } from "next";
import type { Connection } from "mysql";
import { getDatabaseConnection, getLesson } from "@util/database";


export default async (req: NextApiRequest, res: NextApiResponse) => {
	let conn: Connection | undefined;

	try {
		const lessonId = req.query["lessonId"] as string ?? "";

		conn = getDatabaseConnection();

		const lesson = await getLesson(conn, lessonId).catch(err => { throw err; });

		res.status(200).json({
			timestamp: (new Date()).toISOString(),
			lesson: lesson
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