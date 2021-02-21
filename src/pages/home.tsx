import type { PropsWithChildren, MouseEventHandler } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useSession, signOut } from "next-auth/client";
import { Background } from "@components/index";
import { Header } from "@components/HomePage/index";
import styles from "./home.module.scss";


type Props = PropsWithChildren<{
}>


const HomePage: NextPage<Props> = (props) => {
	const [session, loading] = useSession();

	const signOutClickHandler: MouseEventHandler<HTMLAnchorElement> = (e) => {
		e.preventDefault();
		signOut({
			callbackUrl: "/"
		});
	};

	return (
		<>
			<Head>
				<title>Home | Conversant</title>
			</Head>

			<Background>
				<Header />

				<div id={styles["main"]}>
					{
						(!loading && session) ? (
							<a href="/api/auth/signout" onClick={signOutClickHandler}>Sign Out</a>
						) : (
							<span>Loading...</span>
						)
					}
				</div>
			</Background>
		</>
	);
}

export default HomePage;