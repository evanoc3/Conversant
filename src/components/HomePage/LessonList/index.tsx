import { FunctionComponent, PropsWithChildren, useState } from "react";
import { useSession } from "next-auth/client";
import styles from "./LessonList.module.scss";


type Props = PropsWithChildren<{
}>


const LessonList: FunctionComponent<Props> = () => {
	const [ session, sessionIsLoading ] = useSession(); 
	const [ lessons, setLessons ] = useState({});

	getLessons();


	if(session) {
		return (
			<div id={styles["lesson-list"]}>
				<h2>Your Lessons</h2>
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



async function getLessons(): Promise<any> {
	const resp = await fetch("/api/my/topics");

	if(! resp.ok) {
		console.error(`Error: failed API request to get current users enrolled lessons. Status ${resp.status} (${resp.statusText})`);
		throw new Error("Failed API request to get current users enrolled lessons");
	}

	const body = await resp.json();

	console.log(body);

	return body;
}