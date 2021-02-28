const xe = {
	assets: {},
	sprites: {},
	maps: {},
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

// Add rotation
xe.setSprite = ({x, y, sprite, xFlipped, yFlipped}) => {
	const {img, cropX, cropY, width, height} = sprite;
	xe.context.save();

	const xTransform = xFlipped ? -1 : 1;
	const yTransform = yFlipped ? -1 : 1;
	if (xFlipped || yFlipped) {
		xe.context.translate(width, 0);
		xe.context.scale(xTransform, yTransform);
	}

	xe.context.drawImage(
		img,
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

xe.setMap = (x, y, mapArray, sprite) => {
	let index = 0;
	for (const mapSprite of mapArray) {
		const [
			spriteIndex,
			xFlipped = false,
			yFlipped = false
		] = typeof mapSprite === 'number' ?
			[mapSprite] :
			mapSprite;
		const {width, height} = sprite[spriteIndex];
		const newX = (x + (width * index)) % xe.gameWidth;
		const newY = y + (Math.trunc(index * width / xe.gameWidth) * height);
		index += 1;

		xe.setSprite({
			x: newX,
			y: newY,
			sprite: sprite[spriteIndex],
			xFlipped,
			yFlipped
		});
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

const getAssetName = assetPath => {
	return assetPath.split('.')[0].split('/').slice(-1)[0];
};

const loadImage = async imagePath => {
	try {
		const img = new Image();
		img.src = imagePath;
		await img.decode();
		const imageName = getAssetName(imagePath);
		xe.assets[imageName] = img;
		return imageName;
	} catch (error) {
		console.error(`Failed to load '${imagePath}'\n${error.message}`);
	}
};

xe.loadAssets = async assets => {
	const loadImages = assets.map(asset => loadImage(asset));
	const assetNames = await Promise.all(loadImages);
	return assetNames;
};

xe.loadSprites = async (sprite, width, height, flags) => {
	const spriteName = await loadImage(sprite);
	const asset = xe.assets[spriteName];
	const assetWidth = asset.width;
	const assetHeight = asset.height;
	const totalSprites = assetWidth / width * assetHeight / height;

	xe.sprites[spriteName] = [];
	for (let i = 0; i < totalSprites; i++) {
		xe.sprites[spriteName].push({
			img: xe.assets[spriteName],
			width,
			height,
			cropX: ((i * width) % assetWidth),
			cropY: Math.trunc(i * width / assetWidth) * height,
			flags: []
		});

		for (const [key, value] of Object.entries(flags)) {
			if (value.includes(i)) {
				xe.sprites[spriteName][i].flags.push(key);
			}
		}
	}
};

export default xe;
