import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "./[topicId].module.scss";
import { Background } from "@components/index";
import { Header, LessonCarousel } from "@components/TopicPage/index";

import type { NextPage } from "next";
import type { Response as ApiRouteResponse, TopicInformation } from "@pages/api/topic/[topicId]";



const TopicPage: NextPage = (props) => {
	const router = useRouter();

	const [pageTitle, setPageTitle] = useState("Topic");
	const [topicInfo, setTopicInfo] = useState<TopicInformation | undefined>(undefined);


	useEffect(() => {
		const topicId = router.query["topicId"] as string;
		if(topicId !== undefined) {
			try {
				getTopic(topicId).then(topic => {
					setPageTitle(topic.label);
					setTopicInfo(topic);
				}).catch(err => {
					console.error("Error: ", err);
					throw err;
				});
			} catch(err) {
				alert(err);
			}
		}
	}, [ router.query["topicId"] ]);

	return (
		<>
			<Head>
				<title>{ pageTitle } | Conversant</title>
			</Head>

			<Background>
				{
					(topicInfo !== undefined) ? (
						<>
							<Header title={topicInfo.label} />

							<LessonCarousel lessons={topicInfo.lessons} />
						</>
					) : (
						<div>
							Loading...
						</div>
					)
				}

			</Background>
		</>

	);
};

export default TopicPage;


/**
 * Helper function which requests information about the topic from the API.
 * 
 * @throws if the request fails to execute.
 * @throws if the response has a not-OK status code.
 * @throws if the server's response has an `error` field.
 */
async function getTopic(topicId: string): Promise<TopicInformation> {
	const resp = await fetch(`/api/topic/${encodeURIComponent(topicId)}`).catch(err => {
		console.error(`Error: request to \"/api/topic/${encodeURIComponent(topicId)}\" failed. Error: `, err);
		throw err;
	});

	if(!resp.ok) {
		console.error("Error: failed to get topic information from the API. Response: ", resp);
		throw new Error("Error: failed to get topic information from the API");
	}

	const body = await resp.json() as ApiRouteResponse;

	if("error" in body) {
		throw new Error(body.error);
	}

	const topicInfo: TopicInformation & { timestamp?: string } = body;
	delete topicInfo["timestamp"];

	return topicInfo;
}