import { Component } from "react";
import { withRouter, NextRouter } from "next/router";
import authManager from "utils/auth-manager";

import styles from "./login.module.scss";
import { Background, PageHead, LandingHeader, Box, RegisterForm, RegularLoginBox/*, OAuthloginBox */ } from "components/index";


interface Props {
	router: NextRouter
}

interface State {
	topLoginBoxOpen: boolean,
}


class LoginPage extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			topLoginBoxOpen: false, // TODO: Disable OAuth login for now
		};
		this.openOAuthLogin = this.openOAuthLogin.bind(this);
		this.openRegularLogin = this.openRegularLogin.bind(this);
	}


	public render(): JSX.Element {
		const { state } = this;
		return (
			<>
				<PageHead title="Login or Sign Up | Conversant" />
		
				<Background>
					<LandingHeader />
					
					<Box id={styles["form-box"]}>
						<div id={styles["register-container"]}>
							<RegisterForm />
						</div>
						
						<div className={styles["v-separator"]} />

						<div id={styles["login-container"]}>
							{/*
								TODO: Disable OAuth login for now
								<OAuthloginBox open={state.topLoginBoxOpen} onOpen={this.openOAuthLogin} />
							*/}
							<RegularLoginBox open={!state.topLoginBoxOpen} onOpen={this.openRegularLogin} />
						</div>
					</Box>
				</Background>
			</>
		);
	}


	public componentDidMount(): void {
		// Redirect to the logged-in home page if the user is already logged in
		if(authManager.isLoggedIn()) {
			this.props.router.push("/home");
		}
	}

	
	private openOAuthLogin(e: Event): void {
		e.preventDefault();
		this.setState({
			topLoginBoxOpen: true
		});
	}


	private openRegularLogin(e: Event): void {
		e.preventDefault();
		this.setState({
			topLoginBoxOpen: false
		});
	}
}

export default withRouter(LoginPage);