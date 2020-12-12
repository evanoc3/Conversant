import React from "react";
import type { NextPage } from "next";
import Head from "react-helmet";
import styles from "./index.module.scss";
import { Background, PageHead, AboutBox, Header, LandingHeroBox } from "components/index";


const LandingPage: NextPage = (props) => (
	<>
		<PageHead />

		<Background>
			<Header />

			<div id={styles.hero}>
				<LandingHeroBox />
			</div>

			<AboutBox />
		</Background>
	</>
);


export default LandingPage;