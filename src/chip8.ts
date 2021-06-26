import Renderer from './renderer.js';
import Keyboard from './keyboard.js';
import Speaker from './speaker.js';
import CPU from './cpu.js';

const renderer = new Renderer(15);
const keyboard = new Keyboard();
const speaker = new Speaker();
const cpu = new CPU(renderer, keyboard, speaker);

let loop: number;

let fps = 60,
	fpsInterval: number,
	now: number,
	then: number,
	startTime: number,
	elapsed: number;

export function init(rom: string) {
	fpsInterval = 1000 / fps;
	startTime = Date.now();
	then = startTime;

	cpu.loadSpritesIntoMemory();
	cpu.loadRom(rom);
	loop = requestAnimationFrame(step);
}

function step() {
	now = Date.now();
	elapsed = now - then;

	if (elapsed > fpsInterval) {
		cpu.cycle();
	}

	loop = requestAnimationFrame(step);
}