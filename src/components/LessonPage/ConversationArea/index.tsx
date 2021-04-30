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
	const areaBottom = createRef<HTMLDivElement>();

	useEffect(() => {
		if(areaBottom.current !== null) {
			areaBottom.current.scrollIntoView({ behavior: "smooth" })
		}
	}, [ props.messages.length ]);

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

			<div ref={areaBottom} />

			{
				(props.hasReachedEnd) ? (
					<EndOfLessonBanner nextLesson={props.endInfo!.nextLesson} topic={props.endInfo!.topicId} topicShortLabel={props.endInfo!.topicShortLabel} />
				) : ""
			}
		</div>
	);
};