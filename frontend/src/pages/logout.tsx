import { useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import authManager from "utils/auth-manager";


const LogoutPage: NextPage = (props) => {
	const router = useRouter();
	useEffect(() => {
		authManager.logout();
		router.push("/")
	}, []);
	return (
		<>
		</>
	);
};

export default LogoutPage;