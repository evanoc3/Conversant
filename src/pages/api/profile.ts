import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import type { IAuthSession, IUserDocument } from "@customTypes/auth";
import { MongoClient, ObjectId } from "mongodb";


export default async function UserProfileHandler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const session: IAuthSession | null = await getSession({ req });

		if(session === null) {
			throw new Error("No session exists");
		}

		const userDoc = await getUserProfile(session.user.id!);

		// If the db document for userId is empty, response with a successful response to the client
		if(userDoc === null) {
			console.debug(`No matching user was found for userId: "${session.user.id}"`);
			res.json({
				timestamp: (new Date()).toISOString(),
				userId: session.user.id,
				error: "No matching user was found"
			});
		}

		// happy path
		if(userDoc !== null) {
			res.status(200).json({
				timestamp: (new Date()).toISOString(),
				userId: session.user.id,
				profile: userDoc
			});
		}
	}
	catch(err) {
		// If any error is thrown, send a 500 Error response with a timestamp and error message
		res.status(500).json({
			timestamp: (new Date()).toISOString(),
			error: (err as Error).message
		});


	}
}

async function getUserProfile(userId: string) {
	console.log(`Searching for user: ${userId}`);

	// Connect to the Database
	const client = await MongoClient.connect(process.env["AUTH_DATABASE"]!, { useUnifiedTopology: true }).then(client => {
		console.log("Connected to the database successfully");
		return client;
	}).catch(err => {
		console.error("Error: failed to connect to the database. Error message: ", err);
		throw new Error("Could not connect to database");
	});

	const userCollection = client.db().collection("users");

	// Search for userId in `users` collection
	const userDoc = await userCollection.findOne<IUserDocument>({ _id: new ObjectId(userId) }, { projection: { profile: 1 } }).then(doc => {
		if(doc !== null) {
			console.log("Found user matching provided userId in collection");
		}
		return doc;
	}).catch(err => {
		console.error(`Error: failed to find user in database. Error message: `, err);
		throw new Error("Failed to find user in database");
	});

	client.close(() => {
		console.log("Closed DB connection");
	});

	if(userDoc === null) {
		return null;
	}

	return userDoc.profile;
}