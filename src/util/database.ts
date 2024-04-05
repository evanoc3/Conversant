import serverlessMysql from "serverless-mysql";

import type { ServerlessMysql } from "serverless-mysql";
import type { ConnectionConfig } from "mysql";
import type { Lesson } from "@customTypes/lesson";
import type { ILessonPartsTableRow } from "@customTypes/database";


export function getConnectionConfig(): ConnectionConfig {
	const matches = /^mysql:\/\/(\w+):(\w+)@([\.\w]+)(?::(\d+))?\/(\w+)$/gi.exec(process.env.AUTH_DATABASE!);

	if(matches === null || matches.length < 5) {
		throw new Error("failed to parse the database connection string");
	}

	let config: ConnectionConfig = {
		user: matches[1],
		password: matches[2],
		host: matches[3]
	};

	if (matches.length === 6) {
		config.port = Number(matches[4]);
		config.database = matches[5];
	} else {
		config.database = matches[4];
	}

	return config;
}


export async function connectToDatabase(): Promise<ServerlessMysql> {
	// Create the ServerlessMysql object with a config from `getDatabaseConfig()`
	const mysql = serverlessMysql({
		config: getConnectionConfig(),
		onConnect: () => console.log("Connection to the database was successful"),
		onClose: () => console.log("Closed the connection to the database successfully")
	});

	// Wait for it to actually connect, otherwise throw an error
	await mysql.connect().catch(err => {
		console.error(`Error: failed to connect to the database. Error message: ${err}`);
		throw err;
	});

	// return the ServerlessMysql instance for use by API routes
	return mysql;
}


/**
 * This function is called by API routes to retrieve the content of a lesson part by its ID.
 * 
 * @throws any database related error that occurs during the query.
 * @throws If more or less than 1 row is returned by the database.
 */
export async function getLessonPart(mysql: ServerlessMysql, id: number): Promise<ILessonPartsTableRow> {
	const rows = await mysql.query<ILessonPartsTableRow[]>(`
		SELECT id, lesson, content, pause, type, proceedTo, onYes, onNo, onA, onB, onC, onD, onUndecided
		FROM lesson_parts
		WHERE id = ?
	`, [ id ]).catch(err => { throw err; });

	if(rows.length !== 1) {
		throw new Error();
	}

	return rows[0];
}


/**
 * Helper function which returns a boolean indicating whether the specified user is recorded as having completed the lesson.
 * 
 * @throws Any database-related error occurs during the query.
 */
 export async function checkIfUserHasCompletedLesson(mysql: ServerlessMysql, userId: string, lessonId: string): Promise<boolean> {
	const rows = await mysql.query<any[]>(`
		SELECT id, user, lesson FROM lesson_completions WHERE user = ? AND lesson = ?
	`, [userId, lessonId]).catch(err => { throw err });
	
	return rows.length >= 1;
}


/**
 * Helper function to query the database for the content of a particular lesson by ID.
 * 
 * @throws Any database-related error occurs during the query.
 * @throws if 0 or more than 1 row is returned by the database query, as it searches by primary key there should only be 1 result.
 */
export async function getLesson(mysql: ServerlessMysql, lessonId: string): Promise<Lesson> {
	const lessonRows = await mysql.query<Lesson[]>(`
		SELECT lessons.id, title, topic, topics.label as topicLabel, firstPart, nextLesson
		FROM lessons
		LEFT JOIN topics ON lessons.topic = topics.id
		WHERE lessons.id = ?
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
