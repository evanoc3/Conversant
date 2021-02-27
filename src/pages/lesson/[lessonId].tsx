import { Component, PropsWithChildren } from "react";
import Head from "next/head";
import { withRouter, NextRouter } from "next/router";
import styles from "./[lessonId].module.scss";
import type { GetLessonApiRouteResponse } from "@customTypes/api";
import type { Lesson } from "@customTypes/lesson";
import { debug } from "console";


type Props = PropsWithChildren<{
	router: NextRouter,
}>

interface State {
	lesson: Lesson | undefined,
	currentStep: number
}


class LessonPage extends Component<Props, State> {

	constructor(props: Props) {
		super(props);

		this.state = {
			lesson: undefined,
			currentStep: 0
		};
	}


	public render(): JSX.Element {
		return (
			<>
				<Head>
					<title>Home | Conversant</title>
				</Head>

				<div id={styles["page"]}>
					{
						(this.state.lesson) ? this.renderLesson() : this.renderLoading()
					}
				</div>
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
			<div>
				<h1>{ lesson.title }</h1>
			</div>
		);
	}

	private renderLoading(): JSX.Element {
		return (
			<div>Loading</div>
		);
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
