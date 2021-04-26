import { getSession } from "next-auth/client";
import { connectToDatabase } from "@util/database";

import type { NextApiRequest, NextApiResponse } from "next";
import type { ServerlessMysql } from "serverless-mysql";
import type { ApiResponse } from "@customTypes/api";
import type { IAuthSession } from "@customTypes/auth";


/**
 * Typescript interface used to model the result of the database query for lessons about a particular topic.
 */
export interface TopicLessonInformation {
	id: number,
	title: string,
	description: string,
	is_completed: boolean
	href: string
}


/**
 * Typescript interface used to model the results of the database query for metadata on a particular topic.
 */
export interface TopicInformation {
	id: number,
	label: string,
	description: string,
	enrolledUsers: number,
	lessonCount: number,
	lessons: TopicLessonInformation[],
}


/**
 * Typescript interface for the JSON serialized value returned by this API route.
 */
export type Response = ApiResponse<TopicInformation>


/**
 * Main function for this API route.
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
	let mysql: ServerlessMysql | undefined;

	try {
		// See if the current user has an active session
		const session = await getSession({ req }) as IAuthSession;
		const userId = session.user?.id ?? "";
		
		// parse parameter from request query
		const topicId = (req.query["topicId"] as string) ?? "";

		// connect to the database
		const mysql = await connectToDatabase();

		// perform the query
		const topicMetadata = await getTopicMetadata(mysql, topicId).catch(err => { throw err; });
		const topicLessonData = await getTopicLessonData(mysql, topicId, userId).catch(err => { throw err; });
		const enrolledUsers = await getTopicEnrolledUsers(mysql, topicId).catch(err => { throw err; });

		// send an OK response
		res.status(200).json({
			timestamp: (new Date()).toISOString(),
			...topicMetadata,
			enrolledUsers: enrolledUsers,
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
		if(mysql !== undefined) {
			await mysql.end();
		}
	}
};


type TopicMetadata = Pick<TopicInformation, "id" | "label" | "description" | "lessonCount">

async function getTopicMetadata(mysql: ServerlessMysql, topicId: string): Promise<TopicMetadata> {
	// get metadata about the topic
	const topicInfoRow = await mysql.query<TopicMetadata[]>(`
		SELECT topics.id, label, topics.description, COUNT(*) as lessonCount
		FROM topics
		RIGHT JOIN lessons ON lessons.topic = topics.id
		WHERE topics.id = ?
	`, [ topicId ]).catch(err => {
		console.error("Error: failed to query database for topic information. Error: ", err);
		throw err;
	});

	if(topicInfoRow.length !== 1 || topicInfoRow[0].id === null) {
		throw new Error("No matching topic was found");
	}

	return topicInfoRow[0];
}


interface ITopicLessonData<P> {
	id: number,
	title: string,
	description: string,
	is_completed: P
}
type RawLessonData = ITopicLessonData<number>

async function getTopicLessonData(mysql: ServerlessMysql, topicId: string, userId: string): Promise<TopicLessonInformation[]> {
	const topicLessonRows = await mysql.query<RawLessonData[]>(`
			SELECT id, title, description, (SELECT COUNT(*) FROM lesson_completions lc WHERE lc.\`user\` = ? AND lc.lesson = l.id) as is_completed
			FROM lessons l
			WHERE l.topic = ?	
	`, [ userId, topicId ])
	.then<TopicLessonInformation[]>(rows => {
		// mutate the data returned to include additional, calculated fields
		const newRows = rows.map<ITopicLessonData<number | boolean>>(row => {
			return {
				...row,
				is_completed: row.is_completed >= 1,
				href: `/lesson/${encodeURIComponent(row.id)}`
			};
		}) as TopicLessonInformation[];

		return newRows;
	})
	.catch(err => {
		console.error("Error: failed to query database for topic information. Error: ", err);
		throw new Error(err);
	});

	return topicLessonRows;
} 


async function getTopicEnrolledUsers(mysql: ServerlessMysql, topicId: string): Promise<number> {
	const enrolledUsersQuery = await mysql.query<{enrolledUsers: number}[]>(`
		SELECT COUNT(*) as \`enrolledUsers\` FROM \`enrolments\` WHERE topic = ?
	`, [ topicId ]).catch(err => {
		throw err;
	});

	return enrolledUsersQuery[0].enrolledUsers
}