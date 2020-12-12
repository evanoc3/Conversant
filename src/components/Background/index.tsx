import { FunctionComponent } from "react";
import styles from "./Background.module.scss";


const Background: FunctionComponent = (props) => {
	return (
		<>
		<div id={styles["background"]} />

		<div id={styles["foreground"]}>
			{ props.children }
		</div>
		</>
	);
}

export default Background;