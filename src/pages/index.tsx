import React from "react";
import type { NextPage } from "next";
import styles from "./index.module.scss";
import { Background, Box, Footer, LandingHeader, LandingHeroBox, PageHead } from "components/index";


const LandingPage: NextPage = (props) => (
	<>
		<PageHead />

		<Background>
			<LandingHeader showNav={true} />

			<div id={styles["hero-container"]}>
				<LandingHeroBox />
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