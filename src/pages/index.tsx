import React from "react";
import type { NextPage } from "next";
import styles from "./index.module.scss";
import { Background, PageHead, AboutBox, Header, LandingHeroBox } from "components/index";


const LandingPage: NextPage = (props) => (
	<>
		<PageHead />

		<Background>
			<Header showNav={true} />

			<div id={styles.hero}>
				<LandingHeroBox />
			</div>

			<AboutBox />
		</Background>
	</>
);


export default LandingPage;