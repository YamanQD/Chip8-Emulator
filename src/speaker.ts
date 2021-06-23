class Speaker {
	AudioContext = window.AudioContext;
	audioCtx = new this.AudioContext();
	gain = this.audioCtx.createGain();
	destination = this.audioCtx.destination;
	oscillator: OscillatorNode | null = null;

	constructor() {
		this.gain.connect(this.destination);
	}

	play(frequency: number) {
		if (!this.oscillator) {
			this.oscillator = this.audioCtx.createOscillator();

			this.oscillator.frequency.setValueAtTime(
				frequency || 440,
				this.audioCtx.currentTime
			);
			this.oscillator.type = 'square';

			this.oscillator.connect(this.gain);
			this.oscillator.start();
		}
	}

	stop() {
		if (this.oscillator) {
			this.oscillator.stop();
			this.oscillator.disconnect();
			this.oscillator = null;
		}
	}
}

export default Speaker;
