import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "./[lessonId].module.scss";
import { Background } from "@components/index";
import { ConversationArea, SendMessageForm, Sidebar, TitleBar } from "@components/LessonPage/index";
import { Sender } from "@customTypes/messages";

import type { FunctionComponent, PropsWithChildren } from "react";
import type { NextRouter } from "next/router";
import type { Lesson } from "@customTypes/lesson";
import type { Response as LessonApiRouteResponse } from "@pages/api/lesson/[lessonId]";
import type { Response as PartApiRouteResponse } from "@pages/api/lesson/[lessonId]/parts/[partNumber]";
import type { IMessage } from "@customTypes/messages";


type Props = PropsWithChildren<{
	router: NextRouter,
}>


const LessonPage: FunctionComponent<Props> = (props) => {
	// State & Other Hooks
	const [lessonId, setLessonId] = useState<number | undefined>(undefined);
	const [lesson, setLesson] = useState<Lesson | undefined>();
	const [currentPart, setCurrentPart] = useState(0);
	const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
	const [messages, setMessages] = useState<IMessage[]>([]);
	const router = useRouter();

	// Methods
	const toggleSidebarOpen = () => { setSidebarIsOpen(!sidebarIsOpen); };

	const sendMessageHandler = (message: string) => {
		if(lesson !== undefined) {
			setMessages([... messages, {
				timestamp: new Date(),
				sender: Sender.USER,
				content: message
			}]);
		}
	};

	// Effects
	useEffect(() => {
		try {
			// when the router is ready, parse the lessonId query parameter and save it as state
			if(router.isReady) {
				const parsedLessonId = parseInt(router.query["lessonId"] as string);

				if(isNaN(parsedLessonId)) {
					throw new Error("Error: the lesson ID in the query is invalid");
				}

				setLessonId(parsedLessonId);

				// then fetch the lesson details from the API
				fetchLesson(parsedLessonId).then(lesson => {
					setLesson(lesson);
				}).catch(err => { throw err; });
			}
		} catch(err) {
			alert("Error: failed to fetch the lesson! Please try again later.");
			console.error(err);
		}
	}, [ router.isReady ]);


	useEffect(() => {
		// When the lesson is retrieved, request the first part of the lesson content
		if(lessonId !== undefined) {
			getLessonPart(lessonId, currentPart).then(resp => {
				setMessages([... messages, {
					timestamp: new Date(),
					sender: Sender.SYSTEM,
					content: resp
				}]);
			}).catch(err => { throw err; });
		}
	}, [ lessonId ]);


	// Render
	return (
		<>
			<Head>
				<title>Lesson | Conversant</title>
			</Head>

			<Background>
				<div id={styles["page"]}>
					<Head>
						<title>
							{ (lesson !== undefined) ? `${lesson.title} (${lesson.topicLabel})` : "Lesson"} | Conversant
						</title>
					</Head>
	
					<div id={styles["sidebar"]} className={(sidebarIsOpen) ? styles["open"] : ""}>
						<Sidebar />
					</div>
	
					<div id={styles["title-bar"]}>
						<TitleBar toggleSidebarOpen={toggleSidebarOpen} sidebarOpen={sidebarIsOpen} lessonTitle={lesson?.title ?? "Loading..."} lessonTopic={lesson?.topicLabel ?? ""} />
					</div>
	
					<div id={styles["message-area"]}>
						<ConversationArea messages={messages} />
					</div>
	
					<div id={styles["reply-bar"]}>
						<SendMessageForm messageSentHandler={sendMessageHandler} disabled={lesson === undefined} />
					</div>
				</div>
			</Background>
		</>
	);
};

export default LessonPage;


/**
 * Helper function to retrieve the lesson's information from the API.
 */
async function fetchLesson(lessonId: number): Promise<Lesson> {
	const resp = await fetch(`/api/lesson/${lessonId}`);

	if(! resp.ok) {
		throw new Error(`API request to retrieve lesson information failed with status ${resp.status} (${resp.statusText})`);
	}

	const body = await resp.json() as LessonApiRouteResponse;

	if("error" in body) {
		throw new Error(body.error);
	}

	return body.lesson;
}


/**
 * Helper function to retrieve an individual message as part of a lesson from the API.
 */
async function getLessonPart(lessonId: number, part: number): Promise<string> {
	const resp = await fetch(`/api/lesson/${lessonId}/parts/${part}`).catch(err => { throw err; });

	if(! resp.ok) {
		throw new Error("failed to fetch the lesson part");
	}

	const body = await resp.json() as PartApiRouteResponse;

	if("error" in body) {
		throw new Error(body.error);
	}

	return body.part;
}
