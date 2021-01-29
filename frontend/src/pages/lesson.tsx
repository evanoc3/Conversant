//@ts-nocheck
import { Component, PropsWithChildren } from "react";
import { withRouter, NextRouter } from "next/router";
import styles from "./lesson.module.scss";
import { AuthRequired, PageHead } from "components/index";
import authManager from "utils/auth-manager";


type Props = PropsWithChildren<{
	router: NextRouter
}>

interface State {
}


class LessonPage extends Component<Props, State> {

	public render(): JSX.Element {
		return (
			<AuthRequired>
				<PageHead title={""} />

				<div id={styles["page"]}>

				</div>
			</AuthRequired>
		);
	}

	public componentDidMount(): void {

		if(!authManager.isLoggedIn()) {
			this.props.router.push("/login");
		}
	}
}

export default withRouter(LessonPage);