import { Component } from "react";
import Link from "next/link";
import styles from "./Header.module.scss";
import { UserBadge } from "@components/index";

import type { ChangeEvent, FormEvent, PropsWithChildren } from "react";


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
				<UserBadge />
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