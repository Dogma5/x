
import settings from './settings.js';

const xe = settings;

const getTileData = tile => {
	const [
		tileIndex,
		xFlipped = false,
		yFlipped = false
	] = typeof tile === 'number' ? [tile] : tile;

	return [tileIndex, xFlipped, yFlipped];
};

xe.gameLoop = () => {
	requestAnimationFrame(() => {
		xe.update();
		xe.draw();
		xe.gameLoop();
	});
};

xe.clearScreen = () => {
	const canvasHeight = xe.gameHeight * xe.canvasScale;
	const canvasWidth = xe.gameWidth * xe.canvasScale;
	xe.context.clearRect(0, 0, canvasHeight, canvasWidth);
};

xe.setPixel = (x, y, color) => {
	xe.context.fillStyle = color;
	xe.context.fillRect(x, y, 1, 1);
};

xe.getTile = (x, y) => {
	const {spriteWidth, spriteHeight, sprites} = xe.assets[xe.currentMap];
	const {tiles} = xe.maps[xe.currentMap];

	const tileX = Math.floor(x / spriteWidth);
	const tileY = Math.floor(y / spriteHeight);

	if (tiles[tileY] === undefined || tiles[tileY][tileX] === undefined) {
		return null;
	}

	const [tileIndex] = getTileData(tiles[tileY][tileX]);

	return {
		id: tileIndex,
		flags: sprites[tileIndex].flags
	};
};

// To do, add rotation
xe.setSprite = ({id, sprite, x, y, xFlipped, yFlipped}) => {
	const {cropX, cropY} = sprite;
	const {image, spriteWidth, spriteHeight} = xe.assets[id];
	xe.context.save();

	const xTransform = xFlipped ? -1 : 1;
	const yTransform = yFlipped ? -1 : 1;
	if (xFlipped || yFlipped) {
		xe.context.translate(spriteWidth, 0);
		xe.context.scale(xTransform, yTransform);
	}

	xe.context.drawImage(
		image,
		cropX,
		cropY,
		spriteWidth,
		spriteHeight,
		x * xTransform,
		y * yTransform,
		spriteWidth,
		spriteHeight
	);

	xe.context.restore();
};

/**
 * Set the map on the canvas
 *
 * @param {number} x - X location to start rendering the map
 * @param {number} y - Y location to start rendering the map
 * @param {String} id - The map
 */
xe.setMap = (x, y, id) => {
	const {assetId} = xe.maps[id];
	xe.currentMap = assetId;

	for (const [row, rowTiles] of xe.maps[id].tiles.entries()) {
		for (const [column, tile] of rowTiles.entries()) {
			const [tileIndex, xFlipped, yFlipped] = getTileData(tile);
			const {spriteWidth, spriteHeight, sprites} = xe.assets[assetId];
			const sprite = sprites[tileIndex];

			xe.setSprite({
				id,
				x: (column * spriteWidth) + x,
				y: (row * spriteHeight) + y,
				sprite,
				xFlipped,
				yFlipped
			});
		}
	}
};

xe.setup = (options = {}) => {
	const {
		gameWidth = xe.gameWidth,
		gameHeight = xe.gameHeight,
		canvasScale = xe.canvasScale,
		responsive = true,
		pageBackground = '#111',
		id = 'game'
	} = options;
	xe.gameWidth = gameWidth;
	xe.gameHeight = gameHeight;
	xe.canvasScale = canvasScale;

	xe.canvas.id = id;
	xe.canvas.width = xe.gameWidth;
	xe.canvas.height = xe.gameHeight;

	xe.canvas.style.imageRendering = 'crisp-edges';
	xe.canvas.style.imageRendering = 'pixelated';
	xe.canvas.style.width = `${xe.gameWidth * xe.canvasScale}px`;
	xe.canvas.style.height = `${xe.gameHeight * xe.canvasScale}px`;

	if (responsive) {
		xe.canvas.style.maxWidth = '100%';
		xe.canvas.style.maxHeight = '100%';
		xe.canvas.style.height = 'auto';
	}

	document.body.style.background = pageBackground;
	document.body.append(xe.canvas);

	xe.context = xe.canvas.getContext('2d', {
		desynchronized: true,
		alpha: false
	});

	const updatePressed = (eventCode, isPressed) => {
		if (eventCode in xe.btn) {
			xe.btn[eventCode] = isPressed;
		}
	};

	document.addEventListener('keydown', event => updatePressed(event.code, true));
	document.addEventListener('keyup', event => updatePressed(event.code, false));
};

export default xe;
