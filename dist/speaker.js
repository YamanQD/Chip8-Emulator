var Speaker = /** @class */ (function () {
    function Speaker() {
        this.AudioContext = window.AudioContext;
        this.audioCtx = new this.AudioContext();
        this.gain = this.audioCtx.createGain();
        this.destination = this.audioCtx.destination;
        this.oscillator = null;
        this.gain.connect(this.destination);
    }
    Speaker.prototype.play = function (frequency) {
        if (!this.oscillator) {
            this.oscillator = this.audioCtx.createOscillator();
            this.oscillator.frequency.setValueAtTime(frequency || 440, this.audioCtx.currentTime);
            this.oscillator.type = 'square';
            this.oscillator.connect(this.gain);
            this.oscillator.start();
        }
    };
    Speaker.prototype.stop = function () {
        if (this.oscillator) {
            this.oscillator.stop();
            this.oscillator.disconnect();
            this.oscillator = null;
        }
    };
    return Speaker;
}());
export default Speaker;
