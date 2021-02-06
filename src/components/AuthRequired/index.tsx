import { FunctionComponent, PropsWithChildren, useEffect } from "react";
import { useRouter } from "next/router";
import authManager from "utils/auth-manager";


type Props = PropsWithChildren<{}>


const AuthRequired: FunctionComponent<Props> = (props) => {
	const router = useRouter();

	useEffect(() => {
		if(!authManager.isLoggedIn()) {
			router.push("/login");
		}
	});



	return (
		<>
			{ props.children }
		</>
	);
};

export default AuthRequired;