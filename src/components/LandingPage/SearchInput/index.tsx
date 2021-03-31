import { FunctionComponent, useState } from "react";
import { Search as SearchIcon } from "react-feather";
import styles from "./SearchInput.module.scss";

import type { PropsWithRef, ChangeEvent, FormEvent, FocusEvent, MouseEventHandler, TouchEventHandler, MouseEvent, TouchEvent } from "react";
import type { Response as ApiRouteResponse } from "@pages/api/topics";
import type { ITopicsTableRow } from "@customTypes/database";



type Props = PropsWithRef<{
	placeholder: string
}>


const SearchInput: FunctionComponent<Props> = (props) => {
	const { placeholder } = props;
	const [ searchTerm, setSearchTerm ] = useState("");
	const [ isFocused, setIsFocused ] = useState(false);
	const [ shouldShowResults, setShouldShowResults ] = useState(false);
	const [ results, setResults ] = useState<ITopicsTableRow[]>([]);

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

	function createResultClickHandler(topic: string): MouseEventHandler<HTMLLIElement> | TouchEventHandler<HTMLLIElement> {
		return (e: MouseEvent<HTMLLIElement> | TouchEvent<HTMLLIElement>) => {
			e.preventDefault();
			setSearchTerm(topic);
			submitHandler(undefined, topic);
		};
	}

	return (
		<form id={styles["container"]} autoComplete="off" onSubmit={submitHandler}>
			<input id={styles["input"]} onChange={changeHandler} placeholder={placeholder} onFocus={focusHandler} onBlur={blurHandler} value={searchTerm} />

			<button id={styles["submit-btn"]}>
				<SearchIcon id={styles["submit-icon"]} />
			</button>

			
			<ol id={styles["results"]} className={(shouldShowResults) ? styles["results-showing"] : styles["results-hidden"]}>
				{
					(results.length) ? (
						results.map<JSX.Element>(result => (
							<li key={result.id} className={styles["result"]} onClick={createResultClickHandler(result.id) as MouseEventHandler} onTouchEnd={createResultClickHandler(result.id) as TouchEventHandler}>
								{ result.label }
							</li>
						))
					) : (
						<li key={"no-results"} id={styles["no-results-msg"]}>
							There are no results for this term
						</li>
					)
				}
			</ol>
			
		</form>
	);
};

export default SearchInput;


/**
 * Helper function which queries the API route `/api/topics` and parses the response
 */
async function getSearchResults(): Promise<ITopicsTableRow[]> {
	const resp = await fetch("/api/topics");

	if(! resp.ok) {
		console.error(`Error: GET request failed to API route "/api/get-topics" failed. Status: ${resp.status} (${resp.statusText}) `);
		throw new Error();
	}

	const body = await resp.json() as ApiRouteResponse;

	if("error" in body) {
		console.error("Error: GET request failed to API route \"/api/get-topics\" failed. Error message: ", body.error);
		throw new Error(body.error);
	}

	return body.results;
}