import React from "react"
import Head from "next/head"

import "../styles/styles.scss";

function App({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>Better WPM</title>
			</Head>
			<Component {...pageProps} />
		</>
	);
}

export default App;