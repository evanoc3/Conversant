import { Component, PropsWithChildren } from "react";
import { withRouter, NextRouter } from "next/router";
import styles from "./lesson.module.scss";
import { Head } from "@components/index";


type Props = PropsWithChildren<{
	router: NextRouter
}>

interface State {
}


class LessonPage extends Component<Props, State> {

	public render(): JSX.Element {
		return (
			<>
				<Head />

				<div id={styles["page"]}>

				</div>
			</>
		);
	}

	public componentDidMount(): void {
	}
}

export default withRouter(LessonPage);