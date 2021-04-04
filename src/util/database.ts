import { createConnection } from "mysql";
import type { Connection, ConnectionConfig } from "mysql";
import serverlessMysql, { ServerlessMysql } from "serverless-mysql";


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