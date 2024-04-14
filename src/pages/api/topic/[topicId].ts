import { getSession } from "next-auth/react";
import { connectToDatabase } from "@util/database";
import type { NextApiRequest, NextApiResponse } from "next";
import type ServerlessClient from "serverless-postgres";
import type { ApiResponse } from "@customTypes/api";
import type { IAuthSession } from "@customTypes/auth";


/**
 * Typescript interface used to model the result of the database query for lessons about a particular topic.
 */
export interface TopicLessonInformation {
	id: number,
	title: string,
	description: string,
	is_completed?: boolean
	href: string
}


/**
 * Typescript interface used to model the results of the database query for metadata on a particular topic.
 */
export interface TopicInformation {
	id: number,
	label: string,
	description: string,
	lessonCount: number,
	lessons: TopicLessonInformation[]
}


/**
 * Typescript interface for the JSON serialized value returned by this API route.
 */
export type Response = ApiResponse<TopicInformation>


/**
 * Main function for this API route.
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
	let dbClient: ServerlessClient | undefined;

	try {

		// See if the current user has an active session
		const session = await getSession({ req }) as IAuthSession | null;
		const userId = session?.user?.id ?? null;
		
		// parse parameter from request query
		const topicId = (req.query["topicId"] as string) ?? "";

		// connect to the database
		dbClient = await connectToDatabase();

		// perform the query
		const topicMetadata = await getTopicMetadata(dbClient, topicId).catch(err => { throw err; });
		const topicLessonData = await getTopicLessonData(dbClient, topicId, userId).catch(err => { throw err; });

		// send an OK response
		res.status(200).json({
			timestamp: (new Date()).toISOString(),
			...topicMetadata,
			lessons: topicLessonData
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


type TopicMetadata = Pick<TopicInformation, "id" | "label" | "description" | "lessonCount">

async function getTopicMetadata(dbClient: ServerlessClient, topicId: string): Promise<TopicMetadata> {
	// get metadata about the topic
	const res = await dbClient.query(`
		SELECT topics.id, label, topics.description, COUNT(*) as "lessonCount"
		FROM topics
		RIGHT JOIN lessons ON lessons.topic = topics.id
		WHERE topics.id = $1
		GROUP BY topics.id, label, topics.description
	`, [ topicId ]).catch(err => {
		console.error("Error: failed to query database for topic information. Error: ", err);
		throw err;
	});

	if(res.rows.length !== 1 || res.rows[0].id === null) {
		throw new Error("No matching topic was found");
	}

	return res.rows[0];
}


interface ITopicLessonData<P> {
	id: number,
	title: string,
	description: string,
	is_completed: P
}

type RawLessonData = ITopicLessonData<number>

async function getTopicLessonData(dbClient: ServerlessClient, topicId: string, userId: string | null): Promise<TopicLessonInformation[]> {
	let res: Promise<any>;

	// Run the query and check for completion if a userId is provided
	if(userId !== null) {
		res = dbClient.query(`
			SELECT id, title, description, (SELECT COUNT(*) FROM lesson_completions lc WHERE lc.user = $1 AND lc.lesson = l.id) as is_completed
			FROM lessons l
			WHERE l.topic = $2
		`, [ userId, topicId ]);
	}
	// Run the query without checking for completion if a userId is not provided
	else {
		res = dbClient.query(`
			SELECT id, title, description, false as is_completed
			FROM lessons 
			WHERE topic = $1
		`, [ topicId ]);
	}


	return await res.then<any>(res => {
		// mutate the data returned to include additional, calculated fields
		return (res.rows as any).map((row: any) => {
			return {
				...row,
				is_completed: row.is_completed >= 1,
				href: `/lesson/${encodeURIComponent(row.id)}`
			};
		}) as TopicLessonInformation[];;
	})
	.catch(err => {
		console.error("Error: failed to query database for topic information. Error: ", err);
		throw new Error(err);
	});
} 
