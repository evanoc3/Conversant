import styles from "./InfoBox.module.scss";
import { MarkdownRenderer } from "@components/index";

import type { FunctionComponent, PropsWithChildren } from "react";


type Props = PropsWithChildren<{
	className?: string,
	description: string,
	lessonCount: number
}>


export default function InfoBox(props: Props): JSX.Element {
	return (
		<div id={styles["container"]} className={props.className}>
			<div id={styles["info-box"]}>

				<div id={styles["description"]}>
					<MarkdownRenderer>
						{ props.description }
					</MarkdownRenderer>
				</div>

				<div id={styles["bottom-row"]}>
					<span>Lessons: {props.lessonCount}</span>
				</div>
			</div>
		</div>
	);
}