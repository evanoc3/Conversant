import { Component, PropsWithChildren } from "react";
import Head from "next/head";
import { withRouter, NextRouter } from "next/router";
import styles from "./lesson.module.scss";


type Props = PropsWithChildren<{
	router: NextRouter
}>

interface State {
}


class LessonPage extends Component<Props, State> {

	public render(): JSX.Element {
		return (
			<>
				<Head>
					<title>Home | Conversant</title>
				</Head>

				<div id={styles["page"]}>

				</div>
			</>
		);
	}

	public componentDidMount(): void {
	}
}

export default withRouter(LessonPage);