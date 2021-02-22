import type { NextPage } from "next";
import Head from "next/head";
import styles from "./index.module.scss";
import { Background, Footer } from "@components/index";
import { Header, SearchInput } from "@components/LandingPage/index";


const LandingPage: NextPage = (props) => (
	<>
		<Head>
			<title>Home | Conversant</title>
		</Head>

		<Background>
			<Header showNav={true} />

			<div id={styles["hero-container"]}>
				<div id={styles["hero-box"]} className={styles["box"]}>
					<h1 className={styles["title"]} id={styles["hero-title"]}>What would you like to learn?</h1>
					<SearchInput placeholder="e.g. Next.js, or Java programming..." />
				</div>
			</div>

			<div id={styles["about-box"]} className={styles["box"]}>
				<h2 className={styles["title"]} id={styles["about-title"]}>About Conversant</h2>
				<p>Conversant is a learning platform that aims to teach people the way they learn the best, through conversation.</p>
			</div>

			<Footer />
		</Background>
	</>
);


export default LandingPage;