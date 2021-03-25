import { createConnection, format } from "mysql";
import type { Connection, ConnectionConfig } from "mysql";
import serverlessMysql, { ServerlessMysql } from "serverless-mysql";
import type { IEnrolledTopicsQueryResultRow } from "@customTypes/database";
import type { Lesson } from "@customTypes/lesson";


export function getConnectionConfig(): ConnectionConfig {
	const matches = /mysql:\/\/(\w+):(\w+)@([\.\w+]+)\/(\w+)/gi.exec(process.env.AUTH_DATABASE!);

	if(matches === null || matches.length < 5) {
		throw new Error("failed to parse the database connection string");
	}

	return {
		user: matches[1],
		password: matches[2],
		host: matches[3],
		database: matches[4]
	};
}


export async function connectToDatabase(): Promise<ServerlessMysql> {
	// Create the ServerlessMysql object with a config from `getDatabaseConfig()`
	const mysql = serverlessMysql({
		config: getConnectionConfig(),
		onConnect: () => console.log("Connection to the database was successful"),
		onConnectError: () => { throw new Error("failed to connect to the database"); },
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
 * This is called at the start of each API page which accesses the database to get a database connection object.
 * 
 * @throws {MySQLError} - If there is a problem when attempting to connect to the database. It also logs the error message to `console.error`.
 * 
 * @returns {Connection} A database connection object.
 */
export function getDatabaseConnection(): Connection {
	const conn = createConnection(process.env.AUTH_DATABASE!);

	conn.connect(err => {
		if(err) {
			console.error("Error: failed to connect to the database. Error message: ", err);
			throw err;
		}

		console.log("Connected to database successfully");
	});

	return conn;
}





/**
 * Queries the database to return all the topics that the specified user has started lessons in.
 * 
 * It is called by the `pages/api/my/topics.ts` route, in response to a request from the `pages/home.tsx` client-side route.
 * 
 * @param {Connection} conn - A database connection object, obtained by the API page from the `getDatabaseConnection()` function above.
 * 
 * @param {string} userId - The Id of the current user, obtained by the API page from the users session via the `next-auth/client.getSession` function.
 * 
 * @returns {Promise<string[]>} A promise which either:
 * * Resolves to the list of topics that the user has started lessons in, or
 * * Rejects with a `MysqlError` error and logs the error message to `console.error`
 */
export async function getEnrolledTopics(conn: Connection, userId: string): Promise<IEnrolledTopicsQueryResultRow[]> {
	return new Promise((resolve, reject) => {

		const sql = format(`
			SELECT enrolments.topic as id, enrolments.timestamp, topics.label, enrolments.currentLesson
			FROM enrolments
			LEFT JOIN topics ON enrolments.topic = topics.id
			WHERE enrolments.userId = ?
			ORDER BY timestamp DESC
			LIMIT 10
		`, [ userId ]);

		conn.query(sql, (err, res: IEnrolledTopicsQueryResultRow[]) =>{
			if(err) {
				console.error(`Error: failed to query database for enrolled topics for user "${userId}". Error message: `, err);
				reject(err);
			}

			resolve(res);
		});
	});
}


/**
 * Queries the database for a lesson with the specified id
 * 
 * @param {Connection} conn - A database connection object, obtained by the API page from the `getDatabaseConnection()` function above.
 * 
 * @param {String} lessonId - 
 * 
 * @returns {Promise<any>} - 
 */
export async function getLesson(conn: Connection, lessonId: string): Promise<Lesson> {
	return new Promise((resolve, reject) => {
		const sql = format("SELECT lessons.id, title, topic, content, topics.label as topicLabel FROM lessons LEFT JOIN topics ON lessons.topic = topics.id WHERE lessons.id = ?", [ lessonId ]);

		conn.query(sql, (err, res) => {
			if(err) {
				console.error(`Error: failed to query database for lesson ${lessonId}. Error message: `, err);
				reject(err);
			}

			if(res) {
				resolve(res[0]);
			}

			reject();
		});
	});
}