import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import styles from "./Message.module.scss";
import "katex/dist/katex.min.css";

import type { PropsWithChildren } from "react";
import type { NormalComponents, SpecialComponents } from "react-markdown/src/ast-to-react";


type Props = PropsWithChildren<{
	message: string
}>


function CustomPreTag(props: PropsWithChildren<{style: any}>): JSX.Element {
	return (
		<pre className={styles["pre"]} style={props.style}>
			{ props.children }
		</pre>
	);
}


const componentMapping: Partial<NormalComponents & SpecialComponents> = {
	h1: ({node, ...props}) => <h1 className={styles["h1"]} {...props} />,
	h2: ({node, ...props}) => <h2 className={styles["h2"]} {...props} />,
	h3: ({node, ...props}) => <h3 className={styles["h3"]} {...props} />,
	h4: ({node, ...props}) => <h4 className={styles["h4"]} {...props} />,
	h5: ({node, ...props}) => <h5 className={styles["h5"]} {...props} />,
	h6: ({node, ...props}) => <h6 className={styles["h6"]} {...props} />,
	p: ({node, ...props}) => <p className={styles["p"]} {...props} />,
	strong: ({node, ...props}) => <strong className={styles["strong"]} {...props} />,
	em: ({node, ...props}) => <em className={styles["em"]} {...props} />,
	a: ({node, ...props}) => <a className={styles["a"]} {...props} />,
	img: ({node, ...props}) => <img className={styles["img"]} {...props} />,
	blockquote: ({node, ...props}) => <blockquote className={styles["blockquote"]} {...props} />,
	ul: ({node, ordered, ...props}) => <ul {...props} className={(props.className === "contains-task-list" ? styles["checklist"] : "") + " " + styles["ul"]} />,
	ol: ({node, ordered, ...props}) => <ol {...props} className={(props.className === "contains-task-list" ? styles["checklist"] : "") + " " + styles["ul"]} />,
	li: ({node, ordered, ...props}) => <li className={styles["li"]} {...props} />,
	del: ({node, ...props}) => <del className={styles["del"]} {...props} />,
	input: ({node, ...props}) => <input type="checkbox" className={styles["input"]} readOnly={true} checked={props.checked as boolean}  />,
	table: ({node, ...props}) => <table className={styles["table"]} {...props} />,
	td: ({node, isHeader, ...props}) => <td className={styles["td"]} {...props} />,
	th: ({node, isHeader, ...props}) => <th className={styles["th"]} {...props} />,
	tr: ({node, isHeader, ...props}) => <tr className={styles["tr"]} {...props} />,
	pre: ({node, ...props}) => <pre {...props} className={styles["pre"]} />,
	code: ({node, inline, ...props}) => {
		if(inline) {
			return <code {...props} className={`${styles["code"]} ${styles["inline"]}`} />;
		}

		const match = /language-(\w+)/.exec(props.className as string ?? "");
		const lang = (match) ? match[1] : "plaintext";

		return (
			<SyntaxHighlighter style={vscDarkPlus} language={lang} PreTag={CustomPreTag}>
				{ props.children.toString().trim() }
			</SyntaxHighlighter>
		);
	}
};


export default function Message(props: Props): JSX.Element {
	return (
		<div className={styles["container"]}>
			<div className={styles["message"]}>
				<span className={styles["inner-text"]}>
					<ReactMarkdown remarkPlugins={[remarkMath, remarkGfm]} rehypePlugins={[rehypeKatex]} components={componentMapping}>
						{ props.message }
					</ReactMarkdown>
				</span>
			</div>
		</div>
	);
}