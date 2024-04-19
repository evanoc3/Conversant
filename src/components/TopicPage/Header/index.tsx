import Link from "next/link";
import { useSession } from "next-auth/react";
import { ArrowLeft as ArrowLeftSvg } from "react-feather";
import styles from "./Header.module.scss";
import type { PropsWithChildren } from "react";


type Props = PropsWithChildren<{
	className?: string,
	title: string
}>


export default function TopicPageHeader(props: Props): JSX.Element {
	const { data: session, status } = useSession();

	const backUrl = (status !== "loading" && session !== null) ? "/home" : "/";

	return (
		<header id={styles["header"]} className={props.className}>
			<div id={styles["back-link-container"]}>
				<Link href={backUrl} id={styles["back-link"]}>
					<ArrowLeftSvg id={styles["back-icon"]} />
				</Link>
			</div>

			<h1 id={styles["title"]}>{props.title}</h1>
		</header>
	);
}
