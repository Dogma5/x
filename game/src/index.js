import xe from '@x/engine';

const {gameWidth, gameHeight} = xe;
const animationDelay = 15;
const spriteSize = 16;

let currentAnimationDelay = animationDelay;
let currentPlayerSprite = 0;
let isSpriteSwap = false;
let playerXFlipped = false;
let playerX = (gameWidth / 2) - (spriteSize / 2);
let playerY = (gameHeight / 2) - (spriteSize / 2);
const characterSpeed = 1;
const currentMap = 'dungeon';

xe.draw = () => {
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

	const newPlayerX = playerX + xSpeed;
	const newPlayerY = playerY + ySpeed;
	playerX = between(newPlayerX, 0, gameWidth - spriteSize) ? newPlayerX : playerX;
	playerY = between(newPlayerY, 0, gameHeight - spriteSize) ? newPlayerY : playerY;

	// Const mapTile = xe.mapGet(newPlayerX, newPlayerY);

	// Update sprite
	currentPlayerSprite = currentPlayerSprite + (isMoving ? 2 : 0) + (isSpriteSwap ? 1 : 0);
};

function between(value, min, max) {
	return value >= min && value <= max;
}

function startGame() {
	xe.gameLoop();
}

export {startGame};
