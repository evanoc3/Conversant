import styles from "./InfoBox.module.scss";

import type { FunctionComponent, PropsWithChildren } from "react";


type Props = PropsWithChildren<{
	className?: string,
	description: string,
	enrolledUsers: number,
	lessonCount: number
}>


const InfoBox: FunctionComponent<Props> = (props) => {

	return (
		<div id={styles["container"]} className={props.className}>
			<div id={styles["info-box"]}>
				<p id={styles["description"]}>
					{ props.description }
				</p>

				<div id={styles["bottom-row"]}>
					<span>Lessons: {props.lessonCount}</span>
					<span>Enrolled Users: {props.enrolledUsers}</span>
				</div>
			</div>
		</div>
	);
}

export default InfoBox;