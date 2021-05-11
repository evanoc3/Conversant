import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client"; 
import styles from "./[lessonId].module.scss";
import { Background } from "@components/index";
import { ConversationArea, SendMessageForm, Sidebar, TitleBar } from "@components/LessonPage/index";
import { Sender } from "@customTypes/messages";
import { LessonPartResponseType } from "@customTypes/lesson";  

import type { FunctionComponent, PropsWithChildren } from "react";
import type { NextRouter } from "next/router";
import type { Lesson } from "@customTypes/lesson";
import type { Response as LessonApiRouteResponse } from "@pages/api/lesson/[lessonId]";
import type { Response as PartApiRouteResponse } from "@pages/api/lesson/[lessonId]/part/[partNumber]";
import type { Response as UserResponseApiRouteResponse } from "@pages/api/lesson/[lessonId]/part/[partNumber]/response";
import type { IMessage } from "@customTypes/messages";


type Props = PropsWithChildren<{
	router: NextRouter,
}>


const LessonPage: FunctionComponent<Props> = (props) => {
	// State & Other Hooks
	const [lessonId, setLessonId] = useState<number | undefined>(undefined);
	const [lesson, setLesson] = useState<Lesson | undefined>();
	const [currentPart, setCurrentPart] = useState(-1);
	const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
	const [messages, setMessages] = useState<IMessage[]>([]);
	const [isTyping, setIsTyping] = useState(false);
	const [isLessonOver, setIsLessonOver] = useState(false);
	const [isUserInputEnabled, setUserInputEnabled] = useState(false);
	const [session] = useSession();
	const router = useRouter();

	// Methods
	function toggleSidebarOpen() {
		setSidebarIsOpen(!sidebarIsOpen);
	}

	async function sendMessageHandler(msg: string): Promise<void> {
		if(lessonId !== undefined && currentPart >= 0) {
			await postResponse(lessonId, currentPart, msg).then(resp => {
				setMessages([...messages, {
					timestamp: new Date(),
					sender: Sender.USER,
					content: msg
				}]);
				
				if("proceedTo" in resp && typeof resp.proceedTo === "number") {
					setCurrentPart(resp.proceedTo);
				}
			}).catch(err => { throw err; });
		}
	}

	/**
	 * This function is called as a side-effect whenever `lessonId` and `currentPart` change. It fetches the lesson part given by the
	 * current `lessonId` and `currentPart` state fields, and adds it to the `messages` state list.
	 * 
	 * If the `responseType` of the fetched
	 * lesson part is `null` then it increments the `currentPart` state, which as a result of the side-effect mentioned above, calls it
	 * again for the next part.
	 */
	async function getLessonPart(): Promise<void> {
		const resp = await fetchLessonPart(lessonId!, currentPart).catch(err => { throw err; });

		if("error" in resp) {
			throw resp.error;
		}

		switch(resp.type) {
			case LessonPartResponseType.Proceed:
			case LessonPartResponseType.EndOfLesson:
				setUserInputEnabled(false);
				break;
		}

		if("pause" in resp) {
			if(process.env.NODE_ENV === "development") {
				console.debug(`Pausing ${resp.pause}ms for lesson part ${resp.id}`);
			}
			await new Promise(resolve => setTimeout(resolve, resp.pause));
		}

		// Set according to the average characters per minute typed by a fast adult (see http://typefastnow.com/average-typing-speed)
		const typingTime = resp.content.length * 22.5;

		setIsTyping(true);

		// wait for the timeout
		await new Promise(resolve => setTimeout(resolve, typingTime));

		setIsTyping(false);
		
		setMessages([...messages, {
			timestamp: new Date(),
			sender: Sender.SYSTEM,
			content: resp.content
		}]);


		// React based on the `type` of the new lesson part
		switch(resp.type) {
			// If the lesson is `proceed` type, then immediately move on to the next part
			case LessonPartResponseType.Proceed:
				setCurrentPart(resp.proceedTo!);
				break;

			// If the lesson is `end` type, then set the `isLessonOver` flag
			case LessonPartResponseType.EndOfLesson:
				if(session !== null) {
					postLessonCompletion(lessonId!);
				}
				setIsLessonOver(true);
				break;
			
			// If the lesson is any interactive type (e.g. YesNo, or MultipleChoice) then enable the user input
			case LessonPartResponseType.YesNo:
			case LessonPartResponseType.MultipleChoice:
				setUserInputEnabled(true);
				break;
		}
	}

	// Fetch lesson metadata when router is ready and has parsed lessonId
	useEffect(() => {
		if(router.isReady) {
			// when the router is ready, parse the lessonId query parameter and save it as state
			try {
				const parsedLessonId = parseInt(router.query["lessonId"] as string);

				if(isNaN(parsedLessonId)) {
					throw new Error("Error: the lesson ID in the query is invalid");
				}

				setLessonId(parsedLessonId);
			}
			catch(err) {
				alert("Error: failed to fetch the lesson! Please try again later.");
				console.error(err);
				router.push("/home");
			}

			// If the lessonId field is set, then fetch the lesson details from the API
			if(lessonId !== undefined) {
				try {
					fetchLesson(lessonId!).catch(err => { throw err; }).then(lesson => {
						setLesson(lesson);
						setCurrentPart(lesson.firstPart);
					});
				}
				catch(err) {
					alert("Error: failed to fetch the lesson! Please try again later.");
					console.error(err);
					router.push("/home");
				}
			}
		}
	}, [ router.isReady, lessonId ]);

	// When the current lesson part state is updated, request that part of the lesson content
	useEffect(() => {
		if(lessonId !== undefined && currentPart >= 0) {
			try {
				getLessonPart().catch(err => { throw err; });
			}
			catch(err) {
				alert("Error: failed to fetch the lesson part! Please try again later.");
				console.error(err);
				router.push("/home");
			}
		}
	}, [ lessonId, currentPart ]);

	// Once the lesson is started, set event handlers to confirm page navigation
  useEffect(() => {
    const warningText = "This page is asking you to confirm that you want to leave — information you’ve entered may not be saved.";

		// handles browser events for external navigation
    const handleWindowClose = (e: BeforeUnloadEvent) => {
      if (currentPart < 0) {
				return;
			}
      e.preventDefault();
      return (e.returnValue = warningText);
    };

		// handles nextjs router events for internal navigation
    const handleBrowseAway = () => {
      if (currentPart < 0 || window.confirm(warningText)) {
				return;
			}
      router.events.emit("routeChangeError");
      throw new Error("routeChange aborted");
    };

		if(isLessonOver) {
			window.removeEventListener("beforeunload", handleWindowClose);
      router.events.off("routeChangeStart", handleBrowseAway);
			return;
		}

    window.addEventListener("beforeunload", handleWindowClose);
    router.events.on("routeChangeStart", handleBrowseAway);

    return () => {
      window.removeEventListener("beforeunload", handleWindowClose);
      router.events.off("routeChangeStart", handleBrowseAway);
    };

  }, [ currentPart >= 0, isLessonOver ]);


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
						<ConversationArea messages={messages} isTyping={isTyping} hasReachedEnd={isLessonOver} endInfo={(lesson !== undefined) ? { nextLesson: lesson.nextLesson, topicId: lesson.topic, topicShortLabel: lesson.topicLabel.split(" ")[0]} : undefined} />
					</div>
	
					<div id={styles["reply-bar"]}>
						<SendMessageForm messageSentHandler={sendMessageHandler} disabled={!isUserInputEnabled} />
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
async function fetchLessonPart(lessonId: number, part: number): Promise<PartApiRouteResponse> {
	const resp = await fetch(`/api/lesson/${lessonId}/part/${part}`).catch(err => { throw err; });

	if(! resp.ok) {
		throw new Error("failed to fetch the lesson part");
	}

	const body = await resp.json() as PartApiRouteResponse;

	if("error" in body) {
		throw new Error(body.error);
	}
	
	return body;
}


/**
 * Helper function which POSTs a user's response to a lesson part off to the `/api/lesson/[]/part/[]/response` endpoint.
 */
async function postResponse(lessonId: number, part: number, msg: string): Promise<UserResponseApiRouteResponse> {
	const resp = await fetch(`/api/lesson/${lessonId}/part/${part}/response`, {
		method: "POST",
		body: JSON.stringify({
			message: msg
		}),
		headers: {
			"Content-Type": "application/json"
		}
	}).catch(err => { throw err });

	if(!resp.ok) {
		throw new Error("Recieved error response status from API");
	}

	const body = await resp.json() as UserResponseApiRouteResponse;

	if("error" in body) {
		console.error(body.error);
		throw new Error(body.error);
	}

	return body;
}


/**
 * Helper function which sends a POST request to the API endpoint for marking the specific user has completed the specific lesson. The API checks if the user
 * is authenticated on the request itself, and parses the userId from that so it doesn't need to be provided here.
 * 
 * @throws If the request fails as a result of a network error.
 * @throws If the request receives an "error" field in the response from the server (due to the API itself rejecting the request, rather than the network).
 */
 async function postLessonCompletion(lessonId: number): Promise<void> {
	const resp = await fetch(`/api/lesson/${lessonId}/complete`, { method: "POST" });

	if(!resp.ok) {
		throw new Error(`POST request to lesson completion endpoint failed with status: (${resp.status}) ${resp.statusText}`);
	}

	const body = await resp.json();

	if("error" in body) {
		throw new Error(body.error);
	}

	return;
}