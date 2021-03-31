import { Fragment } from "react";
import Link from "next/link";
import { ArrowRight as ArrowRightSvg } from "react-feather";
import styles from "./LessonCarousel.module.scss";

import { FunctionComponent, PropsWithChildren } from "react";
import type { TopicLessonInformation } from "@pages/api/topic/[topicId]";


type Props = PropsWithChildren<{
	lessons: TopicLessonInformation[]
}>


const LessonCarousel: FunctionComponent<Props> = (props) => {
	return (
		<div id={styles["outer-container"]}>
			<div id={styles["inner-container"]}>
				{
					props.lessons.map(lesson => {
						return (
							<Fragment key={lesson.id}>
								<ArrowRightSvg className={styles["arrow"]} />

								<div className={styles["lesson-container"]}>
									<h2>{ lesson.title }</h2>
									
									<Link href={lesson.href}>
										<a href={lesson.href}>Go to lesson</a>
									</Link>
								</div>
							</Fragment>
						)
					})
				}

			</div>
		</div>
	);
};

export default LessonCarousel;