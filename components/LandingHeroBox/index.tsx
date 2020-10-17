import React, { useState } from "react";
import type { FunctionComponent, FormEvent, ChangeEvent } from "react";
import styles from "./LandingHeroBox.module.scss";
import searchIcon from "./search.svg";



const LandingHeroBox: FunctionComponent = () => {
	// Set state
	const [topic, setTopic] = useState<string>("");

	// Event handlers
	function onChangeHandler(e: ChangeEvent<HTMLInputElement>): void {
		if(e.target.value.length <= 60) {
			setTopic(e.target.value);
		}
	}

	function formHandler(e: FormEvent): void {
		e.preventDefault();
		if(validateTopic(topic)) {
			alert(`${topic}`);
		}
	};

	// Render
	return (
		<div id={styles.box}>
			<h1 id={styles.title}>What would you like to learn?</h1>

			<form onSubmit={formHandler} id={styles.form}> 

				<input placeholder="Enter the topic e.g. Next.js, or Java programming..." id={styles.search} onChange={onChangeHandler} value={topic} maxLength={60} />

				<button id={styles.submit}>
					<img src={searchIcon} id={styles.icon} draggable={false} />
				</button>
			</form>
		</div>
	);
};

export default LandingHeroBox;


function validateTopic(topic: string): boolean {
	return 
}