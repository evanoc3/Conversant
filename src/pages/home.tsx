import React, { Component } from "react";
import { Background, Head } from "@components/index";
import { Header } from "@components/pages/home/index";
import styles from "./home.module.scss";


interface Props {
}

interface State {
}


class HomePage extends Component<Props, State> {
	public render(): JSX.Element {
		return (
			<>
				<Head title="Home | Conversant" />

				<Background>
					<Header />
					<div id={styles["main"]}>

					</div>
				</Background>
			</>
		);

	}
}

export default HomePage;