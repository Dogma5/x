import xe from '../snowpack/link/x/engine/index.js';
import {dungeonMap} from './maps/index.js';

const {gameWidth, gameHeight} = xe;
const animationDelay = 15;
const spriteSize = 16;

let currentAnimationDelay = animationDelay;
let currentPlayerSprite = 0;
let isSpriteSwap = false;
let playerXFlipped = false;
let playerX = (gameWidth / 2) - (spriteSize / 2);
let playerY = (gameHeight / 2) - (spriteSize / 2);

xe.draw = () => {
	xe.clearScreen();
	xe.setMap(0, 0, dungeonMap, xe.sprites.dungeon);
	xe.setSprite({
		x: playerX,
		y: playerY,
		sprite: xe.sprites.player[currentPlayerSprite],
		xFlipped: playerXFlipped
	});
};

xe.update = () => {
	const {ArrowUp, ArrowRight, ArrowDown, ArrowLeft} = xe.btn;
	const isMoving = ArrowUp || ArrowRight || ArrowDown || ArrowLeft;
	let xSpeed = 0;
	let ySpeed = 0;

	playerXFlipped = false;
	currentPlayerSprite = 0;
	currentAnimationDelay -= 1;
	if (currentAnimationDelay < 0) {
		currentAnimationDelay = animationDelay;
		isSpriteSwap = !isSpriteSwap;
	}

	if (ArrowUp) {
		ySpeed = -1;
		currentPlayerSprite = 9;
	}

	if (ArrowRight) {
		xSpeed = 1;
		currentPlayerSprite = 18;
	}

	if (ArrowDown) {
		ySpeed = 1;
		currentPlayerSprite = 0;
	}

	if (ArrowLeft) {
		xSpeed = -1;
		currentPlayerSprite = 18;
		playerXFlipped = true;
	}

	currentPlayerSprite = currentPlayerSprite + (isMoving ? 2 : 0) + (isSpriteSwap ? 1 : 0);
	playerX += xSpeed;
	playerY += ySpeed;
};

function startGame() {
	xe.gameLoop();
}

export {startGame};
