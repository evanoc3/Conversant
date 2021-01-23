import { FunctionComponent } from "react";
import GoogleLogin from "react-google-login";
import styles from "./OAuthLoginBox.module.scss";


interface Props {
	open: boolean,
	onOpen?: (e: any) => any
}


const OAuthLoginBox: FunctionComponent<Props> = (props: Props) => {
	function googleOAuthSuccess(): void {
		alert("Google OAuth login successful!");
	}

	function googleOAuthFailed(): void {
		// alert("");
	}

	return (
		<details open={props.open}>
			<summary id={styles["box-summary"]} onClick={props.onOpen}>
				<h2>SSO</h2>
			</summary>

			<div style={{textAlign: "center"}}> 
				<GoogleLogin clientId={process.env.NEXT_PUBLIC_OAUTH_GOOGLE_CLIENT_ID!} onSuccess={googleOAuthSuccess} onFailure={googleOAuthFailed} redirectUri={"https://auth.getconversant.io/oauth"} cookiePolicy="single_host_origin" />
			</div>
		</details>
	);
};

export default OAuthLoginBox;