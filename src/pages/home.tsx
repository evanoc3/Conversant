import React, { Component } from "react";
import { Background, Box, Head } from "@components/index";
import { Header } from "@components/pages/home/index";


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
					<Box></Box>
				</Background>
			</>
		);

	}
}

export default HomePage;