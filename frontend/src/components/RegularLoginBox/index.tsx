import { FunctionComponent, useState } from "react";
import Link from "next/link";
import validator from "validator";
import styles from "./RegularLoginBox.module.scss";
import type { Login } from "types/auth-service";


interface Props {
	open: boolean,
	onOpen?: (e: any) => any
}


const RegularLoginBox: FunctionComponent<Props> = (props: Props) => {
	const [inputEmail, setInputEmail] = useState("");
	const [inputPassword, setInputPassword] = useState("");
	const [rememberLogin, setRememberLogin] = useState(true);
	const [errorMessage, setErrorMessage] = useState("");

	async function postLoginForm(e: any): Promise<void> {
		// Prevent the default form submission
		e.preventDefault();

		// Validate the email that was entered (must be an email address)
		if(! validator.isEmail(inputEmail)) {
			setErrorMessage("Please enter a valid email address");
			return;
		}

		// Validate the password that was entered (must be between 8 and 64 characters long)
		if(! validator.isLength(inputPassword, {min: 8, max: 64})) {
			setErrorMessage("Please enter a valid password (between 8 and 64 characters)");
			return;
		}

		// Clear any previously set error messages if we've passed input validation
		setErrorMessage("");

		// Make the POST request to the auth service to receive a JWT
		const resp = await fetch(`${process.env.NEXT_PUBLIC_AUTH_SERVICE_HOST}/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
			},
			body: JSON.stringify({
				"email": inputEmail,
				"password": inputPassword
			})
		}).then(resp => {
			return resp;
		}).catch(err => {
			console.error(`Error: ${err}`);
		});

		// Validate that there was a response from the auth service
		if(!resp) {
			console.error("Error: Did not get a response from the auth service");
			return;
		}

		// Validate that the response had an OK status code
		if(!resp.ok) {
			console.error(`Error: Did not receive an OK status response from the auth service. Response had status code: ${resp.status}`);
			return;
		}

		// Parse the response from the auth service
		const body: Login.Response = await resp.json();

		console.debug("Received response from auth service", body);

		if(!("login" in body)) {
			console.error("Error: Could not parse the response from the auth service", body);
		}

		if(! body.login.success) {
			setErrorMessage("Could not log in");
			return;
		}

		// At this point, we can assume that the login request was successful and we were provided with an auth_token
		const token = (body.login as Login.SuccessPayload).auth_token;

		// Store the auth_token in either permanent or session client-side storage based on whether the "remember me" checkbox was ticked
		if("localStorage" in window && rememberLogin) {
			console.debug("Storing auth_token in localStorage");
			localStorage.setItem("auth_token", token);
		}
		else if("sessionStorage" in window && !rememberLogin) {
			console.debug("Storing auth_token in sessionStorage");
			sessionStorage.setItem("auth_token", token);
		}
	}

	return (
		<details open={props.open}>
			<summary id={styles["box-summary"]} onClick={props.onOpen}>
				<h2>Login with Password</h2>
			</summary>

			<form onSubmit={postLoginForm}>
				<input type="email" className={`${styles["input"]}`} placeholder="Email address" value={inputEmail} onChange={e => setInputEmail(e.target.value)} maxLength={255} required />

				<input type="password" className={`${styles["input"]}`} placeholder="Password" value={inputPassword} onChange={e => setInputPassword(e.target.value)} minLength={8} maxLength={255} required />

				<label className={styles["checkbox-lbl"]}>
					<input type="checkbox" className={styles["checkbox"]} checked={rememberLogin} onChange={e => setRememberLogin(e.target.checked)} />
					Remember Me
				</label>

				<Link href="/forgot-password">
					<a className={styles["forgot-link"]}>
						Forgot your password
					</a>
				</Link>

				<br />
				{
					(errorMessage) ? (
						<div className={styles["error-msg"]}>{errorMessage}</div>
					) : ""
				}
				<button className={styles["button"]}>Log In</button>
			</form>
		</details>
	);
};

export default RegularLoginBox;