import { FunctionComponent, PropsWithChildren } from "react";
import styles from "./ConversationArea.module.scss";


type Props = PropsWithChildren<{
	content: any,
	currentStep: number
}>


const ConversationArea: FunctionComponent<Props> = () => {
	return (
		<div id={styles["conversation-area"]}>
		</div>
	);
};

export default ConversationArea;