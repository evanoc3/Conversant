import type { FunctionComponent, PropsWithChildren } from "react";
import styles from "./UserMessage.module.scss";


type Props = PropsWithChildren<{
	message: string
}>


const UserMessage: FunctionComponent<Props> = (props) => {
	return (
		<div className={styles["container"]}>
			<div className={styles["user-message"]}>
				<span>{ props.message }</span>
			</div>
		</div>
	);
};

export default UserMessage;