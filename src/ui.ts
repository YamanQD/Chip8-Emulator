import { init } from './chip8.js'
const programs = [
	'BMP Viewer - Hello (C8 example) [Hap, 2005].ch8',
	'Chip8 Picture.ch8',
	'Chip8 emulator Logo [Garstyciuks].ch8',
	'Clock Program [Bill Fisher, 1981].ch8',
	'Delay Timer Test [Matthew Mikolay, 2010].ch8',
	'Division Test [Sergey Naydenov, 2010].ch8',
	'Fishie [Hap, 2005].ch8',
	'Framed MK1 [GV Samways, 1980].ch8',
	'Framed MK2 [GV Samways, 1980].ch8',
	'IBM Logo.ch8',
	'Jumping X and O [Harry Kleinberg, 1977].ch8',
	'Keypad Test [Hap, 2006].ch8',
	'Life [GV Samways, 1980].ch8',
	'Minimal game [Revival Studios, 2007].ch8',
	'Random Number Test [Matthew Mikolay, 2010].ch8',
	'SQRT Test [Sergey Naydenov, 2010].ch8'
]
const games = [
	'15 Puzzle [Roger Ivie] (alt).ch8',
	'15 Puzzle [Roger Ivie].ch8',
	'Addition Problems [Paul C. Moews].ch8',
	'Airplane.ch8',
	'Animal Race [Brian Astle].ch8',
	'Astro Dodge [Revival Studios, 2008].ch8',
	'Biorhythm [Jef Winsor].ch8',
	'Blinky [Hans Christian Egeberg, 1991].ch8',
	'Blinky [Hans Christian Egeberg] (alt).ch8',
	'Blitz [David Winter].ch8',
	'Bowling [Gooitzen van der Wal].ch8',
	'Breakout (Brix hack) [David Winter, 1997].ch8',
	'Breakout [Carmelo Cortez, 1979].ch8',
	'Brick (Brix hack, 1990).ch8',
	'Brix [Andreas Gustafsson, 1990].ch8',
	'Cave.ch8',
	'Coin Flipping [Carmelo Cortez, 1978].ch8',
	'Connect 4 [David Winter].ch8',
	'Craps [Camerlo Cortez, 1978].ch8',
	'Deflection [John Fort].ch8',
	'Figures.ch8',
	'Filter.ch8',
	'Guess [David Winter] (alt).ch8',
	'Guess [David Winter].ch8',
	'Hi-Lo [Jef Winsor, 1978].ch8',
	'Hidden [David Winter, 1996].ch8',
	'Kaleidoscope [Joseph Weisbecker, 1978].ch8',
	'Landing.ch8',
	'Lunar Lander (Udo Pernisz, 1979).ch8',
	'Mastermind FourRow (Robert Lindley, 1978).ch8',
	'Merlin [David Winter].ch8',
	'Missile [David Winter].ch8',
	'Most Dangerous Game [Peter Maruhnic].ch8',
	'Nim [Carmelo Cortez, 1978].ch8',
	'Paddles.ch8',
	'Pong (1 player).ch8',
	'Pong (alt).ch8',
	'Pong 2 (Pong hack) [David Winter, 1997].ch8',
	'Pong [Paul Vervalin, 1990].ch8',
	'Programmable Spacefighters [Jef Winsor].ch8',
	'Puzzle.ch8',
	'Reversi [Philip Baltzer].ch8',
	'Rocket Launch [Jonas Lindstedt].ch8',
	'Rocket Launcher.ch8',
	'Rocket [Joseph Weisbecker, 1978].ch8',
	'Rush Hour [Hap, 2006] (alt).ch8',
	'Rush Hour [Hap, 2006].ch8',
	'Russian Roulette [Carmelo Cortez, 1978].ch8',
	'Sequence Shoot [Joyce Weisbecker].ch8',
	'Shooting Stars [Philip Baltzer, 1978].ch8',
	'Slide [Joyce Weisbecker].ch8',
	'Soccer.ch8',
	'Space Flight.ch8',
	'Space Intercept [Joseph Weisbecker, 1978].ch8',
	'Space Invaders [David Winter] (alt).ch8',
	'Space Invaders [David Winter].ch8',
	'Spooky Spot [Joseph Weisbecker, 1978].ch8',
	'Squash [David Winter].ch8',
	'Submarine [Carmelo Cortez, 1978].ch8',
	'Sum Fun [Joyce Weisbecker].ch8',
	'Syzygy [Roy Trevino, 1990].ch8',
	'Tank.ch8',
	'Tapeworm [JDR, 1999].ch8',
	'Tetris [Fran Dachille, 1991].ch8',
	'Tic-Tac-Toe [David Winter].ch8',
	'Timebomb.ch8',
	'Tron.ch8',
	'UFO [Lutz V, 1992].ch8',
	'Vers [JMN, 1991].ch8',
	'Vertical Brix [Paul Robson, 1996].ch8',
	'Wall [David Winter].ch8',
	'Wipe Off [Joseph Weisbecker].ch8',
	'Worm V4 [RB-Revival Studios, 2007].ch8',
	'X-Mirror.ch8',
	'ZeroPong [zeroZshadow, 2007].ch8'
]
const demos = [
	'Maze (alt) [David Winter, 199x].ch8',
	'Maze [David Winter, 199x].ch8',
	'Particle Demo [zeroZshadow, 2008].ch8',
	'Sierpinski [Sergey Naydenov, 2010].ch8',
	'Sirpinski [Sergey Naydenov, 2010].ch8',
	'Stars [Sergey Naydenov, 2010].ch8',
	'Trip8 Demo (2008) [Revival Studios].ch8',
	'Zero Demo [zeroZshadow, 2007].ch8'
]

const genre = document.getElementById('genre') as HTMLSelectElement;
const roms = document.getElementById('roms') as HTMLSelectElement;
const description = document.getElementById('description')!;

// Get rom name from URL
const url_string = window.location.href;
const url = new URL(url_string);
const rom = url.searchParams.get("rom")!;

// Default rom
if (!rom) {
	location.replace('?rom=Chip8%20emulator%20Logo%20[Garstyciuks].ch8');
}

// Get the .txt description file of the rom
let request = new XMLHttpRequest();
request.onload = () => {
	if (!request.response.startsWith('<!DOCTYPE html>')) {
		description.innerHTML = request.response;
	}
}
request.open('GET', 'roms/' + rom.replace('.ch8', '.txt'));
request.responseType = 'text';
request.send();

// Load rom names into the html select element 
function changeOptions(genre: string) {
	switch (genre) {
		case 'games':
			roms.innerHTML = ''
			for (let i = 0; i < games.length; i++) {
				const option = document.createElement('option');
				option.textContent = games[i];
				option.value = games[i];
				if (option.value === rom) {
					option.selected = true;
				}
				roms.appendChild(option)
			}
			break;

		case 'programs':
			roms.innerHTML = ''
			for (let i = 0; i < programs.length; i++) {
				const option = document.createElement('option');
				option.textContent = programs[i];
				option.value = programs[i];
				if (option.value === rom) {
					option.selected = true;
				}
				roms.appendChild(option)
			}
			break;
		case 'demos':
			roms.innerHTML = ''
			for (let i = 0; i < demos.length; i++) {
				const option = document.createElement('option');
				option.textContent = demos[i];
				option.value = demos[i];
				if (option.value === rom) {
					option.selected = true;
				}
				roms.appendChild(option)
			}
			break;
	}
}

genre.addEventListener('change', (e) => {
	changeOptions(genre.value)
})

roms.addEventListener('change', (e) => {
	location.replace('?rom=' + roms.value.replace(' ', '%20'));
})

changeOptions('games'); // Default genre
init(rom);
