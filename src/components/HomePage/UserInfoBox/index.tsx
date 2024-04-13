import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import styles from "./UserInfoBox.module.scss";
import { timeSince } from "@util/time";

import type { PropsWithChildren } from "react";
import type { Response as UserSummaryApiRouteResponse, HappyResponsePayload } from "@pages/api/my/summary";
import { stat } from "fs";


type Props = PropsWithChildren<{
	className?: string
}>


export default function UserInfoBox(props: Props): JSX.Element {
	const { data: session, status } = useSession();
	const [userInfo, setUserInfo] = useState<ParsedUserSummary | null>(null);

	useEffect(() => {
		if(status !== "loading" && session !== null) {
			getUserSummaryInfo().then(summary => {
				setUserInfo(summary);
			}).catch(err => { throw err; });
		}
	}, [ status, session ]);

	
	return (
		<table id={styles["info-box"]} className={props.className}>
			<tbody>
				<tr className={styles["row"]}>
					<td className={styles["label-cell"]}>Account created:</td>

					<td>{ (userInfo) ? timeSince(userInfo!.accountCreationTime) : "" } ago</td>
				</tr>

				<tr className={styles["row"]}>
					<td className={styles["label-cell"]}>Last sign in:</td>

					<td>{ (userInfo) ? timeSince(userInfo!.lastSignInTime) : "" } ago</td>
				</tr>

				<tr className={styles["row"]}>
					<td className={styles["label-cell"]}>Lessons completed:</td>

					<td>{ userInfo?.lessonsCompleted ?? "---" }</td>
				</tr>
			</tbody>
		</table>
	);
}


type ParsedUserSummary = Omit<HappyResponsePayload, "lastSignInTime" | "accountCreationTime"> & { lastSignInTime: Date, accountCreationTime: Date }

/**
 * Helper function which queries the API for a user account's summary info.
 * 
 * @throws If the HTTP request fails due to network conditions.
 * @throws If the server encountered an error while processing the request, and sent back a "error" field in the response.
 */
 async function getUserSummaryInfo(): Promise<ParsedUserSummary> {
	const resp = await fetch("/api/my/summary");

	if(!resp.ok) {
		throw new Error(`Failed to retrieve user's account summary. Received status \"${resp.statusText}\" from API`);
	}

	const body = await resp.json() as UserSummaryApiRouteResponse;

	if("error" in body) {
		throw new Error(body.error);
	}

	return {
		...body,
		lastSignInTime: new Date(body.lastSignInTime),
		accountCreationTime: new Date(body.accountCreationTime)
	};
}
