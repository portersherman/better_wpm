import React, { Component, Fragment } from "react"
import getRandomWords from "random-words";
import injectSheet from 'react-jss';

import Metrics from "./util/Metrics";
import Word from "./util/Word";
import { styles } from "./styles"

const UPDATE_RATE = 500;

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			words: [],
			millis: 0,
			metrics: new Metrics(0, 0),
			complete: false,
			preferencesOpen: false,
			textLength: 50
		}

		this.expectedText = this.getExpectedText();
		this.actualText = [];
		this.inputBuffer = [];

		this.timer = undefined;
		this.pauser = undefined;
	}

	getExpectedText = () => {
		this.clearTimer();

		return getRandomWords(this.state.textLength);
	}

	componentDidMount() {
		window.addEventListener("keydown", event => {
			this.processKey(event.which || event.keyCode, event.key);
		});

		this.updateWords();
	}

	processKey(keyCode, keyAsString) {
		let prevInputBufferLength = this.inputBuffer.length;

		if (keyCode === 13) {
			if (this.state.complete) {
				this.reset();
			} else {
				this.setState({
					complete: true
				});

				this.clearTimer();
			}

			return;
		}

		if ((keyCode >= 65 && keyCode <= 90)) {
			this.inputBuffer.push(keyAsString);
		}

		if (keyCode === 32 && this.inputBuffer[this.inputBuffer.length - 1] !== " ") {
			this.inputBuffer.push(keyAsString);
		}

		switch (keyAsString) {
			case "Backspace":
				if (this.inputBuffer.length > 0) {
					this.inputBuffer.splice(this.inputBuffer.length - 1);
				}
				break;
			default:
				break;
		}

		if (this.inputBuffer.length !== prevInputBufferLength) {
			this.actualText = this.inputBuffer.length > 0 ? this.inputBuffer.join("").split(" ") : [];
			this.updateWords();

			if (this.state.complete) {
				this.setState({
					complete: false
				});
			}

			this.clearPauser();
			this.pauser = window.setTimeout(() => {
				this.clearTimer();
			}, 1000)

			if (!this.timer) {
				this.timer = window.setInterval(() => {
					this.updateTimer(UPDATE_RATE);
					this.updateMetrics();
				}, UPDATE_RATE);
			}
		}
	}

	updateWords() {
		let words = [];

		if (this.actualText.length > this.state.textLength) {
			this.clearTimer()
		}

		this.expectedText.forEach((expected, index) => {
			let actual = index >= this.actualText.length ? "" : this.actualText[index];
			words.push(new Word(expected, actual, index));
		});

		this.setState({
			words: words,
		});
	}

	clearPauser () {
		if (!!this.pauser) {
			window.clearTimeout(this.pauser)
			this.pauser = undefined
		}
	}

	clearTimer() {
		if (!!this.timer) {
			window.clearInterval(this.timer)
			this.timer = undefined;
		}
	}

	reset() {
		this.setState({
			millis: 0,
			complete: false
		}, () => {
			this.expectedText = this.getExpectedText();
			this.actualText = [];
			this.inputBuffer = [];
			this.updateWords();
			this.updateMetrics();
			this.clearTimer();
			this.clearPauser();
		});
	}

	togglePreferences = () => {
		this.setState(prevState => ({
			preferencesOpen: !prevState.preferencesOpen
		}));
	}

	updateTimer(interval) {
		this.setState({ millis: this.state.millis + interval });
	}

	updateMetrics() {
		let totalTyped = 0;
		let totalCorrect = 0;

		if (this.state.millis > 0) {
			this.state.words.forEach(word => {
				totalTyped += word.getTypedCount();
				totalCorrect += word.getCorrectCount();
			});
		}

		if (this.state.metrics.shouldUpdate(totalTyped, totalCorrect)) {
			let metrics = new Metrics(totalTyped, totalCorrect);

			this.setState({
				metrics: metrics
			});
		}
	}

	render() {
		return (
			<div className={this.props.classes.container}>
				<header>
					<a href={"https://github.com/portersherman/better_wpm"} target={"_blank"} rel={"noopener noreferrer"}>
						<img src={"/logo.png"} id={"logo"} alt={"logo"}/>
					</a>
					<h1>Better WPM</h1>
					<div className={this.props.classes.clickable} onClick={() => this.reset()}>
						<img src={"/refresh.png"} alt={"refresh the word list"} />
					</div>
					<div className={this.props.classes.clickable} onClick={() => this.togglePreferences()}>
						<img src={"/pref.png"} alt={"open preferences"}/>
					</div>
					{ this.state.preferencesOpen &&
						<Fragment>
							{[100, 50, 25].map(n => (
								<div key={n} className={this.props.classes.clickable} onClick={() => {
									this.setState({ textLength: n }, this.reset);
								}}>
									<p className={this.state.textLength === n ? "correct" : null}>{n}</p>
								</div>
							))}
						</Fragment>
					}
				</header>
				<section id={"evaluation"}>
					<div id={"paragraphContainer"}>
						{this.state.words.map(word => word.toHTML())}
						<p className={this.state.complete ? "correct" : "neutral"}>⏎</p>
					</div>
					<div id={"legendContainer"}>
						<p className={"neutral"}>untyped</p>
						<p className={"correct"}>correct</p>
						<p className={"incorrect"}>incorrect</p>
						<p className={"extra"}>extra</p>
					</div>
					<div id={"scoreContainer"}>
						<h1>
							{this.state.metrics.getScore(this.state.millis / 1000)}
						</h1>
						<p>words per minute</p>
					</div>
				</section>
				<section id={"metrics"}>
					<div className={"metricContainer"}>
						<p className={"neutral"}>characters typed</p>
						<h2 className={"neutral"}>{this.state.metrics.getTotalTyped()}</h2>
					</div>
					<div className={"metricContainer"}>
						<p className={"correct"}>correct</p>
						<h2 className={"correct"}>{this.state.metrics.getTotalCorrect()}</h2>
					</div>
					<div className={"metricContainer"}>
						<p className={"incorrect"}>incorrect</p>
						<h2 className={"incorrect"}>{this.state.metrics.getTotalIncorrect()}</h2>
					</div>
					<div className={"metricContainer"}>
						<p>accuracy</p>
						<h2>{Math.floor(this.state.metrics.getAccuracy() * 100) + "%"}</h2>
					</div>
				</section>
				<footer>
					<p>&copy; Porter Sherman 2022</p>
				</footer>
			</div>
		);
	}
}

const StyledApp = injectSheet(styles)(App);

export default StyledApp;
