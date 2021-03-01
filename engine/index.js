const xe = {
	assets: {},
	maps: {},
	currentMap: null,
	canvas: document.createElement('canvas'),
	canvasScale: 4,
	btn: {
		ArrowUp: false,
		ArrowLeft: false,
		ArrowDown: false,
		ArrowRight: false,
		Space: false,
		Enter: false,
		Escape: false
	},
	gameWidth: 176,
	gameHeight: 112,
	draw: () => {},
	update: () => {}
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

xe.mapGet = (x, y) => {
	// Return currentMap[x][y];
	return 'a';
};

// To do, add rotation
xe.setSprite = ({id, sprite, x, y, xFlipped, yFlipped}) => {
	const {cropX, cropY, width, height} = sprite;
	xe.context.save();

	const xTransform = xFlipped ? -1 : 1;
	const yTransform = yFlipped ? -1 : 1;
	if (xFlipped || yFlipped) {
		xe.context.translate(width, 0);
		xe.context.scale(xTransform, yTransform);
	}

	xe.context.drawImage(
		xe.assets[id].image,
		cropX,
		cropY,
		width,
		height,
		x * xTransform,
		y * yTransform,
		width,
		height
	);

	xe.context.restore();
};

/**
 * Set the map on the canvas
 *
 * @param {number} x - X location to start rendering the map
 * @param {number} y - Y location to start rendering the map
 * @param {String} mapKey - The map
 */
xe.setMap = (x, y, mapKey) => {
	for (const [column, columnTiles] of xe.maps[mapKey].tiles.entries()) {
		for (const [row, tile] of columnTiles.entries()) {
			const [
				tileIndex,
				xFlipped = false,
				yFlipped = false
			] = typeof tile === 'number' ? [tile] : tile;
			const sprite = xe.assets[xe.maps[mapKey].asset].sprites[tileIndex];

			xe.setSprite({
				id: mapKey,
				x: (row * sprite.height) + x,
				y: (column * sprite.width) + y,
				sprite,
				xFlipped,
				yFlipped
			});
		}
	}
};

xe.setup = options => {
	const {
		gameWidth,
		gameHeight,
		canvasScale,
		responsive = true,
		pageBackground = '#111',
		id = 'game'
	} = options;
	xe.gameWidth = gameWidth || xe.gameWidth;
	xe.gameHeight = gameHeight || xe.gameHeight;
	xe.canvasScale = canvasScale || xe.canvasScale;

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

const loadImage = async imagePath => {
	try {
		const image = new Image();
		image.src = imagePath;
		await image.decode();
		return image;
	} catch (error) {
		console.error(`Failed to load '${imagePath}'\n${error.message}`);
	}
};

const getFlags = (flags, row, column) => {
	const foundFlags = [];
	for (const flagTile of Object.keys(flags)) {
		const [flagRow, flagColumn] = flagTile.split('-');
		if (row === Number(flagRow) && column === Number(flagColumn)) {
			foundFlags.push(...flags[flagTile]);
		}
	}

	return foundFlags;
};

/**
 * Load the sprite into memory
 *
 * @param {string} spritePath - The current sprite image
 * @param {number} width - The width of each sprite
 * @param {number} height - The height of each sprite
 * @param {array} flags - The flags for each sprite
 */
xe.loadSprite = async ({id, path, spriteWidth, spriteHeight, flags}) => {
	const image = await loadImage(path);
	const imageWidth = image.width;
	const imageHeight = image.height;

	xe.assets[id] = {
		image,
		width: spriteWidth,
		height: spriteHeight,
		sprites: []
	};

	for (let column = 0; column < (imageWidth / spriteWidth); column++) {
		for (let row = 0; row < (imageHeight / spriteHeight); row++) {
			xe.assets[id].sprites.push({
				cropX: (column * spriteWidth) % imageWidth,
				cropY: (row * spriteHeight) % imageHeight,
				flags: getFlags(flags, row, column)
			});
		}
	}
};

export default xe;
