import { createRef, useEffect, useRef } from "react";
import styles from "./ConversationArea.module.scss";
import { IsTypingMessageBubble, Message, UserMessage, EndOfLessonBanner } from "@components/LessonPage/index";
import { Sender } from "@customTypes/messages";

import type { PropsWithChildren } from "react";
import type { IMessage } from "@customTypes/messages";


type Props = PropsWithChildren<{
	messages: IMessage[],
	isTyping: boolean,
	hasReachedEnd: boolean,
	endInfo?: {
		topicId: string,
		topicShortLabel: string,
		nextLesson: number | null
	}
}>


export default function ConversationArea(props: Props): JSX.Element {
	const bottomMarker = createRef<HTMLDivElement>();

	// When a new message is added, scroll the element at the bottom into view, essentially scrolling to the bottom
	useEffect(() => {
		if(bottomMarker.current !== null) {
			bottomMarker.current.scrollIntoView({ behavior: "smooth" })
		}
	}, [ props.messages.length, props.isTyping, props.hasReachedEnd ]);


	return (
		<div id={styles["conversation-area"]}>
			{ 
				props.messages.map(({sender, content}, i) => 
					(sender === Sender.USER) ? <UserMessage key={i} message={content} /> : <Message key={i} message={content} />
				)
			}

			{
				(props.isTyping) ? (
					<IsTypingMessageBubble key={"typing"} />
				) : ""
			}

			<div ref={bottomMarker} />

			{
				(props.hasReachedEnd) ? (
					<EndOfLessonBanner nextLesson={props.endInfo!.nextLesson} topic={props.endInfo!.topicId} topicShortLabel={props.endInfo!.topicShortLabel} />
				) : ""
			}
		</div>
	);
};