class Keyboard {
	private KEYMAP: { [key: string]: number } = {
		'1': 0x1,
		'2': 0x2,
		'3': 0x3,
		'4': 0xc,
		q: 0x4,
		w: 0x5,
		e: 0x6,
		r: 0xd,
		a: 0x7,
		s: 0x8,
		d: 0x9,
		f: 0xe,
		z: 0xa,
		x: 0x0,
		c: 0xb,
		v: 0xf
	};
	private keysPressed: boolean[] = [];

	constructor() {
		window.addEventListener('keydown', this.onKeyDown.bind(this), false);
		window.addEventListener('keyup', this.onKeyUp.bind(this), false);
	}

	isKeyPressed(key: number): boolean {
		return this.keysPressed[key];
	}

	onKeyDown(event: KeyboardEvent) {
		const key = this.KEYMAP[event.key];
		this.keysPressed[key] = true;

		if (this.onNextKeyPress && key) {
			this.onNextKeyPress(key);
			this.onNextKeyPress = null;
		}
	}

	onKeyUp(event: KeyboardEvent) {
		const key = this.KEYMAP[event.key];
		this.keysPressed[key] = false;
	}

	onNextKeyPress: Function | null = null;
}

export default Keyboard;
