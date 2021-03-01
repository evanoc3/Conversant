import { FunctionComponent, PropsWithChildren } from "react";
import styles from "./Sidebar.module.scss";


type Props = PropsWithChildren<{
}>


const Sidebar: FunctionComponent<Props> = () => {
	return (
		<div id={styles["sidebar"]}>

		</div>
	);
};

export default Sidebar;