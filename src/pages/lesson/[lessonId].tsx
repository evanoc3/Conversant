import { Component, PropsWithChildren} from "react";
import Head from "next/head";
import { withRouter, NextRouter } from "next/router";
import { Menu as MenuSvg } from "react-feather";
import styles from "./[lessonId].module.scss";
import type { GetLessonApiRouteResponse } from "@customTypes/api";
import type { Lesson } from "@customTypes/lesson";
import { Background } from "@components/index";
import { Sidebar } from "@components/LessonPage/index";


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
					<title>Home | Conversant</title>
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
		let counter: number = 0;

		const interval = setInterval(() => {
			if(this.props.router.isReady) {
				console.debug(`Router was ready at counter ${counter}`);
				this.getLesson();
				clearInterval(interval);
			}
			counter += 1;
		}, 10);
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
		const lesson = this.state.lesson!;

		return (
			<div id={styles["page"]}>
				<Head>
					<title>
						{ (this.state.lesson) ? `${this.state.lesson.title} (${this.state.lesson.topic}) | Conversant` : "Lesson | Conversant"}
					</title>
				</Head>

				<div id={styles["sidebar"]} className={(this.state.sidebarOpen) ? styles["open"] : ""}>
					<Sidebar />
				</div>

				<div id={styles["title-bar"]}>
					<button id={styles["sidebar-button"]} onClick={this.toggleSidebarOpen} className={(this.state.sidebarOpen) ? styles["sidebar-open"] : ""}>
						<MenuSvg id={styles["sidebar-button-icon"]} />
					</button>

					<h1 id={styles["title"]}>{ lesson.title }</h1>
				</div>

				<div id={styles["message-area"]}>
				</div>

				<div id={styles["reply-bar"]}>
					<textarea id={styles["reply-textarea"]} placeholder={"Write your message here..."}></textarea>
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

	const body = await resp.json() as GetLessonApiRouteResponse;

	if("error" in body) {
		throw new Error(body.error);
	}

	return body.lesson;
}
