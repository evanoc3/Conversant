import serverlessMysql, { ServerlessMysql } from "serverless-mysql";
import type { ConnectionConfig } from "mysql";
import { ILessonPartsTableRow } from "@customTypes/database";


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
		SELECT id, lesson, content, type, proceedTo, onYes, onNo
		FROM lesson_parts
		WHERE id = ?
	`, [ id ]).catch(err => { throw err; });

	if(rows.length !== 1) {
		throw new Error();
	}

	return rows[0];
}