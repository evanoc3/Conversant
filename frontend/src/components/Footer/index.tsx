import { FunctionComponent, PropsWithChildren } from "react";
import styles from "./Footer.module.scss";


type Props = PropsWithChildren<{
}>


const Footer: FunctionComponent<Props> = (props: Props) => {
	return (
		<footer id={styles["footer"]}>
			&copy; 2020, Evan O'Connor
		</footer>
	);
};

export default Footer;