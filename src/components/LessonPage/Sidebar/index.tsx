import { FunctionComponent, PropsWithChildren } from "react";
import Link from "next/link";
import { useSession, Session } from "next-auth/client";
import styles from "./Sidebar.module.scss";


type Props = PropsWithChildren<{
}>


const Sidebar: FunctionComponent<Props> = () => {
	const [session, loading] = useSession();

	return (
		<div id={styles["sidebar"]}>
			{ UserBadge(session, loading) }

				<Link href="/home">
					<a id={styles["home-link"]}>Return Home</a>
				</Link>
		</div>
	);
};

export default Sidebar;


const UserBadge = (session: Session | null | undefined, loading: boolean) => {
	if(session) {
		return (
			<div id={styles["user-badge"]}>
				<img src={session.user.image!} alt="User Profile Image" id={styles["profile-img"]} />
				<span id={styles["user-name"]} className={styles["label"]}>
					{ session.user.name }
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