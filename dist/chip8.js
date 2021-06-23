import Renderer from './renderer.js';
import Keyboard from './keyboard.js';
var renderer = new Renderer(20);
var keyboard = new Keyboard();
var loop;
var fps = 60, fpsInterval, now, then, startTime, elapsed;
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
