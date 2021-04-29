import styles from "./Footer.module.scss";

import type { PropsWithChildren } from "react";


type Props = PropsWithChildren<{
}>


export default function Footer(props: Props): JSX.Element {
	return (
		<footer id={styles["footer"]}>
			&copy; 2020, Evan O'Connor
		</footer>
	);
}