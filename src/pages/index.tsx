import React from "react";
import type { NextPage } from "next";
import styles from "./index.module.scss";
import { Background, Box, Footer, Head } from "@components/index";
import { Header, HeroBox, } from "@components/pages/landing/index";


const LandingPage: NextPage = (props) => (
	<>
		<Head />

		<Background>
			<Header showNav={true} />

			<div id={styles["hero-container"]}>
				<HeroBox />
			</div>

			<Box id={styles["about-box"]}>
				<h2 id={styles["about-title"]}>About Conversant</h2>
				<p>Conversant is a learning platform that aims to teach people the way they learn the best, through conversation.</p>
			</Box>

			<Footer />
		</Background>
	</>
);


export default LandingPage;