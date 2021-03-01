import { FunctionComponent, PropsWithChildren, useState, FormEvent } from "react";
import { Send as SendSvg } from "react-feather";
import styles from "./SendMessageForm.module.scss";


type Props = PropsWithChildren<{
}>


const SendMessageForm: FunctionComponent<Props> = () => {
	const [userInput, setUserInput] = useState("");


	async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
		e.preventDefault();
		if(userInput !== "") {
			alert(`Sending message: \"${userInput}\"`);
		}
	}

	
	return (
		<form id={styles["form"]} onSubmit={handleSubmit}>
			<textarea id={styles["reply-textarea"]} placeholder={"Write your message here..."} onChange={e => setUserInput(e.target.value)} value={userInput} />

			<button id={styles["send-button"]}>
				<SendSvg id={styles["send-button-icon"]} />
			</button>
		</form>
	);
};

export default SendMessageForm;