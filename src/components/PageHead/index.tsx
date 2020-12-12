import { FunctionComponent } from "react";
import Head from "next/head";


interface Props {
	title?: string
}


const PageHead: FunctionComponent<Props> = (props: Props) => {
	return (
		<Head>
			<title>{props.title ?? "Conversant | Natural Learning"}</title>
			<meta charSet="utf-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<meta name="author" content="Evan O'Connor <e.oconnor47@nuigalway.ie>" />
		</Head>
	);
};


export default PageHead;