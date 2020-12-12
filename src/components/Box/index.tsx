import { FunctionComponent, PropsWithChildren} from "react";
import styles from "./Box.module.scss";


type Props = PropsWithChildren<{
	className?: string,
	id?: string
}> 


const Box: FunctionComponent<Props> = (props: Props) => {
	return (
		<div id={props.id} className={styles["box"] + ` ${props.className}`}>
			{ props.children }
		</div>
	);
}

export default Box;