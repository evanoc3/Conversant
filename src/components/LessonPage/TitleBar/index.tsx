import { FunctionComponent, PropsWithChildren } from "react";
import { Menu as MenuSvg } from "react-feather";
import styles from "./TitleBar.module.scss";


type Props = PropsWithChildren<{
	toggleSidebarOpen: () => any,
	sidebarOpen: boolean,
	lessonTitle: string,
	lessonTopic?: string
}>


const TitleBar: FunctionComponent<Props> = (props) => {
	return (
		<header id={styles["title-bar"]}>
			<button id={styles["sidebar-button"]} onClick={props.toggleSidebarOpen} className={(props.sidebarOpen) ? styles["sidebar-open"] : ""}>
				<MenuSvg id={styles["sidebar-button-icon"]} />
			</button>

			<h1 id={styles["title"]}>{ props.lessonTitle }</h1>
			
			{
				(props.lessonTopic) ? (
					<h2 id={styles["sub-title"]}>{ props.lessonTopic.charAt(0).toUpperCase() + props.lessonTopic.substring(1) }</h2>
				) : ""
			}
		</header>
	);
};

export default TitleBar;