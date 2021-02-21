import mysql from "mysql";
import type { TopicSearchResult } from "@customTypes/topic-search";


export function getDatabaseConnection(): mysql.Connection {
	const conn = mysql.createConnection(process.env.AUTH_DATABASE!);

	conn.connect((err) => {
		if(err) {
			console.error("Error: failed to connect to the database. Error message: ", err);
			throw err;
		}

		console.log("Connected to database successfully");
	});

	return conn;
}


export async function getTopics(conn: mysql.Connection): Promise<TopicSearchResult[]> {
	return new Promise<TopicSearchResult[]>((resolve, reject) => {
		conn.query("SELECT * FROM topics LIMIT 20", (err, res) => {
			if(err) {
				console.error("Error: failed to query database for topics. Error message: ", err);
				reject(err);
			}

			resolve(res);
		});
	});
}