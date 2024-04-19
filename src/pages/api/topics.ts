import type { NextApiRequest, NextApiResponse } from "next";
import type ServerlessClient from "serverless-postgres";
import { connectToDatabase } from "@util/database";
import type { ITopicsTableRow } from "@customTypes/database";
import type { ApiResponse } from "@customTypes/api";


/**
 * Typescript interface for the JSON serialized value returned by this API route.
 */
export type Response = ApiResponse<{
	results: ITopicsTableRow[]
}>


/**
 * Main function for this API route.
 */
export default async function TopicsApiRoute(req: NextApiRequest, res: NextApiResponse) {
	let dbClient: ServerlessClient | undefined;

	try {
		// parse parameter from request query
		const query = (req.query["query"] as string) ?? "";

		// connect to the database
		dbClient = await connectToDatabase();

		// perform the query
		const topics = await getSearchResultsForTopic(dbClient, query);

		// send an OK response
		res.status(200).json({
			timestamp: (new Date()).toISOString(),
			results: topics
		} as Response);
	}
	catch(err) {
		// If any errors get thrown, send an Error response
		res.status(500).json({
			timestamp: (new Date()).toISOString(),
			error: (err as Error).message
		} as Response)
	}
	finally {
		// Perform Serverless MySQL cleanup
		if(dbClient) {
			await dbClient.end();
		}
	}
};


/**
 * Helper function to retrieve rows from the database.
 * 
 * @throws {Error} if the database query fails for any reason
 */
async function getSearchResultsForTopic(dbClient: ServerlessClient, topic: string): Promise<ITopicsTableRow[]> {
	const res = await dbClient.query(
		"SELECT \"id\", \"label\", \"description\", \"firstLesson\" FROM \"topics\" WHERE \"label\" ILIKE $1 LIMIT 20",
		[ `%${topic}%` ]
	).catch(err => {
		console.error("Error: failed to query database for topics. Error message: ", err);
		throw err;
	});

	return res.rows;
} 
