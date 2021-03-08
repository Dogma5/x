import xe from '@x/engine';
import collision from './collision.js';

const {gameWidth, gameHeight} = xe;
const animationDelay = 15;
const spriteSize = 16;

const currentMap = 'dungeon';
let currentAnimationDelay = animationDelay;
let currentPlayerSprite = 0;
let isSpriteSwap = false;
let playerXFlipped = false;
let playerX = (gameWidth / 2) - (spriteSize / 2);
let playerY = (gameHeight / 2) - (spriteSize / 2);
const characterSpeed = 1;

export const update = () => {
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
		ySpeed = -1 * characterSpeed;
		currentPlayerSprite = 9;
	}

	if (ArrowRight) {
		xSpeed = characterSpeed;
		currentPlayerSprite = 18;
	}

	if (ArrowDown) {
		ySpeed = characterSpeed;
		currentPlayerSprite = 0;
	}

	if (ArrowLeft) {
		xSpeed = -1 * characterSpeed;
		currentPlayerSprite = 18;
		playerXFlipped = true;
	}

	const xCollision = collision(playerX + xSpeed, playerY, spriteSize, spriteSize);
	const yCollision = collision(playerX, playerY + ySpeed, spriteSize, spriteSize);

	playerX += xCollision ? 0 : xSpeed;
	playerY += yCollision ? 0 : ySpeed;

	currentPlayerSprite = currentPlayerSprite + (isMoving ? 2 : 0) + (isSpriteSwap ? 1 : 0);
};

export const draw = () => {
	xe.clearScreen();
	xe.setMap(0, 0, currentMap);
	xe.setSprite({
		id: 'player',
		x: playerX,
		y: playerY,
		sprite: xe.assets.player.sprites[currentPlayerSprite],
		xFlipped: playerXFlipped
	});
};
