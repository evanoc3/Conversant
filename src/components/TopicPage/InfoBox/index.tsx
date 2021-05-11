import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import styles from "./InfoBox.module.scss";

import type { FunctionComponent, PropsWithChildren } from "react";


type Props = PropsWithChildren<{
	className?: string,
	description: string,
	lessonCount: number
}>


const InfoBox: FunctionComponent<Props> = (props) => {

	return (
		<div id={styles["container"]} className={props.className}>
			<div id={styles["info-box"]}>

				<div id={styles["description"]}>
					<ReactMarkdown remarkPlugins={[remarkMath, remarkGfm]} rehypePlugins={[rehypeKatex]}>
						{ props.description }
					</ReactMarkdown>
				</div>

				<div id={styles["bottom-row"]}>
					<span>Lessons: {props.lessonCount}</span>
				</div>
			</div>
		</div>
	);
}

export default InfoBox;