import styles from "./ConversationArea.module.scss";
import { IsTypingMessageBubble, Message, UserMessage } from "@components/LessonPage/index";
import { Sender } from "@customTypes/messages";

import type { PropsWithChildren } from "react";
import type { IMessage } from "@customTypes/messages";


type Props = PropsWithChildren<{
	messages: IMessage[],
	isTyping: boolean
}>


export default function ConversationArea(props: Props): JSX.Element {
	return (
		<div id={styles["conversation-area"]}>
			{ 
				props.messages.map((message, i) => {
					if(message.sender === Sender.USER) {
						return (
							<UserMessage key={i} message={message.content} />
						);
					}
	
					return (
						<Message key={i} message={message.content} />
					);
				})
			}

			{
				(props.isTyping) ? (
					<IsTypingMessageBubble key={"typing"} />
				) : ""
			}
		</div>
	);
};