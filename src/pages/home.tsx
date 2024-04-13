import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { Background } from "@components/index";
import { Header, LessonList, UserInfoBox } from "@components/HomePage/index";
import styles from "./home.module.scss";
import type { PropsWithChildren } from "react";


type Props = PropsWithChildren<{
}>


export default function HomePage(props: Props): JSX.Element {
	const router = useRouter();
	const { data: session, status } = useSession();

	useEffect(() => {
		if(router.isReady && status != "loading" && session === null) {
			router.replace("/");
		}
	}, [ router.isReady, status, session ]);


	return (
		<>
			<Head>
				<title>Home | Conversant</title>
			</Head>

			<Background>
				<div id={styles["page"]}>
					<Header />

					<div id={styles["main"]}>
						<div id={styles["grid"]}>
							<LessonList className={styles["lesson-list"]} />

							<UserInfoBox className={styles["info-box"]} />
						</div>
					</div>
				</div>
			</Background>
		</>
	);
}


