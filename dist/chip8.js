import Renderer from './renderer.js';
import Keyboard from './keyboard.js';
import Speaker from './speaker.js';
import CPU from './cpu.js';
var renderer = new Renderer(20);
var keyboard = new Keyboard();
var speaker = new Speaker();
var cpu = new CPU(renderer, keyboard, speaker);
var loop;
var fps = 60, fpsInterval, now, then, startTime, elapsed;
function init() {
    fpsInterval = 1000 / fps;
    startTime = Date.now();
    then = startTime;
    cpu.loadSpritesIntoMemory();
    cpu.loadRom('Tank.ch8');
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
init();
