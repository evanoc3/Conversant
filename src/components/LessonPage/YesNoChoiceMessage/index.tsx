import type { FunctionComponent, PropsWithChildren } from "react";
import styles from "./YesNoChoiceMessage.module.scss";


type Props = PropsWithChildren<{
	message: string,
	onChoiceSelected?: (selectedChoice: boolean) => any,
	choiceSelected?: boolean
}>


const YesNoChoiceMessage: FunctionComponent<Props> = (props) => {

	function choiceSelectionHandlerFactory(choice: boolean) {
		const choiceSelectionHandler = (props.onChoiceSelected == undefined) ? () => {} : props.onChoiceSelected;
		return () => choiceSelectionHandler(choice);
	}

	return (
		<div className={styles["container"]}>
			<div className={styles["choice-message"]}>
				<div className={styles["message-inner"]}>
					<span>{ props.message }</span>
				</div>

				<button className={styles["message-choice"]} onClick={choiceSelectionHandlerFactory(true)} disabled={props.choiceSelected === false}>
					Yes
				</button>

				<button className={styles["message-choice"]} onClick={choiceSelectionHandlerFactory(false)} disabled={props.choiceSelected === true}>
					No
				</button>
			</div>
		</div>
	);
};

export default YesNoChoiceMessage;


