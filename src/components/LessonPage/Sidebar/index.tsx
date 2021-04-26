import Link from "next/link";
import { useSession } from "next-auth/client";
import { ArrowLeft as ArrowLeftSvg } from "react-feather";
import styles from "./Sidebar.module.scss";

import type { FunctionComponent, PropsWithChildren } from "react";
import type { Session } from "next-auth";


type Props = PropsWithChildren<{
}>


const Sidebar: FunctionComponent<Props> = () => {
	const [session, loading] = useSession();

	return (
		<div id={styles["sidebar"]}>

			<Link href="/home">
				<a id={styles["home-link"]}>
					<ArrowLeftSvg id={styles["home-icon"]} />
					<span id={styles["home-label"]}>Return Home</span>
				</a>
			</Link>

			<div className={styles["separator"]} />

			{ UserBadge(session, loading) }

		</div>
	);
};

export default Sidebar;


const UserBadge = (session: Session | null | undefined, loading: boolean) => {
	if(session) {
		return (
			<div id={styles["user-badge"]}>
				<img src={session.user!.image!} alt="User Profile Image" id={styles["profile-img"]} />
				<span id={styles["user-name"]} className={styles["label"]}>
					{ session.user!.name }
				</span>
			</div>
		);
	}

	if(!session && !loading) {
		return (
			<div id={styles["user-badge"]}>
				<span id={styles["not-logged-in"]} className={styles["label"]}>
					Not Logged In
				</span>
			</div>
		)
	}


	return (
		<div id={styles["user-badge"]}>
			<span id={styles["loading"]} className={styles["label"]}>
				Loading...
			</span>
		</div>
	);
};