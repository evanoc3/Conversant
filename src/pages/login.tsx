// import React from "react";
import type { NextPage } from "next";
// import Head from "react-helmet";
import styles from "./login.module.scss";
import { Background, PageHead, Box } from "components/index";


const LoginPage: NextPage = (props) => (
	<>
		<PageHead title="Login or Sign Up | Conversant" />

		<Background>
			<Box id={styles["form-box"]}>
				
			</Box>
		</Background>
	</>
);


export default LoginPage;