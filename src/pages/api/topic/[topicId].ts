import type { NextApiRequest, NextApiResponse } from "next";
import type { ServerlessMysql } from "serverless-mysql";
import { connectToDatabase } from "@util/database";
import type { BaseApiResponse, ErrorApiResponse } from "@customTypes/api";


/**
 * Typescript interface used to model the result of the database query for lessons about a particular topic.
 */
export interface TopicLessonInformation {
	id: number,
	title: string,
	description: string,
	href: string
}


/**
 * Typescript interface used to model the results of the database query for metadata on a particular topic.
 */
export interface TopicInformation {
	id: string,
	label: string,
	enrolledUsers: number,
	lessonCount: number,
	lessons: TopicLessonInformation[],
}


/**
 * Typescript interface for the JSON serialized value returned by this API route.
 */
export type Response = BaseApiResponse & (ErrorApiResponse | TopicInformation)


/**
 * Main function for this API route.
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
	let mysql: ServerlessMysql | undefined;

	try {
		// parse parameter from request query
		const topicId = (req.query["topicId"] as string) ?? "";

		// connect to the database
		const mysql = await connectToDatabase();

		// perform the query
		const topic = await getTopicInformation(mysql, topicId).catch(err => { throw err; });

		// send an OK response
		res.status(200).json({
			timestamp: (new Date()).toISOString(),
			...topic
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
 * @throws if the database query fails for any reason.
 */
async function getTopicInformation(mysql: ServerlessMysql, topicId: string): Promise<TopicInformation> {
	// get metadata about the topic
	const topicInfoRow = await mysql.query<Omit<TopicInformation, "lessons" | "enrolledUsers">[]>(`
		SELECT topics.id, label, COUNT(*) as lessonCount FROM topics RIGHT JOIN lessons ON lessons.\`topic\` = topics.\`id\` WHERE topics.id = ?
	`, [ topicId ]).catch(err => {
		console.error("Error: failed to query database for topic information. Error: ", err);
		throw err;
	});

	if(topicInfoRow.length !== 1 || topicInfoRow[0].id === null) {
		throw new Error("No matching topic was found");
	}

	// get lessons that are part of the topic
	const topicLessonRows = await mysql.query<TopicLessonInformation[]>(`
	SELECT id, title, description FROM lessons WHERE lessons.topic = ? ORDER BY id ASC
	`, [ topicId ]).then(rows => {
		// mutate the database returned rows to include calculated fields
		rows = rows.map<TopicLessonInformation>(row => {
			return {
				...row,
				href: `/lesson/${encodeURIComponent(row.id)}`
			};
		});
		return rows;
	}).catch(err => {
		console.error("Error: failed to query database for topic information. Error: ", err);
		throw new Error(err);
	});

	// get count of users enrolled in the topic
	const enrolledUsersQuery = await mysql.query<{enrolledUsers: number}[]>(`
		SELECT COUNT(*) as \`enrolledUsers\` FROM \`enrolments\` WHERE topic = ?
	`, [ topicId ]).catch(err => {
		throw err;
	});

	return {
		...topicInfoRow[0],
		enrolledUsers: enrolledUsersQuery[0].enrolledUsers,
		lessons: topicLessonRows
	};
} 