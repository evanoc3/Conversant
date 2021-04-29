import Head from "next/head";
import styles from "./index.module.scss";
import { Background } from "@components/index";
import { Header, SearchInput, Footer } from "@components/LandingPage/index";

import type { PropsWithChildren } from "react";


type Props = PropsWithChildren<{
}>


export default function LandingPage(props: Props): JSX.Element {
	return (
		<div id={styles["page"]}>
			<Head>
				<title>Home | Conversant</title>
			</Head>

			<Background>
				<Header />

				<div id={styles["hero-container"]}>
					<div id={styles["hero-box"]} className={styles["box"]}>
						<h1 id={styles["hero-title"]}>What would you like to learn?</h1>
						<SearchInput placeholder="Enter the topic e.g. Java programming..." />
					</div>
				</div>

				<div id={styles["about-box"]} className={styles["box"]}>
					<h2 id={styles["about-title"]}>About Conversant</h2>
					<p>Conversant is a learning platform that aims to teach people the way they learn the best, through conversation.</p>
				</div>

				<Footer />
			</Background>
		</div>
	);
}