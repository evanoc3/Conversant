import { ChangeEvent, Component, FormEvent, PropsWithChildren } from "react";
import styles from "./RegisterForm.module.scss";


type Props = PropsWithChildren<{
}>;

interface State {
	firstName: string,
	lastName: string,
	email: string,
	password: string,
	confirmPassword: string,
	dateOfBirth: string,
	errorMessage: string | null
}


export default class RegisterForm extends Component<Props, State> {

	constructor(props: Props) {
		super(props);
		this.state = {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirmPassword: "",
			dateOfBirth: "",
			errorMessage: null
		};
		this.submitForm = this.submitForm.bind(this);
		this.onFirstNameChange = this.onFirstNameChange.bind(this);
		this.onLastNameChange = this.onLastNameChange.bind(this);
		this.onEmailChange = this.onEmailChange.bind(this);
		this.onPasswordChange = this.onPasswordChange.bind(this);
		this.onConfirmPasswordChange = this.onConfirmPasswordChange.bind(this);
		this.onDateOfBirthChange = this.onDateOfBirthChange.bind(this);
	}

	public render(): JSX.Element {
		const {
			props,
			state: { firstName, lastName, email, password, confirmPassword, dateOfBirth, errorMessage }
		} = this;

		return (
			<form id={styles["signup-form"]} onSubmit={this.submitForm}>
				<h2>Sign Up</h2>

				<div className={styles["row"]}>
					<input type="text" className={styles["input"]} placeholder="First Name" value={firstName} onChange={this.onFirstNameChange} maxLength={255} required />

					<input type="text" className={styles["input"]} placeholder="Last Name" value={lastName} onChange={this.onLastNameChange} maxLength={255} required />
				</div>

				<input type="email" className={`${styles["input"]}`} placeholder="Email address" value={email} onChange={this.onEmailChange} maxLength={255} required />

				<div className={styles["row"]}>
					<input type="password" className={`${styles["input"]}`} placeholder="Password" value={password} onChange={this.onPasswordChange} minLength={8} maxLength={255} required />

					<input type="password" className={`${styles["input"]}`} placeholder="Confirm Password" value={confirmPassword} onChange={this.onConfirmPasswordChange} minLength={8} maxLength={255} required />
				</div>

				<input type="date" className={`${styles["input"]} ${styles["date-input"]} `} placeholder="Date of Birth" value={dateOfBirth} onChange={this.onDateOfBirthChange} required />
				{/* ${!dateOfBirth ? styles["empty"] : ""} */}

				{ (errorMessage !== null) ? <div className={styles["error-msg"]}>{errorMessage}</div> : "" }

				<br />

				<button id={styles["submit"]} className={styles["green-pill"]}>Sign Up</button>
			</form>
		);
	}


	private async submitForm(e: FormEvent): Promise<void> {
		e.preventDefault();
		// TODO: Register form can't be finished until an endpoint is made for it
		alert("Register form submitted");
	}


	// Event Handlers

	private onFirstNameChange(e: ChangeEvent<HTMLInputElement>): void {
		this.setState({
			firstName: e.target.value
		});
	}

	private onLastNameChange(e: ChangeEvent<HTMLInputElement>): void {
		this.setState({
			lastName: e.target.value
		});
	}

	private onEmailChange(e: ChangeEvent<HTMLInputElement>): void {
		this.setState({
			email: e.target.value
		});
	}

	private onPasswordChange(e: ChangeEvent<HTMLInputElement>): void {
		this.setState({
			password: e.target.value
		});
	}

	private onConfirmPasswordChange(e: ChangeEvent<HTMLInputElement>): void {
		this.setState({
			confirmPassword: e.target.value
		});
	}

	private onDateOfBirthChange(e: ChangeEvent<HTMLInputElement>): void {
		this.setState({
			dateOfBirth: e.target.value
		});
	}
}