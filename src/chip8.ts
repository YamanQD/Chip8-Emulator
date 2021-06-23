import Renderer from './renderer.js';

const renderer = new Renderer(20);

let loop;

let fps = 60,
	fpsInterval: number,
	now: number,
	then: number,
	startTime: number,
	elapsed: number;

function init() {
	fpsInterval = 1000 / fps;
	startTime = Date.now();
	then = startTime;

	// THIS PIECE OF CODE IS FOR TESTING PURPOSES, DELETE WHEN DONE TESTING
	renderer.testRenderer();
	renderer.render();
	// TEST CODE END

	loop = requestAnimationFrame(step);
}

function step() {
	now = Date.now();
	elapsed = now - then;

	if (elapsed > fpsInterval) {
		// Cycle the CPU
	}

	loop = requestAnimationFrame(step);
}

init();
