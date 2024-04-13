import Link from "next/link";
import styles from "./Header.module.scss";
import { UserBadge } from "@components/index";

import type { FunctionComponent, PropsWithChildren } from "react";


type Props = PropsWithChildren<{
}>


const Header: FunctionComponent<Props> = (props: Props) => (
	<header id={styles["header"]}>
		<h1 id={styles["title"]}>
			<Link href="/" id={styles["home-link"]}>Conversant</Link>
		</h1>

		<div className={styles["spacer"]} />

		<UserBadge />	

	</header>
);


export default Header;
