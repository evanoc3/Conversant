import { useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import authManager from "utils/auth-manager";


const LogoutPage: NextPage = () => {
	const router = useRouter();

	useEffect(() => {
		authManager.logout();
		router.push("/")
	}, []);

	// All this page does is redirect you after deleting your token, so it doesn't need to render anything
	return (
		<>
		</>
	);
};

export default LogoutPage;