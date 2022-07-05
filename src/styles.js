export const styles = {
	clickable: {
		position: "relative",
		cursor: "pointer",
		height: 32,
		width: 32,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",

		"&:after": {
			content: "''",
			display: "block",
			position: "absolute",
			left: "calc(50% - 8px)",
			bottom: -6,
			height: 1,
			width: 1,
			borderRadius: 1,
			backgroundColor: "#000000",
			opacity: 0,
			transition: "opacity 300ms ease-in-out, width 300ms ease-in-out"
		},

		"&:hover": {
			"&:after": {
				opacity: 1,
				width: 16
			}
		}
	},

	container: {
		display: "flex",
		flexDirection: "column",
		height: "100vh",

		"& header": {
			display: "flex",
			flexGrow: 0,
			alignItems: "center",
			padding: "0 5vw",

			"& #logo": {
				marginRight: 18
			},

			"& h1": {
				margin: "36px 0",
				marginRight: "auto"
			},

			"& div": {
				marginLeft: 18
			},
		},

		"& footer": {
			display: "flex",
			flexGrow: 0,
			justifyContent: "flex-end",
			alignItems: "center",
			marginTop: 18,
			padding: "0 50px",
			backgroundColor: "#ffffff",
			color: "#3e665c"
		},

		"& section": {
			margin: "0 5vw",
			marginBottom: 36,

			"& p": {
				margin: 0
			},

			"&#evaluation": {
				position: "relative",
				display: "flex",

				"& div": {
					margin: "0 36px",

					"&:first-child": {
						marginLeft: 0
					},

					"&:last-child": {
						marginRight: 0
					},

					"&#paragraphContainer": {
						width: "66%"
					},

					"&#scoreContainer": {
						boxSizing: "border-box",
						flexGrow: 1,
						margin: 0,
						height: "100%",
						display: "flex",
						alignItems: "flex-end",
						flexDirection: "column",

						"& h1": {
							fontSize: 128,
							margin: 0,
							marginTop: -40,
							marginBottom: 18,
						}
					},

					"&#legendContainer": {
						display: "flex",
						flexDirection: "column"
					}
				},
			},

			"&#metrics": {
				display: "flex",
				flexGrow: 1,
				alignItems: "flex-start",

				"& div": {
					flexGrow: 1,
					display: "flex",
					alignItems: "center",
					padding: "0 36px",
					width: "25%",
					boxSizing: "border-box",

					"&:first-child": {
						paddingLeft: 0,
					},

					"&:last-child": {
						paddingRight: 0
					},

					"& h2": {
						margin: 0,
						marginLeft: "auto"
					}
				}
			}
		}
	}
};