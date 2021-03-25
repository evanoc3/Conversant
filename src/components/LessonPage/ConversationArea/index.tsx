import type { FunctionComponent, PropsWithChildren } from "react";
import { useState } from "react";
import styles from "./ConversationArea.module.scss";
import { Message, UserMessage } from "../index";
import YesNoChoiceMessage from "../YesNoChoiceMessage";


type Props = PropsWithChildren<{
	content: any,
	currentStep: number
}>


const ConversationArea: FunctionComponent<Props> = () => {
	const [ choice, setChoice ] = useState<boolean | undefined>(undefined);

	const choiceSelectionHandler = (c: boolean) => {
		if(c === true) {
			alert("You selected true");
			setChoice(true);
		} else {
			alert("you selected false");
			setChoice(false);
		}
	};

	return (
		<div id={styles["conversation-area"]}>
			<UserMessage message="Hello, World!" />
			<Message message="Hi, how are you today?" />
			<Message message="Hi, How are you? Im gonna test this with a erally long message, i wonder when it will insert a line break, hopefully it wont look too bad where it does it automatically" />
			<YesNoChoiceMessage message="Are you feeling good today?" onChoiceSelected={choiceSelectionHandler} choiceSelected={choice} />
		</div>
	);
};

export default ConversationArea;