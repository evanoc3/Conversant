import Link from "next/link";
import styles from "./EndOfLessonBanner.module.scss";

import type { PropsWithChildren } from "react";


type Props = PropsWithChildren<{
	nextLesson: number | null,
	topic: string,
	topicShortLabel: string
}>


export default function EndOfLessonBanner(props: Props): JSX.Element {
	return (
		<div id={styles["container"]}>
			<div id={styles["banner"]}>
				<h2 id={styles["banner-title"]}>🎉🎉 You've reached the end of this lesson! 🎉🎉</h2>
				
				<div id={styles["choices-row"]}>
					{
						(props.nextLesson !== null) ? (
							<Link href={`/lesson/${props.nextLesson}`}>
								<a href={`/lesson/${props.nextLesson}`} className={styles["choice"]}>
									Next Lesson
								</a>
							</Link>
						) : ""
					}

					{
						(props.topic !== undefined) ? (
							<Link href={`/topic/${props.topic}`}>
								<a href={`/topic/${props.topic}`} className={styles["choice"]}>
									View other lessons in { props.topicShortLabel ?? "topic" }
								</a>
							</Link>
						) : "" 
					}

					<Link href="/home">
						<a href="/home" className={styles["choice"]}>
							Return home
						</a>
					</Link>
				</div>
			</div>
		</div>
	);
}
