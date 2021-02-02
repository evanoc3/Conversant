import React, { Component } from "react";
import styles from "./home.module.scss";
import { AuthRequired, Background, Box, PageHead, HomeHeader } from "components/index";


interface Props {
}

interface State {
}


class HomePage extends Component<Props, State> {
	public render(): JSX.Element {
		return (
			<AuthRequired>
				<PageHead title="Home | Conversant" />

				<Background>
					<HomeHeader />
					<Box></Box>
				</Background>

				{/* <div id={styles["page"]}>

				</div> */}
			</AuthRequired>
		);

	}
}

export default HomePage;