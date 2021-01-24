import { FunctionComponent } from "react";
import Link from "next/link";
import styles from "./Header.module.scss";
import { LoginPill } from "components/index";


interface Props {
	showNav?: boolean
}


const Header: FunctionComponent<Props> = (props: Props) => (
	<header id={styles["header"]}>
		<h1 id={styles["title"]}>
			<Link href="/">
				<a id={styles["home-link"]}>
					Conversant
				</a>
			</Link>
		</h1>

		<div className={styles["spacer"]} />

		{ (props.showNav) ? <LoginPill /> : "" }		

	</header>
);


export default Header;