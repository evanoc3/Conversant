import type { NextApiRequest, NextApiResponse } from "next";
import type { ServerlessMysql } from "serverless-mysql";
import { connectToDatabase } from "@util/database";
import type { BaseApiResponse, ErrorApiResponse } from "@customTypes/api";
import type { Lesson } from "@customTypes/lesson";


/**
 * Typescript interface for the JSON serialized response sent by this API route.
 */
export type Response = BaseApiResponse & (ErrorApiResponse | {
	lesson: Lesson
});


/**
 * Main function for this API route.
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
	let mysql: ServerlessMysql | undefined;

	try {
		// parse the relevant query parameters
		const lessonId = req.query["lessonId"] as string ?? "";

		// connect to the database
		mysql = await connectToDatabase();

		// query the database for the particular lesson
		const lesson = await getLesson(mysql, lessonId).catch(err => {
			throw err;
		});

		// send the happy-route response
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
		if(mysql !== undefined) {
			mysql.end();
		}
	}
};


/**
 * Helper function to query the database for the content of a particular lesson by ID.
 * 
 * @throws if any database error occurs during the query.
 * @throws if 0 or more than 1 row is returned by the database query, as it is searches by primary key.
 */
async function getLesson(mysql: ServerlessMysql, lessonId: string): Promise<Lesson> {
	const lessonRows = await mysql.query<Lesson[]>(`
		SELECT lessons.id, title, topic, content, topics.label as topicLabel FROM lessons LEFT JOIN topics ON lessons.topic = topics.id WHERE lessons.id = ?
	`, [ lessonId ]).catch(err => {
		console.error(`Error: failed to query database for lesson ${lessonId}. Error message: `, err);
		throw new Error(err);
	});

	// if anything except 1 rows is returned then throw an error
	if(lessonRows.length !== 1) {
		console.error(`Error: found ${lessonRows.length} rows when querying the database for lessonId \"${lessonId}\"`);
		throw new Error("No lesson was found");
	}

	return lessonRows[0];
}