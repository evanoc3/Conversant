import type { FunctionComponent } from "react";
import type { TopicSearchResult } from "../../types/topic-search";
import styles from "./SearchResults.module.scss";


interface Props {
	results: TopicSearchResult[],
	onResultSelected: (selectedTopic: string) => any,
	containerClass?: string,
}


const SearchResults: FunctionComponent<Props> = (props: Props) => {
	return (
		<ul id={styles["search-results"]} className={props.containerClass}>
			{
				props.results.map(result => (
					<li key={result.topic} className={styles["result-row"]}>
						{/* <Link href={result.topic}>
							<a className={styles["result-link"]}> */}
							<button className={styles["result"]} onClick={(e) => {e.preventDefault(); props.onResultSelected(result.topic)}}>
								{result.label}
							</button>
							{/* </a>
						</Link> */}
					</li>
				))
			}
		</ul>
	);
};

export default SearchResults;