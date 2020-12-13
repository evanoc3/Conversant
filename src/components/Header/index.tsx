import { FunctionComponent } from "react";
import styles from "./Header.module.scss";
import { LoginPill } from "components/index";


interface Props {
	showNav?: boolean
}


const Header: FunctionComponent<Props> = (props: Props) => (
	<header id={styles.header}>
		<h1 id={styles.title}>Conversant</h1>

		{
			(props.showNav) ? (
				<>
					<div className={styles.spacer} />

					<LoginPill />
				</>
			) : ""
		}		

	</header>
);


export default Header;