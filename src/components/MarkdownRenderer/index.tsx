import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import "katex/dist/katex.min.css";
import styles from "./MarkdownRenderer.module.scss";

import type { PropsWithChildren } from "react";
import type { NormalComponents, SpecialComponents } from "react-markdown/src/ast-to-react";


type Props = PropsWithChildren<{
	classes?: Partial<{
		h1: string,
		h2: string,
		h3: string,
		h4: string,
		h5: string,
		h6: string,
		p: string,
		strong: string,
		em: string,
		a: string,
		img: string,
		blockquote: string,
		ul: string,
		ol: string,
		li: string,
		del: string,
		input: string,
		table: string,
		td: string,
		th: string,
		tr: string,
		pre: string,
		code: string
	}>
}>


export default function MarkdownRenderer(props: Props): JSX.Element {
	const [componentMap, setComponentMap] = useState<Partial<NormalComponents & SpecialComponents>>();

	useEffect(() => {
		setComponentMap({
			h1: ({node, ...subProps}) => <h1 {...subProps} className={`${styles["h1"]} ${props.classes?.h1}`} />,
			h2: ({node, ...subProps}) => <h2 {...subProps} className={`${styles["h2"]} ${props.classes?.h2}`} />,
			h3: ({node, ...subProps}) => <h3 {...subProps} className={`${styles["h3"]} ${props.classes?.h3}`} />,
			h4: ({node, ...subProps}) => <h4 {...subProps} className={`${styles["h4"]} ${props.classes?.h4}`} />,
			h5: ({node, ...subProps}) => <h5 {...subProps} className={`${styles["h5"]} ${props.classes?.h5}`} />,
			h6: ({node, ...subProps}) => <h6 {...subProps} className={`${styles["h6"]} ${props.classes?.h6}`} />,
			p: ({node, ...subProps}) => <p {...subProps} className={`${styles["p"]} ${props.classes?.p}`} />,
			strong: ({node, ...subProps}) => <strong {...subProps} className={`${styles["strong"]} ${props.classes?.strong}`} />,
			em: ({node, ...subProps}) => <em {...subProps} className={`${styles["em"]} ${props.classes?.em}`} />,
			a: ({node, ...subProps}) => <a {...subProps} className={`${styles["a"]} ${props.classes?.a}`} />,
			img: ({node, ...subProps}) => <img {...subProps} className={`${styles["img"]} ${props.classes?.img}`} />,
			blockquote: ({node, ...subProps}) => <blockquote {...subProps} className={`${styles["blockquote"]} ${props.classes?.blockquote}`} />,
			ul: ({node, ordered, ...subProps}) => {
				const isTaskList = subProps.className === "contains-task-list";
				return <ul {...subProps} className={`${isTaskList ? styles["checklist"]:""} ${styles["ul"]} ${props.classes?.ul}`} />
			},
			ol: ({node, ordered, ...subProps}) => {
				const isTaskList = subProps.className === "contains-task-list";
				return <ol {...subProps} className={`${isTaskList ? styles["checklist"] : ""} ${styles["ol"]} ${props.classes?.ol}`} />;
		},
			li: ({node, ordered, ...subProps}) => <li {...subProps} className={`${styles["li"]} ${props.classes?.li}`} />,
			del: ({node, ...subProps}) => <del {...subProps} className={`${styles["del"]} ${props.classes?.del}`} />,
			input: ({node, checked, ...subProps}) => (
				<input {...subProps} type="checkbox" className={`${styles["input"]} ${props.classes?.input}`} readOnly={true} checked={checked as boolean} disabled={false} />
			),
			table: ({node, ...subProps}) => <table {...subProps} className={`${styles["table"]} ${props.classes?.table}`} />,
			td: ({node, isHeader, ...subProps}) => <td {...subProps} className={`${styles["td"]} ${props.classes?.td}`} />,
			th: ({node, isHeader, ...subProps}) => <th {...subProps} className={`${styles["th"]} ${props.classes?.th}`} />,
			tr: ({node, isHeader, ...subProps}) => <tr {...subProps} className={`${styles["tr"]} ${props.classes?.tr}`} />,
			pre: ({node, ...subProps}) => <pre {...subProps} className={`${styles["pre"]} ${props.classes?.pre}`} />,
			code: ({node, inline, ...subProps}) => {
				const match = /language-(\w+)/.exec(subProps.className as string ?? "");
				const lang = (match) ? match[1] : "plaintext";

				const CustomPre = (subSubProps: PropsWithChildren<{style: any}>) => {
					return (inline) ? (
						<span className={`${styles["pre"]} ${styles["inline"]} ${props.classes?.pre}`} style={subSubProps.style}>{subSubProps.children}</span>
					) : (
						<pre className={`${styles["pre"]} ${styles["inline"]} ${props.classes?.pre}`} style={subSubProps.style}>{subSubProps.children}</pre>
					);
				};

				return (
					<SyntaxHighlighter style={vscDarkPlus} language={lang} PreTag={CustomPre} useInlineStyles={inline}>
						{ subProps.children.toString().trim() }
					</SyntaxHighlighter>
				);
			}
		});
	}, [ props.classes ]);

	return (
		<ReactMarkdown remarkPlugins={[remarkMath, remarkGfm]} rehypePlugins={[rehypeKatex]} components={componentMap}>
			{ props.children as string }
		</ReactMarkdown>
	);
}

