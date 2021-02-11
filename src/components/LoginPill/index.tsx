import { FunctionComponent, PropsWithChildren, MouseEventHandler } from "react";
import Link from "next/link";
import { useSession, signIn } from "next-auth/client";
import styles from "./LoginPill.module.scss";
// import { user as UserIcon } from "@images/icons/index";
import { User as UserIcon } from "react-feather";


type Props = PropsWithChildren<{
}>


const LoginPill: FunctionComponent<Props> = (props) => {
	const [session, loading] = useSession();

	// Display "Loading...""
	if(loading) {
		return (
			<a id={styles["pill"]} className={styles["loading"]}>
				<span id={styles["label"]}>Loading...</span>
			</a>
		);
	}

	// Display user badge
	if(session) {
		const firstName = session.user.name?.split(" ")[0];
		return (
			<Link href="/home">
				<a id={styles["pill"]}  className={styles["signed-in"]}>
					<img id={styles["icon"]} className={styles["profile-pic"]} src={session.user.image!} />

					<span id={styles["label"]}>
						{ firstName }
					</span>
				</a>
			</Link>
		);
	}

	// Display "Sign In" button
	const clickHandler: MouseEventHandler<HTMLAnchorElement> = (e) => {
		e.preventDefault();
		signIn(undefined, {
			callbackUrl: "/home"
		});
	};

	return (
		<a id={styles["pill"]} onClick={clickHandler} className={styles["not-signed-in"]}>
			<UserIcon id={styles["icon"]} />
			<span id={styles["label"]}>Sign In</span>
		</a>
	);
};

export default LoginPill;