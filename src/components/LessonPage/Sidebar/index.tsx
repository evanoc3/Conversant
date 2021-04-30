import Link from "next/link";
import { useSession } from "next-auth/client";
import { ArrowLeft as ArrowLeftSvg } from "react-feather";
import styles from "./Sidebar.module.scss";

import type {PropsWithChildren } from "react";
import type { Session } from "next-auth";


type Props = PropsWithChildren<{
}>


export default function Sidebar(props: Props): JSX.Element {
	const [session, sessionIsLoading] = useSession();

	const backUrl = (!sessionIsLoading && session !== null) ? "/home" : "/";

	return (
		<div id={styles["sidebar"]}>

			<Link href={backUrl}>
				<a id={styles["home-link"]} href={backUrl}>
					<ArrowLeftSvg id={styles["home-icon"]} />
				</a>
			</Link>

			<div className={styles["separator"]} />

			<ul id={styles["nav-content"]}>
				{ renderUserBadge(session, sessionIsLoading) }
			</ul>

		</div>
	);
};


/**
 * Helper function which renders the user's name and profile image if there is a valid session, or a "loading", or "not signed in" label if no session exists.
 */
function renderUserBadge(session: Session | null, sessionIsLoading: boolean): JSX.Element {
	if(sessionIsLoading) {
		return (
			<li className={styles["nav-item"]}>
				<span id={styles["loading"]} className={styles["label"]}>
					Loading...
				</span>
			</li>
		);
	}

	if(session === null) {
		return (
			<li className={styles["nav-item"]}>
				<span id={styles["not-logged-in"]} className={styles["label"]}>
					Not Logged In
				</span>
			</li>
		);
	}

	return (
		<li className={styles["nav-item"] + " " + styles["with-link"]}>
			<Link href={"/home"}>
				<a href={"/home"} id={styles["user-profile-link"]}>
					<img src={session.user!.image!} alt="User Profile Image" id={styles["profile-img"]} />
					<span id={styles["user-name"]} className={styles["label"]}>
						{ session.user!.name }
					</span>
				</a>
			</Link>
		</li>
	);
};