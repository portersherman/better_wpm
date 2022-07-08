import { Head, Html, Main, NextScript } from "next/document"

const Document = () => {
	return (
		<Html>
			<Head>
				<meta charSet="utf-8"/>
				<meta
					name="Words-per-minute testbench"
					content="Generate insights re: typing efficiency on this interactive platform"
				/>
				<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@200;400;700&display=swap"
				      rel="stylesheet" />
				<link rel="icon" href="/logo.png"/>
				<link rel="apple-touch-icon" href="/logo@0.5x.png"/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}

export default Document;