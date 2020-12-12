import React from "react";
import type { NextPage } from "next";
import Head from "react-helmet";
import styles from "./index.module.scss";
import { PageHead, AboutBox, Header, LandingHeroBox } from "components/index";


const LandingPage: NextPage = (props) => (
	<>
		<PageHead />

		<div id={styles.background} />

		<div id={styles.page}>
			<Header />

			<div id={styles.hero}>
				<LandingHeroBox />
			</div>

			<AboutBox />
		</div>
	</>
);


export default LandingPage;