import { jest } from "@jest/globals";
import { NextRouter } from "next/router";
import type { ComponentType } from "react";


jest.doMock("next/router", () => {

	const router: unknown = {
		prefetch: async () => {},
		push: async () => true,
		route: "",
		pathname: "",
		query: {},
		asPath: "",
		basePath: ""
	};

	return {
		useRouter(): NextRouter {
			return router as NextRouter;
		},

		withRouter<P>(Component: ComponentType<P>): ComponentType<P & {router: NextRouter}> {
			function WithRouterWrapper(props: any): JSX.Element {
				return <Component router={router} {...props} />
			}
			return WithRouterWrapper;
		}
	};
});

