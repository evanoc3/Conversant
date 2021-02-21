import { createConnection } from "mysql";
import type { Connection, MysqlError } from "mysql";
import type { TopicSearchResult } from "@customTypes/topic-search";
import type { ITopicsTableRow, IEnrolmentsTableRow } from "@customTypes/database";


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
 * Queries the database to return a list of all available topics offered by the service.
 * 
 * It is called by the `pages/api/topics.ts` route, in response to a request from the `components/LandingPage/SearchInput` component, to get the drop-down options
 * for the search input.
 * 
 * @param {Connection} conn - A `mysql.Connection` object, generally obtained by the API page from the `getDatabaseConnection()` function above.
 * 
 * @returns {Promise<TopicSearchResult[]>} A promise which either:
 * * Resolves to an array of `TopicSearchResult` objects, or
 * * Rejects with a `MysqlError` error and logs the error message to `console.error`
 */
export async function getTopics(conn: Connection): Promise<TopicSearchResult[]> {
	return new Promise<TopicSearchResult[]>((resolve, reject) => {
		conn.query("SELECT * FROM topics LIMIT 20", (err, res: ITopicsTableRow[]) => {
			if(err) {
				console.error("Error: failed to query database for topics. Error message: ", err);
				reject(err);
			}

			resolve(res);
		});
	});
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
export async function getEnrolledTopics(conn: Connection, userId: string): Promise<string[]> {
	return new Promise((resolve, reject) => {
		conn.query("SELECT * FROM enrolments WHERE userId = ? ORDER BY timestamp DESC LIMIT 25", [ userId ], (err, res: IEnrolmentsTableRow[]) =>{
			if(err) {
				console.error(`Error: failed to query database for enrolled topics for user "${userId}". Error message: `, err);
				reject(err);
			}

			resolve(
				res.map(result => result.topic)
			);
		});
	});
}