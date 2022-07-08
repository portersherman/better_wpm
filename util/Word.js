import React from "react"

class Word {
	constructor (expected, actual, index) {
		this.expected = expected;
		this.actual = actual;
		this.index = index;

		let correctCount = 0;
		let incorrectCount = 0;

		for (let i = 0; i < this.actual.length; i++) {
			if (this.expected.charAt(i) === this.actual.charAt(i)) {
				correctCount++;
			} else {
				incorrectCount++;
			}
		}

		this.typedCount = incorrectCount + correctCount
		this.correctCount = correctCount;
	}

	getCorrectCount() {
		return this.correctCount;
	}

	getTypedCount() {
		return this.typedCount;
	}

	toHTML() {
		let elements = [];
		let correctBuffer = [];
		let incorrectBuffer = [];
		let total = 0;

		let i;
		for (i = 0; i < this.actual.length; i++) {
			if (this.expected.charAt(i) === this.actual.charAt(i)) {
				if (incorrectBuffer.length > 0) {
					elements.push(<p key={this.index + "-" + i} className={"incorrect"}>{incorrectBuffer.join("")}</p>);
					incorrectBuffer = [];
				}
				correctBuffer.push(this.expected.charAt(i));
				total++;
			} else {
				if (correctBuffer.length > 0) {
					elements.push(<p key={this.index + "-" + i} className={"correct"}>{correctBuffer.join("")}</p>);
					correctBuffer = [];
				}
				incorrectBuffer.push(this.expected.charAt(i));
				total++;
			}
		}

		if (correctBuffer.length > 0) {
			elements.push(<p key={this.index + "-" + i} className={"correct"}>{correctBuffer.join("")}</p>);
		}

		if (incorrectBuffer.length > 0) {
			elements.push(<p key={this.index + "-" + i} className={"incorrect"}>{incorrectBuffer.join("")}</p>);
		}

		elements.push(<p key={this.index + "-tail"} className={"neutral"}>{this.expected.substring(total, this.expected.length)}</p>)
		if (this.actual.length > this.expected.length) {
			elements.push(
				<p key={this.index + "-incorrectTail"} className={"extra"}>
					{this.actual.substring(this.expected.length, this.actual.length)}
				</p>
			)
		}
		elements.push(<p key={this.index + "-space"}> </p>)

		return elements;
	}
}

export default Word;