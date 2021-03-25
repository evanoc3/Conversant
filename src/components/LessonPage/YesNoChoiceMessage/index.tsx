import type { FunctionComponent, PropsWithChildren } from "react";
import { useState, useEffect } from "react";
import styles from "./YesNoChoiceMessage.module.scss";


type Props = PropsWithChildren<{
	message: string,
	onChoiceSelected?: (selectedChoice: boolean) => any,
	choiceSelected?: boolean
}>


const YesNoChoiceMessage: FunctionComponent<Props> = (props) => {

	const [yesButtonDisabled, setYesButtonDisabled] = useState(false);
	const [noButtonDisabled, setNoButtonDisabled] = useState(false);


	function choiceSelectionHandlerFactory(choice: boolean) {
		const choiceSelectionHandler = (props.onChoiceSelected === undefined) ? () => {} : props.onChoiceSelected;
		return () => {
			setYesButtonDisabled(choice === false);
			setNoButtonDisabled(choice === true);
			choiceSelectionHandler(choice);
		}
	}


	useEffect(() => {
		setYesButtonDisabled( props.choiceSelected !== undefined && props.choiceSelected !== true );
		setNoButtonDisabled( props.choiceSelected !== undefined && props.choiceSelected !== false );
	}, [ props.choiceSelected ]);



	return (
		<div className={styles["container"]}>
			<div className={styles["choice-message"]}>
				<div className={styles["message-inner"]}>
					<span>{ props.message }</span>
				</div>

				<button className={styles["message-choice"]} onClick={choiceSelectionHandlerFactory(true)} disabled={yesButtonDisabled}>
					Yes
				</button>

				<button className={styles["message-choice"]} onClick={choiceSelectionHandlerFactory(false)} disabled={noButtonDisabled}>
					No
				</button>
			</div>
		</div>
	);
};

export default YesNoChoiceMessage;


