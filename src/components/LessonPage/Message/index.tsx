import type { FunctionComponent, PropsWithChildren } from "react";
import styles from "./Message.module.scss";


type Props = PropsWithChildren<{
	message: string
}>


const Message: FunctionComponent<Props> = (props) => {
	return (
		<div className={styles["container"]}>
			<div className={styles["plain-message"]}>
				<span>{ props.message }</span>
			</div>
		</div>
	);
};

export default Message;