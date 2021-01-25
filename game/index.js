import {
	engine,
	clearScreen,
	btn,
	setSprite,
	setMap,
	createSprite
} from '../engine/index.js';

const gameWidth = 200;
const gameHeight = 120;

import playerSprite from './player.png';

let spriteIndex = 0;
let isSpriteSwap = false;
let isButtonDown = false;
const playerSize = 16;
const player = createSprite(playerSprite, playerSize, playerSize);

let playerX = (gameWidth / 2) - (playerSize / 2);
let playerY = (gameHeight / 2) - (playerSize / 2);

function draw() {
	clearScreen();
	const currentSprite = spriteIndex + (isButtonDown ? 2 : 0) + (isSpriteSwap ? 1 : 0);
	setMap(0, 0, '#FAD199');
	setSprite(playerX, playerY, player, currentSprite);
}

let frameCount = 0;
function update() {
	// Every 15 frames toggle the idle frame
	frameCount++;
	if (frameCount > 15) {
		frameCount = 0;
		isSpriteSwap = !isSpriteSwap;
	}

	isButtonDown = btn.ArrowUp || btn.ArrowRight || btn.ArrowDown || btn.ArrowLeft;

	if (btn.ArrowUp) {
		playerY -= 1;
		spriteIndex = 9;
	}

	if (btn.ArrowRight) {
		playerX += 1;
		spriteIndex = 18;
	}

	if (btn.ArrowDown) {
		playerY += 1;
		spriteIndex = 0;
	}

	if (btn.ArrowLeft) {
		playerX -= 1;
		spriteIndex = 27;
	}
}

engine({width: gameWidth, height: gameHeight, background: '#FAD199'}, update, draw);
