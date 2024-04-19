import ServerlessClient from "serverless-postgres";
import type { Config } from "serverless-postgres";
import type { Lesson } from "@customTypes/lesson";
import type { ILessonPartsTableRow } from "@customTypes/database";


export function getConnectionConfig(): Config {
	return {
		connectionString: process.env.DATABASE!,
		debug: process.env.NODE_ENV === "development"
	} as Config;
}


export async function connectToDatabase(): Promise<ServerlessClient> {
	// Create the serverless-postgres client object with a config from `getDatabaseConfig()`
	const client = new ServerlessClient(getConnectionConfig());

	// @ts-ignore
	client._library.types.setTypeParser(client._library.types.builtins.INT4, val => parseInt(val));

	// Wait for it to actually connect, otherwise throw an error
	await client.connect().catch(err => {
		console.error(`Error: failed to connect to the database. Error message: ${err}.`);
		throw err;
	});

	// return the serverless-postgres client instance for use by API routes
	return client;
}


/**
 * This function is called by API routes to retrieve the content of a lesson part by its ID.
 * 
 * @throws any database related error that occurs during the query.
 * @throws If more or less than 1 row is returned by the database.
 */
export async function getLessonPart(dbClient: ServerlessClient, id: number): Promise<ILessonPartsTableRow> {
	const res = await dbClient.query(`
		SELECT id, lesson, content, pause, type, "proceedTo", "onYes", "onNo", "onA", "onB", "onC", "onD", "onUndecided"
		FROM lesson_parts
		WHERE id = $1
	`, [ id ]).catch(err => { throw err; });

	if(res.rows.length !== 1) {
		throw new Error();
	}

	await dbClient.clean();

	return res.rows[0];
}


/**
 * Helper function which returns a boolean indicating whether the specified user is recorded as having completed the lesson.
 * 
 * @throws Any database-related error occurs during the query.
 */
 export async function checkIfUserHasCompletedLesson(dbClient: ServerlessClient, userId: string, lessonId: string): Promise<boolean> {
	const res = await dbClient.query(`
		SELECT id, user, lesson FROM lesson_completions WHERE user = ? AND lesson = ?
	`, [userId, lessonId]).catch(err => { throw err });
	
	return res.rows.length >= 1;
}


/**
 * Helper function to query the database for the content of a particular lesson by ID.
 * 
 * @throws Any database-related error occurs during the query.
 * @throws if 0 or more than 1 row is returned by the database query, as it searches by primary key there should only be 1 result.
 */
export async function getLesson(dbClient: ServerlessClient, lessonId: string): Promise<Lesson> {
	const res = await dbClient.query(`
		SELECT lessons.id, title, topic, topics.label as "topicLabel", "firstPart", lessons."nextLesson"
		FROM lessons
		LEFT JOIN topics ON lessons.topic = topics.id
		WHERE lessons.id = $1
	`, [ lessonId ]).catch(err => {
		console.error(`Error: failed to query database for lesson ${lessonId}. Error message: `, err);
		throw new Error(err);
	});

	// if anything except 1 rows is returned then throw an error
	if(res.rows.length !== 1) {
		console.error(`Error: found ${res.rows.length} rows when querying the database for lessonId \"${lessonId}\"`);
		throw new Error("No lesson was found");
	}

	return res.rows[0];
}
