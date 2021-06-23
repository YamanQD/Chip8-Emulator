class Renderer {
	columns: number;
	rows: number;
	scale: number;

	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;

	display: number[];

	constructor(scale: number) {
		this.scale = scale;

		this.columns = 64;
		this.rows = 32;

		this.canvas = document.querySelector('canvas')!;
		this.ctx = this.canvas.getContext('2d')!;

		this.canvas.width = this.columns * this.scale;
		this.canvas.height = this.rows * this.scale;

		this.display = new Array(this.columns * this.rows);
	}

	setPixel(x: number, y: number): boolean {
		// If the pixel is out of screen bounds, wrap it around the opposite side
		if (x > this.columns) x -= this.columns;
		if (x < 0) x += this.columns;
		if (y > this.rows) x -= this.rows;
		if (y < 0) x += this.rows;

		const pixelLocation = x + y * this.columns;
		this.display[pixelLocation] ^= 1; // Toggle pixel

		return !this.display[pixelLocation]; //	Return true if a pixel was erased
	}

	clear() {
		this.display = new Array(this.columns * this.rows);
	}

	render() {
		// Clear canvas every render cycle
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		for (let i = 0; i < this.columns * this.rows; i++) {
			// Calculate the x and y positions
			const x = (i % this.columns) * this.scale;
			const y = Math.floor(i / this.columns) * this.scale;

			if (this.display[i]) {
				this.ctx.fillStyle = '#000';
				this.ctx.fillRect(x, y, this.scale, this.scale);
			}
		}
	}
}

export default Renderer;
