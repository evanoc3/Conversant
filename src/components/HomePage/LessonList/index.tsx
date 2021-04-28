import { FunctionComponent, PropsWithChildren, useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/client";
import styles from "./LessonList.module.scss";
import type { Response as ApiRouteResponse, TopicDetail } from "@pages/api/my/topics";


type Props = PropsWithChildren<{
}>


const LessonList: FunctionComponent<Props> = () => {
	const [ session, sessionIsLoading ] = useSession(); 
	const [ topics, setTopics ] = useState<TopicDetail[]>([]);

	useEffect(() => {
		getTopics().then(res => {
			setTopics(res);
		}).catch(err => {
			alert(err);
		});
	}, []);


	if(session) {
		return (
			<div id={styles["container"]}>
				<h2 id={styles["title"]}>Your Topics</h2>
				
				<ol id={styles["lesson-list"]}>
					{
						topics.map(topic => (
							<li key={topic.id} className={styles["list-item"]}>
								<Link href={`/topic/${topic.id}`}>{ topic.label }</Link>
							</li>
						))
					}
				</ol>
			</div>
		);
	}

	return (
		<div id={styles["lesson-list"]}>
			<div id={styles["loading"]}>Loading...</div>
		</div>
	);
};

export default LessonList;



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