import { Component } from "react";
import type { FormEvent, ChangeEvent } from "react";
import styles from "./LandingHeroBox.module.scss";
import searchIcon from "./search.svg";
import { SearchResults } from "../../components/index";
import type { TopicSearchResult } from "../../types/topic-search";



interface Props {
}

interface State {
	topic: string,
	results: TopicSearchResult[],
	showResults: boolean
}


export default class LandingHeroBox extends Component<Props, State> {

	constructor(props: Props) {
		super(props);
		this.state = {
			topic: "",
			results: [],
			showResults: false
		};
		this.onInputChange = this.onInputChange.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
		this.showResults = this.showResults.bind(this);
		this.hideResults = this.hideResults.bind(this);
	}


	public render(): JSX.Element {
		const { props, state, onInputChange, onFormSubmit, showResults, hideResults } = this;
		return (
			<div id={styles.box}>
				<h1 id={styles.title}>What would you like to learn?</h1>

				<form onSubmit={onFormSubmit} autoComplete="off"> 
					<div id={styles["search-container"]}>
						<input placeholder="Enter the topic e.g. Next.js, or Java programming..." id={styles.search} onChange={onInputChange} value={state.topic} maxLength={60} onFocus={showResults} onBlur={hideResults} />

						<button id={styles.submit}>
							<img src={searchIcon} id={styles.icon} draggable={false} />
						</button>

						{
							state.showResults && state.results.length ? (
								<SearchResults results={state.results} />
							) : ""
						}
					</div>
				</form>
			</div>
		);
	}


	private onInputChange(e: ChangeEvent<HTMLInputElement>): void {
		const newTopic = e.target.value.slice(0, 50);
		if(newTopic === "") {
			this.setState({
				topic: "",
				results: []
			});
			this.hideResults();
		}
		else {
			this.setState({
				topic: newTopic
			});
			this.showResults();
			this.getTopicSearchResults();
		}
	}

	private showResults(): void {
		this.setState({
			showResults: true,
		});
	}

	private hideResults(): void {
		this.setState({
			showResults: false
		});
	}

	private onFormSubmit(e: FormEvent): void {
		e.preventDefault();
		const { state } = this;

		if(state.topic !== undefined) {
			alert(`${state.topic}`);
		}
	}

	private async getTopicSearchResults(): Promise<void> {
		this.setState({
			results: [
				{
					label: "React",
					link: "/"
				}
			]
		});
	}
}


