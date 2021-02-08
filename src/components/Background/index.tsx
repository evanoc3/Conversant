import { FunctionComponent, PropsWithChildren } from "react";
import styles from "./Background.module.scss";


type Props = PropsWithChildren<{
}>


const Background: FunctionComponent<Props> = (props) => {
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