import styles from "./Message.module.scss";

import type { FunctionComponent, PropsWithChildren } from "react";


type Props = PropsWithChildren<{
	message: string
}>


const Message: FunctionComponent<Props> = (props) => {
	return (
		<div className={styles["container"]}>
			<div className={styles["plain-message"]}>
				<span className={styles["inner-text"]}>{ props.message }</span>
			</div>
		</div>
	);
};

export default Message;