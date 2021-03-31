import { Component } from "react";
import Head from "next/head";
import { withRouter, NextRouter } from "next/router";
import styles from "./[lessonId].module.scss";
import { Background } from "@components/index";
import { ConversationArea, SendMessageForm, Sidebar, TitleBar } from "@components/LessonPage/index";

import type { PropsWithChildren } from "react";
import type { Lesson } from "@customTypes/lesson";
import type { Response as ApiRouteResponse } from "@pages/api/lesson/[lessonId]";


type Props = PropsWithChildren<{
	router: NextRouter,
}>

interface State {
	lesson: Lesson | undefined,
	currentStep: number,
	sidebarOpen: boolean
}


class LessonPage extends Component<Props, State> {

	constructor(props: Props) {
		super(props);

		this.toggleSidebarOpen = this.toggleSidebarOpen.bind(this);

		this.state = {
			lesson: undefined,
			currentStep: 0,
			sidebarOpen: false
		};
	}


	public render(): JSX.Element {
		return (
			<>
				<Head>
					<title>Lesson | Conversant</title>
				</Head>

				<Background>
					{
						(this.state.lesson) ? this.renderLesson() : this.renderLoading()
					}
				</Background>

			</>
		);
	}


	public componentDidMount(): void {
		document.body.style.overflowY = "auto";

		let counter: number = 0;

		const interval = setInterval(() => {
			if(this.props.router.isReady) {
				this.getLesson();
				clearInterval(interval);
			}
			counter += 1;
		}, 10);
	}


	public componentWillUnmount() {
		document.body.style.overflowY = "hidden";
	}


	private async getLesson(): Promise<void> {
		const lessonId = this.props.router.query["lessonId"] as string;

		try {
			const lesson = await fetchLesson(lessonId).catch(err => { throw err; }) 

			this.setState({
				lesson: lesson
			});
		}
		catch(err) {
			console.error("Error: failed to retrieve lesson from API. Error message: ", err);
		}
	}


	private renderLesson(): JSX.Element {
		const { sidebarOpen, lesson } = this.state;

		return (
			<div id={styles["page"]}>
				<Head>
					<title>
						{ (lesson) ? `${lesson.title} (${lesson.topicLabel}) | Conversant` : "Lesson | Conversant"}
					</title>
				</Head>

				<div id={styles["sidebar"]} className={(sidebarOpen) ? styles["open"] : ""}>
					<Sidebar />
				</div>

				<div id={styles["title-bar"]}>
					<TitleBar toggleSidebarOpen={this.toggleSidebarOpen} sidebarOpen={sidebarOpen} lessonTitle={lesson!.title} lessonTopic={lesson!.topicLabel} />
				</div>

				<div id={styles["message-area"]}>
					<ConversationArea content={lesson!.content} currentStep={0} />
				</div>

				<div id={styles["reply-bar"]}>
					<SendMessageForm />
				</div>
			</div>
		);
	}

	private renderLoading(): JSX.Element {
		return (
			<div>Loading</div>
		);
	}

	private toggleSidebarOpen(): void {
		this.setState({
			sidebarOpen: !this.state.sidebarOpen
		});
	}
}

export default withRouter(LessonPage);


async function fetchLesson(lessonId: string): Promise<Lesson> {
	const resp = await fetch(`/api/lesson/${lessonId}`);

	if(! resp.ok) {
		throw new Error(`API request to retrieve lesson information failed with status ${resp.status} (${resp.statusText})`);
	}

	const body = await resp.json() as ApiRouteResponse;

	if("error" in body) {
		throw new Error(body.error);
	}

	return body.lesson;
}
