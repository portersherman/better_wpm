class Metrics {
	constructor(totalTyped, totalCorrect) {
		this.totalTyped = totalTyped;
		this.totalCorrect = totalCorrect;
	}

	getTotalTyped() {
		return this.totalTyped;
	}

	getTotalCorrect() {
		return this.totalCorrect;
	}

	getTotalIncorrect() {
		return this.totalTyped - this.totalCorrect;
	}

	getAccuracy() {
		if (this.totalTyped === 0) {
			return 0;
		}
		return this.totalCorrect / this.totalTyped;
	}

	getScore(timeTakenInSeconds) {
		if (timeTakenInSeconds === 0) {
			return 0;
		}
		return Math.floor(this.totalCorrect * 12 / timeTakenInSeconds);
	}

	shouldUpdate(totalTyped, totalCorrect) {
		return this.totalTyped !== totalTyped || this.totalCorrect !== totalCorrect;
	}

	toString() {
		return "totalTyped: " + this.getTotalTyped() + "\n" +
			"totalCorrect: " + this.getTotalCorrect() + "\n" +
			"totalIncorrect: " + this.getTotalIncorrect() + "\n" +
			"accuracy: " + this.getAccuracy() + "\n";

	}
}

export default Metrics;