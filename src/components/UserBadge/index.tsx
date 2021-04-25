import Link from "next/link";
import { useSession, signOut, signIn } from "next-auth/client";
import { ChevronUp as ChevronUpSvg, ChevronDown as ChevronDownSvg } from "react-feather";
import styles from "./UserBadge.module.scss";

import type { PropsWithChildren, MouseEvent } from "react";


type Props = PropsWithChildren<{
}>


/**
 * React component which displays the user's profile picture, and first name if the user is signed in.
 * If they are not logged in, it displays a link to the sign in page.
 */
export default function UserBadge(props: Props): JSX.Element {
	const [session, sessionIsLoading] = useSession();

	// Render "Loading"
	if(sessionIsLoading) {
		return (
			<div id={styles["pill"]} className={styles["loading"]}>
				Loading...
			</div>
		);
	}

	// Render "Sign In"
	if(session === null) {
		return (
			<div id={styles["pill"]} className={styles["not-signed-in"]}>
				<a id={styles["sign-in-link"]} href="#signin" onClick={signInHandler}>Sign In</a>
			</div>
		);
	}

	// Render "User Badge"
	return (
		<div id={styles["pill"]} className={styles["signed-in"]}>
			<img src={session.user!.image ?? "/default-user.png"} id={styles["profile-img"]} />

			<span>{ session.user!.name!.split(" ")[0] }</span>
			
			<ChevronDownSvg className={styles["dropdown-icon"]} id={styles["open-dropdown"]} />
			<ChevronUpSvg className={styles["dropdown-icon"]} id={styles["close-dropdown"]} />

			<ul id={styles["dropdown"]}>
				<li className={styles["dropdown-item"]}><Link href={"/home"}>Home</Link></li>
				<li className={styles["dropdown-item"]}><a href="#signout" onClick={signOutHandler}>Sign out</a></li>
			</ul>
		</div>
	);
}


/**
 * Handler for "onclick" event of the sign-in link, if the user is not signed in already.
 */
function signInHandler(e: MouseEvent<HTMLAnchorElement>) {
	e.preventDefault();
	signIn();
}


/**
 * Handler for the "onclick" event of the sign-out dropdown item present when the user is signed in.
 */
function signOutHandler(e: MouseEvent<HTMLAnchorElement>) {
	e.preventDefault();
	signOut();
}