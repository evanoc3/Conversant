import type { NextApiRequest, NextApiResponse } from "next";
import type { ServerlessMysql } from "serverless-mysql";
import { connectToDatabase } from "@util/database";
import type { ITopicsTableRow } from "@customTypes/database";
import type { BaseApiResponse, ErrorApiResponse } from "@customTypes/api";


/**
 * Typescript interface for the JSON serialized value returned by this API route.
 */
export type Response = BaseApiResponse & (ErrorApiResponse | {
	results?: ITopicsTableRow[]
})


/**
 * Main function for this API route.
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
	let mysql: ServerlessMysql | undefined;

	try {
		// parse parameter from request query
		const query = req.query["query"] as string ?? "";

		// connect to the database
		const mysql = await connectToDatabase();

		// perform the query
		const topics = await getTopics(mysql);

		// send an OK response
		res.status(200).json({
			timestamp: (new Date()).toISOString(),
			results: topics
		});
	}
	catch(err) {
		// If any errors get thrown, send an Error response
		res.status(500).json({
			timestamp: (new Date()).toISOString(),
			error: (err as Error).message
		})
	}
	finally {
		// Perform Serverless MySQL cleanup
		if(mysql !== undefined) {
			await mysql.end();
		}
	}
};


/**
 * Helper function to retrieve rows from thr database.
 * 
 * @throws {Error} if the database query fails for any reason
 */
async function getTopics(mysql: ServerlessMysql): Promise<ITopicsTableRow[]> {
	const rows = await mysql.query<ITopicsTableRow[]>("SELECT * FROM topics LIMIT 20").then(rows => rows).catch(err => {
		console.error("Error: failed to query database for topics. Error message: ", err);
		throw err;
	});

	return rows;
} 