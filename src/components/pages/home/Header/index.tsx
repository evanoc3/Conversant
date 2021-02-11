import { ChangeEvent, Component, FormEvent, PropsWithChildren } from "react";
import Link from "next/link";
import styles from "./Header.module.scss";
// import { search as SearchIcon } from "@images/icons/index";
import { Search as SearchIcon } from "react-feather";
import { LoginPill } from "@components/index";


type Props = PropsWithChildren<{
}>


interface State {
	searchTerm: string
}


export default class Header extends Component<Props, State> {

	constructor(props: Props) {
		super(props);
		this.state = {
			searchTerm: ""
		};
		this.onSearchSubmit = this.onSearchSubmit.bind(this);
		this.onSearchTermChange = this.onSearchTermChange.bind(this);
	}


	public render(): JSX.Element {
		return (
			<header id={styles["header"]}>
				<h1 id={styles["title"]}>
					<Link href="/">
						<a id={styles["title-link"]}>
							Conversant
						</a>
					</Link>
				</h1>

				<div className={styles["spacer"]} />

				<form id={styles["search-form"]} onSubmit={this.onSearchSubmit}>
					<input type="text" id={styles["search-input"]} placeholder="Search..." onChange={this.onSearchTermChange} />
					<button id={styles["search-button"]}>
						<SearchIcon id={styles["search-icon"]} />
					</button>
				</form>

				<LoginPill />
			</header>
		);
	}


	private onSearchSubmit(e: FormEvent): void {
		e.preventDefault();
		if(this.state.searchTerm !== "") {
			alert("");
		}
	}


	private onSearchTermChange(e: ChangeEvent<HTMLInputElement>): void {
		this.setState({
			searchTerm: e.target.value
		});
	}

}