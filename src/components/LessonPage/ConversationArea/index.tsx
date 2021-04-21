import styles from "./ConversationArea.module.scss";
import { IsTypingMessageBubble, Message, UserMessage } from "@components/LessonPage/index";
import { Sender } from "@customTypes/messages";

import type { FunctionComponent, PropsWithChildren } from "react";
import type { MessageList } from "@customTypes/messages";


type Props = PropsWithChildren<{
	messages: MessageList
}>

const ConversationArea: FunctionComponent<Props> = (props) => {
	return (
		<div id={styles["conversation-area"]}>
			{ 
				props.messages.map((message, i) => {
					if(typeof message === "object") {
						if(message.sender === Sender.USER) {
							return (
								<UserMessage key={i} message={message.content} />
							);
						}
		
						return (
							<Message key={i} message={message.content} />
						);
					}

					return (
						<IsTypingMessageBubble key={"typing"} />
					)
				})
			}
		</div>
	);
};

export default ConversationArea;