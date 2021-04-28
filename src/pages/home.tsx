import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useSession } from "next-auth/client";
import { Background } from "@components/index";
import { Header, LessonList } from "@components/HomePage/index";
import styles from "./home.module.scss";

import type { PropsWithChildren } from "react";
import type { Response as LastSigninApiRouteResponse } from "@pages/api/my/last-signin";


type Props = PropsWithChildren<{
}>


export default function HomePage(props: Props): JSX.Element {
	const router = useRouter();
	const [session, sessionLoading] = useSession();
	const [lastSignInTime, setLastSignInTime] = useState<Date | null>(null);

	useEffect(() => {
		if(router.isReady && !sessionLoading && session === null) {
			router.replace("/");
		}
	}, [ router.isReady, sessionLoading, session ]);

	useEffect(() => {
		if(session !== null) {
			getLastSignInTime().then(time => setLastSignInTime(time)).catch(err => { throw err; });
		}
	}, [ session ]);


	return (
		<>
			<Head>
				<title>Home | Conversant</title>
			</Head>

			<Background>
				<Header />

				<div id={styles["main"]}>
					Last sign in was at: { lastSignInTime?.toISOString() ?? "---" }
					<LessonList />
				</div>
			</Background>
		</>
	);
}


/**
 * Helper function which queries the API for the datetime user's latest session.
 */
async function getLastSignInTime(): Promise<Date> {
	const resp = await fetch("/api/my/last-signin");

	if(!resp.ok) {
		throw new Error(`Failed to retrieve last signin time. Received status \"${resp.statusText}\" from API`);
	}

	const body = await resp.json() as LastSigninApiRouteResponse;

	if("error" in body) {
		throw new Error(body.error);
	}

	return new Date(body.lastSignInTime);
}