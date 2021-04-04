import Link from "next/link";
import { ArrowLeft as ArrowLeftSvg } from "react-feather";
import styles from "./Header.module.scss";

import type { FunctionComponent, PropsWithChildren } from "react";


type Props = PropsWithChildren<{
	className?: string,
	title: string
}>


const TopicPageHeader: FunctionComponent<Props> = (props) => {

	return (
		<header id={styles["header"]} className={props.className}>
			<div id={styles["back-link-container"]}>
				<Link href="/home">
					<a href="/home" id={styles["back-link"]}>
						<ArrowLeftSvg id={styles["back-icon"]} />
					</a>
				</Link>
			</div>


			<h1 id={styles["title"]}>{props.title}</h1>
		</header>
	);
}

export default TopicPageHeader;