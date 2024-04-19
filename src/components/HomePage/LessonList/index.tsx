import { PropsWithChildren, useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import styles from "./LessonList.module.scss";
import type { Response as ApiRouteResponse, TopicDetail } from "@pages/api/my/topics";


type Props = PropsWithChildren<{
	className?: string
}>


export default function LessonList(props: Props): JSX.Element {
	const { data: session, status } = useSession(); 
	const [isLoading, setIsLoading] = useState(true);
	const [ topics, setTopics ] = useState<TopicDetail[]>([]);

	// The first time the component mounts, fetch data from the API
	useEffect(() => {
		getTopics().then(res => {
			setIsLoading(false);
			setTopics(res);
		}).catch(err => { throw err; });
	}, []);


	function renderTopicListItems(): JSX.Element | JSX.Element[] {
		if(isLoading) {
			return ( <li id={styles["loading-list-item"]}>Loading...</li> );
		}

		if(topics.length === 0) {
			return ( <li id={styles["no-items-list-item"]}>No topics to display</li> );
		}

		return topics.map(topic => (
			<li key={topic.id} className={styles["list-item"]}>
				<Link href={`/topic/${topic.id}`} className={styles["list-item-link"]}> { topic.label } </Link>
			</li>
		));
	}


	if(status !== "loading" && session !== null) {
		return (
			<div id={styles["container"]} className={props.className}>
				<h2 id={styles["title"]}>Your Topics</h2>
				
				<ul id={styles["lesson-list"]}>
					{ renderTopicListItems() }
				</ul>
			</div>
		);
	}

	return (
		<div id={styles["lesson-list"]}>
			<div id={styles["loading"]}>Loading...</div>
		</div>
	);
};


/**
 * Helper function which queries the API endpoint to get the current user's enrolled topics.
 */
async function getTopics(): Promise<TopicDetail[]> {
	const resp = await fetch("/api/my/topics");

	if(! resp.ok) {
		console.error(`Error: failed API request to get current users enrolled lessons. Status ${resp.status} (${resp.statusText})`);
		throw new Error("Failed API request to get current users enrolled lessons");
	}

	const body = await resp.json() as ApiRouteResponse;

	if("error" in body) {
		console.error("Error: failed API request to get current users enrolled lessons. Error message: ", body.error);
		throw new Error(body.error);
	}

	return body.enrolledTopics;
}
