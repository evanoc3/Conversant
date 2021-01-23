import { Component } from "react";
import { withRouter, NextRouter } from "next/router";
import authManager from "utils/auth-manager";

import styles from "./login.module.scss";
import { Background, PageHead, Header, Box, RegularLoginBox, OAuthloginBox } from "components/index";


type InputName = "loginEmail" | "loginPwd" | "loginRemember" | "signupFirstName" | "signupLastName" | "signupEmail" | "signupPwd" | "signupConfirmPwd" | "signupDOB";

interface Props {
	router: NextRouter
}

interface State {
	topLoginBoxOpen: boolean,
	signupFirstName: string,
	signupLastName: string,
	signupEmail: string,
	signupPwd: string,
	signupConfirmPwd: string,
	signupDOB: string,
	signupErrorMsg: string | undefined,
}


class LoginPage extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			topLoginBoxOpen: true,
			signupFirstName: "",
			signupLastName: "",
			signupEmail: "",
			signupPwd: "",
			signupConfirmPwd: "",
			signupDOB: "",
			signupErrorMsg: undefined
		};
		this.inputChangeHandler = this.inputChangeHandler.bind(this);
		this.postSignupForm = this.postSignupForm.bind(this);
		this.openOAuthLogin = this.openOAuthLogin.bind(this);
		this.openRegularLogin = this.openRegularLogin.bind(this);
	}


	public render(): JSX.Element {
		const { state } = this;
		return (
			<>
				<PageHead title="Login or Sign Up | Conversant" />
		
				<Background>

					<Header />
					
					<Box id={styles["form-box"]}>
						<form id={styles["signup-form"]} onSubmit={this.postSignupForm}>
							<h2>Sign Up</h2>

							<div className={styles["form-row"]}>
								<input type="text" className={`${styles["input"]}`} placeholder="First Name" value={state.signupFirstName} onChange={e => this.inputChangeHandler(e, "signupFirstName")} maxLength={255} required />

								<input type="text" className={`${styles["input"]}`} placeholder="Last Name" value={state.signupLastName} onChange={e => this.inputChangeHandler(e, "signupLastName")} maxLength={255} required />
							</div>

							<input type="email" className={`${styles["input"]}`} placeholder="Email address" value={state.signupEmail} onChange={e => this.inputChangeHandler(e, "signupEmail")} maxLength={255} required />

							<div className={styles["form-row"]}>
								<input type="password" className={`${styles["input"]}`} placeholder="Password" value={state.signupPwd} onChange={e => this.inputChangeHandler(e, "signupPwd")} minLength={8} maxLength={255} required />

								<input type="password" className={`${styles["input"]}`} placeholder="Confirm Password" value={state.signupConfirmPwd} onChange={e => this.inputChangeHandler(e, "signupConfirmPwd")} minLength={8} maxLength={255} required />
							</div>

							<input type="date" className={`${styles["input"]} ${styles["date"]} ${!state.signupDOB ? styles["empty"] : ""}`} placeholder="Date of Birth" value={state.signupDOB} onChange={e => this.inputChangeHandler(e, "signupDOB")} required />

							{
								(state.signupErrorMsg) ? (
									<div className={styles["error-msg"]}>{state.signupErrorMsg}</div>
								) : ""
							}

							<br />

							<button className={styles["button"]}>Register</button>
						</form>
		
						<div className={styles["v-separator"]} />

						<div id={styles["login"]}>
							<OAuthloginBox open={state.topLoginBoxOpen} onOpen={this.openOAuthLogin} />
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


	private inputChangeHandler(e: any, input: InputName): void {
		const newState: {[key in InputName]?: string | boolean} = {};
		if(input === "loginRemember") {
			newState[input] = e.target.checked;
		} else {
			newState[input] = e.target.value;
		}
		// @ts-expect-error
		this.setState(newState);
	}


	private postSignupForm(e: any): void {
		e.preventDefault();
		alert();
		return;
	}


	private openOAuthLogin(e: any): void {
		e.preventDefault();
		this.setState({
			topLoginBoxOpen: true
		});
	}


	private openRegularLogin(e: any): void {
		e.preventDefault();
		this.setState({
			topLoginBoxOpen: false
		});
	}
}

export default withRouter(LoginPage);