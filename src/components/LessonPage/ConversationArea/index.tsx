import { FunctionComponent, PropsWithChildren } from "react";
import styles from "./ConversationArea.module.scss";
import { Message, UserMessage } from "../index";


type Props = PropsWithChildren<{
	content: any,
	currentStep: number
}>


const ConversationArea: FunctionComponent<Props> = () => {
	return (
		<div id={styles["conversation-area"]}>
			<UserMessage message="Hello, World!" />
			<Message message="Hi, how are you today?" />
			<Message message="Hi, How are you? Im gonna test this with a erally long message, i wonder when it will insert a line break, hopefully it wont look too bad where it does it automatically" />
		</div>
	);
};

export default ConversationArea;