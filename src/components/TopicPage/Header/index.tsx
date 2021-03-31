import type { FunctionComponent, PropsWithChildren } from "react";
import styles from "./Header.module.scss";


type Props = PropsWithChildren<{
	title: string
}>


const TopicPageHeader: FunctionComponent<Props> = (props) => {
	return (
		<header id={styles["header"]}>
			<h1 id={styles["title"]}>{props.title}</h1>
		</header>
	);
}

export default TopicPageHeader;