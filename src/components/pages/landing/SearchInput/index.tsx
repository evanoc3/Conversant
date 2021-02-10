import { FunctionComponent, PropsWithRef, useState } from "react";
import type { ChangeEvent, FormEvent, FocusEvent, MouseEventHandler } from "react"
import searchIcon from "@images/icons/search-white.svg";
import styles from "./SearchInput.module.scss";
import type { TopicSearchResult } from "@customTypes/topic-search";


type Props = PropsWithRef<{
	placeholder: string
}>


const SearchInput: FunctionComponent<Props> = (props) => {
	const { placeholder } = props;
	const [ searchTerm, setSearchTerm ] = useState("");
	const [ isFocused, setIsFocused ] = useState(false);
	const [ shouldShowResults, setShouldShowResults ] = useState(false);
	const [ results, setResults ] = useState<TopicSearchResult[]>([]);

	function submitHandler(e?: FormEvent<HTMLFormElement>, selectedSearchTerm?: string): void {
		if(e) {
			e.preventDefault();
		}

		const term = selectedSearchTerm ?? searchTerm;

		if(term !== "") {
			alert("Searching for " + term);
		}
	}

	function focusHandler(e: FocusEvent<HTMLInputElement>): void {
		setIsFocused(true);
		if(searchTerm !== "") {
			setShouldShowResults(true);
		}
	}

	function blurHandler(e: FocusEvent<HTMLInputElement>): void {
		setIsFocused(false);
		setShouldShowResults(false);
	}

	async function changeHandler(e: ChangeEvent<HTMLInputElement>): Promise<void> {
		const newSearchTerm = e.target.value;
		setSearchTerm(newSearchTerm);
		setShouldShowResults(newSearchTerm !== "" && isFocused);

		if(newSearchTerm !== "") {
			const results = await getSearchResults().catch(err => {
				alert(`Failed to load search results for the search term \"${newSearchTerm}\". Please try again later.`);
				console.error(`Failed to load search results for the search term \"${newSearchTerm}\". Error: `, err);
			});

			if(results) {
				setResults(results);
			}
		}
	}

	function createResultClickHandler(topic: string): MouseEventHandler<HTMLButtonElement> {
		return (e) => {
			e.preventDefault();
			setSearchTerm(topic);
			submitHandler(undefined, topic);
		};
	}

	return (
		<form id={styles["container"]} autoComplete="off" onSubmit={submitHandler}>
			<input id={styles["input"]} onChange={changeHandler} placeholder={placeholder} onFocus={focusHandler} onBlur={blurHandler} value={searchTerm} />

			<button id={styles["submit-btn"]}>
				<img src={searchIcon} id={styles["submit-icon"]} draggable={false} />
			</button>

			
			<ol id={styles["results"]} className={(shouldShowResults) ? styles["results-showing"] : styles["results-hidden"]}>
				{
					(results.length) ? (
						results.map<JSX.Element>(result => (
							<li key={result.topic} className={styles["result-row"]}>
								<button onClick={createResultClickHandler(result.topic)} className={styles["result"]}>
									{result.label}
								</button>
							</li>
						))
					) : (
						<li key={"no-results"} id={styles["no-results-msg"]}>
							There are no results to display
						</li>
					)
				}
			</ol>
			
		</form>
	);
};

export default SearchInput;


async function getSearchResults(): Promise<TopicSearchResult[]> {
	return [
		{
			label: "React (UI framework)",
			topic: "react"
		},
		{
			label: "Java (Programming language)",
			topic: "java"
		}
	];
}