import { FunctionComponent, PropsWithChildren } from "react";
import styles from "./ConversationArea.module.scss";


type Props = PropsWithChildren<{
	content: any,
	currentStep: number
}>


const ConversationArea: FunctionComponent<Props> = () => {
	return (
		<div id={styles["conversation-area"]}>
			{ renderUserMessage("Hello, World!") }
			{ renderConversantMessage("Hi, How are you?") }
			{ renderConversantMessage("Hi, How are you? Im gonna test this with a erally long message, i wonder when it will insert a line break, hopefully it wont look too bad where it does it automatically") }
		</div>
	);
};

export default ConversationArea;


function renderUserMessage(msg: string): JSX.Element {
	return (
		<div className={styles["user-message-container"]}>
			<div className={styles["message"]}>
				{msg}
			</div>
		</div>
	);
}

function renderConversantMessage(msg: string): JSX.Element {
	return (
		<div className={styles["message-container"]}>
			<div className={styles["message"]}>
				{msg}
			</div>
		</div>
	);
}