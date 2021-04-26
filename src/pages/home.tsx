import type { PropsWithChildren, MouseEventHandler } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { useSession, signOut } from "next-auth/client";
import { Background } from "@components/index";
import { Header, LessonList } from "@components/HomePage/index";
import styles from "./home.module.scss";


type Props = PropsWithChildren<{
}>


const HomePage: NextPage<Props> = (props) => {
	const [session, loading] = useSession();

	if(!loading && !session) {
		const router = useRouter();
		router.replace("/");
	}

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
							<LessonList />
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