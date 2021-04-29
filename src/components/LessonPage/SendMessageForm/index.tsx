import { FunctionComponent, PropsWithChildren, useState, FormEvent } from "react";
import { Send as SendSvg } from "react-feather";
import styles from "./SendMessageForm.module.scss";


type Props = PropsWithChildren<{
	messageSentHandler?: (message: string) => any,
	disabled?: boolean
}>


const SendMessageForm: FunctionComponent<Props> = (props) => {
	const [userInput, setUserInput] = useState("");


	async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
		e.preventDefault();

		if(userInput === "") {
			return;
		}

		setUserInput("");

		if(props.messageSentHandler !== undefined) {
			props.messageSentHandler(userInput);
		}
	}

	
	return (
		<form id={styles["form"]} onSubmit={handleSubmit}>
			<input type="text" id={styles["reply-textarea"]} placeholder="Write your message here..." onChange={e => setUserInput(e.target.value)} value={userInput} disabled={props.disabled} />

			<button id={styles["send-button"]} disabled={userInput === "" || props.disabled === true}>
				<SendSvg id={styles["send-button-icon"]} />
			</button>
		</form>
	);
};

export default SendMessageForm;