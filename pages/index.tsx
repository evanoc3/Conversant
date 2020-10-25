import React from "react";
import type { NextPage } from "next";
import Head from "react-helmet";
import styles from "./index.module.scss";
import { LandingHeroBox } from "../components/index";



const LandingPage: NextPage = (props) => (
	<>
		<Head>
			<meta charSet="UTF-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<title>Conversant | Natural Learning</title>
		</Head>

		<div id={styles.background} />

		<div id={styles.page}>
			<header>
				<h1 id={styles.title}>Conversant</h1>
			</header>

			<div id={styles.hero}>
				<LandingHeroBox />
			</div>
		</div>
	</>
);


export default LandingPage;