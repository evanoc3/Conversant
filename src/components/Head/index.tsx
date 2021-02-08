import { FunctionComponent, PropsWithChildren } from "react";
import Head from "next/head";


type Props = PropsWithChildren<{
	title?: string
}>


const PageHead: FunctionComponent<Props> = (props: Props) => {
	const title = props.title ?? "Conversant | Natural Learning";
	return (
		<Head>
			<title>{ title }</title>
			<meta charSet="utf-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<meta name="author" content="Evan O'Connor <e.oconnor47@nuigalway.ie>" />

			{
				props.children
			}
		</Head>
	);
};


export default PageHead;