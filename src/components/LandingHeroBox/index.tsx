import { Component, createRef } from "react";
import type { FormEvent, ChangeEvent, RefObject } from "react";
import styles from "./LandingHeroBox.module.scss";
import searchIcon from "./search.svg";
import { Box, SearchResults } from "components/index";
import type { TopicSearchResult } from "types/topic-search";


interface Props {
}

interface State {
	topic: string,
	results: TopicSearchResult[],
	showResults: boolean,
	showBlockingModal: boolean
}


export default class LandingHeroBox extends Component<Props, State> {

	private formRef: RefObject<HTMLFormElement>;
	private hideResultsTimer: number | undefined;

	constructor(props: Props) {
		super(props);
		this.state = {
			topic: "",
			results: [],
			showResults: false,
			showBlockingModal: true
		};
		this.formRef = createRef();
		this.onInputChange = this.onInputChange.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
		this.showResults = this.showResults.bind(this);
		this.hideResults = this.hideResults.bind(this);
		this.selectTopic = this.selectTopic.bind(this);
	}


	public render(): JSX.Element {
		const { props, state, onInputChange, onFormSubmit, showResults, hideResults } = this;
		return (
			<Box id={styles["box"]}>
				<h1 id={styles.title}>What would you like to learn?</h1>

				<form onSubmit={onFormSubmit} autoComplete="off" ref={this.formRef}> 
					<div id={styles["search-container"]}>
						<input placeholder="Enter the topic e.g. Next.js, or Java programming..." id={styles.search} onChange={onInputChange} value={state.topic} maxLength={60} onFocus={showResults} onBlur={hideResults} />

						<button id={styles.submit}>
							<img src={searchIcon} id={styles.icon} draggable={false} />
						</button>


						<SearchResults containerClass={`${styles["search-results"]} ${state.showResults ? styles.showing : ""}`} results={state.results} onResultSelected={this.selectTopic} />

					</div>
				</form>
			</Box>
		);
	}

	public componentWillUnmount(): void {
		if(this.hideResultsTimer !== undefined) {
			clearTimeout(this.hideResultsTimer);
			this.hideResultsTimer = undefined;
		}
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
				showResults: true,
				topic: newTopic
			});
			this.showResults();
			this.getTopicSearchResults();
		}
	}

	private showResults(): void {
		if(this.state.topic.length > 0) {
			this.setState({
				showResults: true,
			});
		}
	}

	private hideResults(): void {
		this.setState({
			showResults: false
		});
	}

	private onFormSubmit(e: FormEvent): boolean {
		e.preventDefault();
		const { state } = this;

		if(state.topic !== undefined) {
			alert(`${state.topic}`);
		}
		return false;
	}

	private async getTopicSearchResults(): Promise<void> {
		this.setState({
			results: [
				{
					label: "React",
					topic: "react"
				}
			]
		});
	}

	private selectTopic(newTopic: string): void {
		this.setState({
			topic: newTopic,
			showResults: false
		}, () => {
			this.formRef.current?.requestSubmit();
		});

	}
}