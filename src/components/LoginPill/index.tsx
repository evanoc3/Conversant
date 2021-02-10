import { FunctionComponent, PropsWithChildren, MouseEvent } from "react";
import Link from "next/link";
import { useSession, signIn } from "next-auth/client";
import styles from "./LoginPill.module.scss";


type Props = PropsWithChildren<{
}>


const LoginPill: FunctionComponent<Props> = (props) => {
	const [session, loading] = useSession();

	if(loading) {
		return (
			<a id={styles["pill"]}>
				<div id={styles["icon"]}></div>
				Loading...
			</a>
		);
	}

	if(session) {
		const firstName = session.user.name?.split(" ")[0];
		return (
			<Link href="/home">
				<a id={styles["pill"]}>
					<img id={styles["icon"]} className={styles["profile-pic"]} src={session.user.image!} />
					<span>{ firstName }</span>
				</a>
			</Link>
		);
	}

	function onClickSignIn(e: MouseEvent<HTMLAnchorElement>): void {
		e.preventDefault();
		signIn(undefined, {
			callbackUrl: "/home"
		});
	}


	return (
		<a id={styles["pill"]} onClick={onClickSignIn}>
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" id={styles.icon}>
				<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
				<circle cx="12" cy="7" r="4" />
			</svg>
			Login / Signup
		</a>
	);
};

export default LoginPill;