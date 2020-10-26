import type { FunctionComponent } from "react";
import Link from "next/link";
import type { TopicSearchResult } from "../../types/topic-search";
import styles from "./SearchResults.module.scss";


interface Props {
	results: TopicSearchResult[]
}


const SearchResults: FunctionComponent<Props> = (props: Props) => {
	return (
		<ul id={styles["search-results"]}>
			{
				props.results.map(result => (
					<li key={result.link} className={styles.result}>
						<Link href={result.link}>
							<a className={styles["result-link"]}>
								{result.label}
							</a>
						</Link>
					</li>
				))
			}
		</ul>
	);
};

export default SearchResults;