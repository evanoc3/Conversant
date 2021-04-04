import { Fragment } from "react";
import Link from "next/link";
import { ArrowRight as ArrowRightSvg, ExternalLink as ExternalLinkSvg, CheckCircle as CheckCircleSvg } from "react-feather";
import styles from "./LessonCarousel.module.scss";

import { FunctionComponent, PropsWithChildren } from "react";
import type { TopicLessonInformation } from "@pages/api/topic/[topicId]";


type Props = PropsWithChildren<{
	className?: string,
	lessons: TopicLessonInformation[]
}>


const LessonCarousel: FunctionComponent<Props> = (props) => {
	return (
		<div id={styles["container"]} className={props.className}>
			<div className={styles["h-spacer"]} />

			{
				(props.lessons.length >= 1) ? (
					props.lessons.map((lesson, index) => {
						return (
							<Fragment key={lesson.id}>
								<ArrowRightSvg className={styles["arrow"]} />

								<div className={styles["lesson-container"]}>
									<h2>{index + 1}. { lesson.title }</h2>
									<div className={styles["lesson-description-container"]}>
										{
											(lesson.description !== null) ? (
												<p>{ lesson.description }</p>
											) : ""
										}
									</div>
									
									<div className={styles["lesson-bottom-row"]}>
										<Link href={lesson.href}>
											<a href={lesson.href}>
												Go to lesson
												<ExternalLinkSvg className={styles["lesson-link-icon"]} />
											</a>
										</Link>

										<div className={styles["lesson-h-spacer"]} />

										{
											(lesson.is_completed) ? (
												<div className={styles["completed-icon-container"]} title="Lesson completed">
													<CheckCircleSvg className={styles["completed-icon"]} />
												</div>
											) : ""
										}
									</div>
									
								</div>
							</Fragment>
						)
					})
				) : (
					<div>No Lessons Available</div>
				)
			}

			<div className={styles["h-spacer"]} />
		</div>
	);
};

export default LessonCarousel;