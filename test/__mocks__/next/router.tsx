import { jest } from "@jest/globals";
import { NextRouter } from "next/router";
import type { ComponentType } from "react";


type ComponentWithRouter<P> = ComponentType<P & { router: NextRouter }>;


jest.doMock("next/router", () => {
	const router: unknown = {
		prefetch: async () => {},
		push: async () => true,
		route: "",
		pathname: "",
		query: {},
		asPath: "",
		basePath: "",
		events: {
			on(ev: string, handler: () => any) {},
			off(ev: string, handler: () => any) {}
		}
	};

	return {
		useRouter(): NextRouter {
			return router as NextRouter;
		},

		withRouter<P>(Component: ComponentType<P>): ComponentWithRouter<P> {
			function WithRouterWrapper(props: any): JSX.Element {
				return <Component router={router} {...props} />
			}
			
			return WithRouterWrapper;
		}
	};
});

