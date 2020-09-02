import React, { Component, Fragment } from "react"
import Metrics from "./util/Metrics";
import Word from "./util/Word";
import './App.scss';

import getRandomWords from "random-words";

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			words: [],
			millis: 0,
			metrics: new Metrics(0, 0)
		}

		this.expectedText = this.getExpectedText();
		this.actualText = [];
		this.inputBuffer = [];
		
		this.timer = undefined;
	}

	getExpectedText = () => {
		if (this.timer) {
			window.clearInterval(this.timer);
		}
		return getRandomWords(100);
	}

	componentDidMount () {
		window.addEventListener("keydown", event => {
			this.processKey(event.which || event.keyCode, event.key);
		});

		this.updateWords();
	}

	processKey(keyCode, keyAsString) {
		let prevInputBufferLength = this.inputBuffer.length;

		if (this.state.millis === 0) {
			this.timer = window.setInterval(() => {
				this.updateTimer();
				this.updateMetrics();
			}, 100);
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
		}
	}

	updateWords() {
		let words = [];

		this.expectedText.forEach((expected, index) => {
			let actual = index >= this.actualText.length ? "" : this.actualText[index];
			words.push(new Word(expected, actual, index));
		});

		this.setState({
			words: words,
		});
	}

	reset() {
		this.setState({ millis: 0 }, () => {
			this.expectedText = this.getExpectedText();
			this.actualText = [];
			this.inputBuffer = [];
			this.updateWords();
			this.updateMetrics();
		});
	}

	updateTimer() {
		this.setState({ millis: this.state.millis + 1 });
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
			<Fragment>
				<header>
					<img src={"/logo.png"} id={"logo"} alt={"logo"}/>
					<h1>Better WPM</h1>
					<div className={"clickable headerButton"} id={"pref"} onClick={() => this.reset()}>
						<img src={"/refresh.png"} alt={"refresh the word list"} />
					</div>
					{/*<div className={"clickable headerButton"}>*/}
					{/*	<img src={"/pref.png"} alt={"open preferences"}/>*/}
					{/*</div>*/}
				</header>
				<section id={"evaluation"}>
					<div id={"paragraphContainer"}>
						{this.state.words.map(word => word.toHTML())}
					</div>
					<div id={"legendContainer"}>
						<p className={"neutral"}>untyped</p>
						<p className={"correct"}>correct</p>
						<p className={"incorrect"}>incorrect</p>
						<p className={"extra"}>extra</p>
					</div>
					<div id={"scoreContainer"}>
						<h1>
							{this.state.metrics.getScore(this.state.millis / 10)}
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
					<p>&copy; Porter Sherman 2020</p>
				</footer>
			</Fragment>
		);
	}
}

export default App;
