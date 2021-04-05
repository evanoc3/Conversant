import { useState, useEffect } from "react";
import styles from "./ConversationArea.module.scss";
import { Message, UserMessage } from "@components/LessonPage/index";
import { Sender } from "@customTypes/messages";

import type { FunctionComponent, PropsWithChildren } from "react";
import type { IMessage } from "@customTypes/messages";


type Props = PropsWithChildren<{
	messages: IMessage[]
}>

const ConversationArea: FunctionComponent<Props> = (props) => {
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
		</div>
	);
};

export default ConversationArea;