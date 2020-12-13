import { Component } from "react";
import Link from "next/link";
import validator from "validator";
import styles from "./login.module.scss";
import { Background, PageHead, Header, Box } from "components/index";


type InputName = "loginEmail" | "loginPwd" | "loginRemember" | "signupFirstName" | "signupLastName" | "signupEmail" | "signupPwd" | "signupConfirmPwd" | "signupDOB"

interface State {
	loginEmail: string,
	loginPwd: string,
	loginErrorMsg: string | undefined,
	loginRemember: boolean,
	signupFirstName: string,
	signupLastName: string,
	signupEmail: string,
	signupPwd: string,
	signupConfirmPwd: string,
	signupDOB: string,
	signupErrorMsg: string | undefined,
}


class LoginPage extends Component<{}, State> {

	constructor(props: {}) {
		super(props);
		this.state = {
			loginEmail: "",
			loginPwd: "",
			loginErrorMsg: undefined,
			loginRemember: true,
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
		this.postLoginForm = this.postLoginForm.bind(this);
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
		
						<form id={styles["login-form"]} onSubmit={this.postLoginForm}>
							<h2>Log In</h2>

							<input type="email" className={`${styles["input"]}`} placeholder="Email address" value={state.loginEmail} onChange={e => this.inputChangeHandler(e, "loginEmail")} maxLength={255} required />

							<input type="password" className={`${styles["input"]}`} placeholder="Password" value={state.loginPwd} onChange={e => this.inputChangeHandler(e, "loginPwd")} minLength={8} maxLength={255} required />

							<label className={styles["checkbox-lbl"]}>
								<input type="checkbox" className={styles["checkbox"]} checked={state.loginRemember} onChange={e => this.inputChangeHandler(e, "loginRemember")} />

								Remember Me
							</label>

							<Link href="/forgot-password">
								<a className={styles["forgot-link"]}>
									Forgot your password
								</a>
							</Link>

							<br />
							{
								(state.loginErrorMsg) ? (
									<div className={styles["error-msg"]}>{state.loginErrorMsg}</div>
								) : ""
							}
							<button className={styles["button"]}>Log In</button>
						</form>
					</Box>
				</Background>
			</>
		);
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

	private postLoginForm(e: any): void {
		e.preventDefault();
		if(! validator.isEmail(this.state.loginEmail)) {
			this.setState({loginErrorMsg: "Please enter a valid email address"});
			return;
		}
		if(! validator.isLength(this.state.loginPwd, {min: 8, max: 64})) {
			this.setState({loginErrorMsg: "Please enter a valid password (between 8 and 64 characters)"});
			return;
		}

		this.setState({loginErrorMsg: undefined});
		alert();
	}
}

export default LoginPage;