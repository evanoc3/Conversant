import React, { Component } from "react";
import { withRouter, NextRouter } from "next/router";
import styles from "./home.module.scss";
import { Background, PageHead, Header } from "components/index";
import authManager from "utils/auth-manager";


interface Props {
	router: NextRouter
}

interface State {
}


class HomePage extends Component<Props, State> {
	public render(): JSX.Element {
		return (
			<>
				<PageHead title="Home | Conversant" />
		
				<Background>
					<Header />
		
				</Background>
			</>
		);

	}

	public componentDidMount(): void {
		// Redirect back to the login page if the user tries to access this page without being logged in
		if(! authManager.isLoggedIn()) {
			this.props.router.push("/login");
		}
	}
}

export default withRouter(HomePage);