import styles from "./IsTypingMessageBubble.module.scss";

import type { FunctionComponent, PropsWithChildren } from "react";


type Props = PropsWithChildren<{
}>


const IsTypingMessageBubble: FunctionComponent<Props> = (props) => {
	return (
		<div className={styles["container"]}>
			<div className={styles["plain-message"]}>
				<span className={styles["inner-text"]}>Typing...</span>
			</div>
		</div>
	);
};

export default IsTypingMessageBubble;