import { useState, useEffect, createRef } from "react";
import { Send as SendSvg } from "react-feather";
import styles from "./SendMessageForm.module.scss";

import type { PropsWithChildren, FormEvent } from "react";


type Props = PropsWithChildren<{
	messageSentHandler?: (message: string) => any,
	disabled?: boolean
}>


export default function SendMessageForm(props: Props): JSX.Element {
	const [userInput, setUserInput] = useState("");
	const inputElement = createRef<HTMLInputElement>();

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

	useEffect(() => {
		if(inputElement.current !== null) {
			if(!props.disabled) {
				inputElement.current.focus();
			}
			else {
				inputElement.current.blur();
			}
		}
	}, [ props.disabled ]);

	return (
		<form id={styles["form"]} onSubmit={handleSubmit}>
			<input type="text" id={styles["reply-textarea"]} placeholder="Write your message here..." onChange={e => setUserInput(e.target.value)} value={userInput} disabled={props.disabled} ref={inputElement} />

			<button id={styles["send-button"]} disabled={props.disabled || userInput === ""}>
				<SendSvg id={styles["send-button-icon"]} />
			</button>
		</form>
	);
};