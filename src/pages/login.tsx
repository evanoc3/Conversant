import { Component } from "react";
import styles from "./login.module.scss";
import { Background, PageHead, Box } from "components/index";


type InputName = "loginEmail" | "loginPwd" | "signupFirstName" | "signupLastName" | "signupEmail" | "signupPwd" | "signupConfirmPwd" | "signupDOB"

interface State {
	loginEmail: string,
	loginPwd: string,
	signupFirstName: string,
	signupLastName: string,
	signupEmail: string,
	signupPwd: string,
	signupConfirmPwd: string,
	signupDOB: string
}


class LoginPage extends Component<{}, State> {

	constructor(props: {}) {
		super(props);
		this.state = {
			loginEmail: "",
			loginPwd: "",
			signupFirstName: "",
			signupLastName: "",
			signupEmail: "",
			signupPwd: "",
			signupConfirmPwd: "",
			signupDOB: ""
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
					<Box id={styles["form-box"]}>
						<form id={styles["signup-form"]} onSubmit={this.postSignupForm}>
							<h2>Sign Up</h2>
							<input type="text" placeholder="First Name" value={state.signupFirstName} onChange={e => this.inputChangeHandler(e, "signupFirstName")} />
							<input type="text" placeholder="Last Name" value={state.signupLastName} onChange={e => this.inputChangeHandler(e, "signupLastName")} />
							<input type="email" placeholder="Email address" value={state.signupEmail} onChange={e => this.inputChangeHandler(e, "signupEmail")} />
							<input type="password" placeholder="Password" value={state.signupPwd} onChange={e => this.inputChangeHandler(e, "signupPwd")} />
							<input type="password" placeholder="Confirm Password" value={state.signupConfirmPwd} onChange={e => this.inputChangeHandler(e, "signupConfirmPwd")} />
							<input type="date" placeholder="Date of Birth" value={state.signupDOB} onChange={e => this.inputChangeHandler(e, "signupDOB")} />
							<button>Sign Up</button>
						</form>
		
						<div className={styles["v-separator"]} />
		
						<form id={styles["login-form"]} onSubmit={this.postLoginForm}>
							<h2>Log In</h2>
							<input type="email" placeholder="Email address" value={state.loginEmail} onChange={e => this.inputChangeHandler(e, "loginEmail")} />
							<input type="password" placeholder="Password" value={state.loginPwd} onChange={e => this.inputChangeHandler(e, "loginPwd")} />
							<button>Log In</button>
						</form>
					</Box>
				</Background>
			</>
		);
	}


	private inputChangeHandler(e: any, input: InputName): void {
		console.debug(e);
		let newState: {[key in InputName]?: string} = {};
		newState[input] = e.target.value;
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
		alert();
		return;
	}
}


export default LoginPage;