import { FunctionComponent, PropsWithChildren, useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router";
import validator from "validator";
import styles from "./RegisterForm.module.scss";
import { Register } from "types/auth-service";
import authManager from "utils/auth-manager";


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


const RegisterForm: FunctionComponent<Props> = (props: Props) => {
	// Next.js Router
	const router = useRouter();

	// State variables
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [dateOfBirth, setDateOfBirth] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	// Methods
	async function submitForm(e: FormEvent): Promise<void> {
		e.preventDefault();

		// Validate the input
		if(! validator.isLength(firstName, {min: 1, max: 255})) {
			setErrorMessage("Please enter a valid first name (between 0 and 255 characters)");
			return;
		}
		if(! validator.isLength(lastName, {min: 1, max: 255})) {
			setErrorMessage("Please enter a valid last name (between 0 and 255 characters)");
			return;
		}
		if(! validator.isEmail(email)) {
			setErrorMessage("Please enter a valid email address");
			return;
		}
		if(! validator.isLength(password, {min: 8, max: 255})) {
			setErrorMessage("Please enter a valid password (between 8 and 255 characters)");
			return;
		}
		if(! validator.isLength(confirmPassword, {min: 8, max: 255})) {
			setErrorMessage("Please enter a valid password for 'confirm password' (between 8 and 255 characters)");
			return;
		}
		if(password !== confirmPassword) {
			setErrorMessage("'Password' and 'Confirm Password' do not match!");
			return;
		}

		try {
			// Send a POST request to the /register endpoint of the Auth service
			const resp = await fetch(`${process.env.AUTH_SERVICE}/register`, {
				method: "POST",
				body: JSON.stringify({
					first_name: firstName,
					last_name: lastName,
					email: email,
					password: password,
					date_of_birth: dateOfBirth
				})
			}).then(resp => {
				return resp;
			}).catch(err => {
				throw err;
			});
	
			// Check if the response has an 'OK' status code
			if(!resp.ok) {
				console.error("Error: Received a not-OK response code from the Auth service", resp);
				alert("Something went wrong. Please try again later");
				return;
			}
	
			// Parse the response as JSON, and validate the returned message
			const body = await resp.json() as Register.Response;
			
			if(! ("register" in body) || !(body.register.success)) {
				console.error("Error: received an invalid response from the auth service endpoint", body);
				alert("Something went wrong. Please try again later");
				return;
			}

			// Store the returned JWT
			authManager.setLogin(body.register.auth_token, false);

			router.push("/home");
		}
		catch(err) {
			console.error("Error: ", err);
			alert("Something went wrong. Please try again later");
		}
	}

	// Event Handlers
	const onFirstNameChange = (e: ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value);
	const onLastNameChange = (e: ChangeEvent<HTMLInputElement>) => setLastName(e.target.value);
	const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
	const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
	const onConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value);
	const onDateOfBirthChange = (e: ChangeEvent<HTMLInputElement>) => setDateOfBirth(e.target.value);

	return (
		<form id={styles["signup-form"]} onSubmit={submitForm}>
			<h2>Sign Up</h2>

			<div className={styles["row"]}>
				<input type="text" className={styles["input"]} placeholder="First Name" value={firstName} onChange={onFirstNameChange} maxLength={255} required />

				<input type="text" className={styles["input"]} placeholder="Last Name" value={lastName} onChange={onLastNameChange} maxLength={255} required />
			</div>

			<input type="email" className={`${styles["input"]}`} placeholder="Email address" value={email} onChange={onEmailChange} maxLength={255} required />

			<div className={styles["row"]}>
				<input type="password" className={`${styles["input"]}`} placeholder="Password" value={password} onChange={onPasswordChange} minLength={8} maxLength={255} required />

				<input type="password" className={`${styles["input"]}`} placeholder="Confirm Password" value={confirmPassword} onChange={onConfirmPasswordChange} minLength={8} maxLength={255} required />
			</div>

			<input type="date" className={`${styles["input"]} ${styles["date-input"]} `} placeholder="Date of Birth" value={dateOfBirth} onChange={onDateOfBirthChange} required />

			{ (errorMessage !== null) ? <div className={styles["error-msg"]}>{errorMessage}</div> : "" }

			<br />

			<button id={styles["submit"]} className={styles["green-pill"]}>Sign Up</button>
		</form>
	);
}

export default RegisterForm;