const canvas = document.createElement('canvas');
const context = canvas.getContext('2d', {
	desynchronized: true,
	alpha: false
});

function setPixel(x, y, color) {
	context.fillStyle = color;
	context.fillRect(x, y, 1, 1);
}

function setMap(x, y, backgroundColor) {
	context.fillStyle = backgroundColor;
	context.fillRect(x, y, canvas.width, canvas.height);
}

function createSprite(path, width, height) {
	const img = new Image();
	img.src = path;
	return {img, width, height};
}

function setSprite(x, y, sprite, spriteIndex) {
	const {img, width, height} = sprite;
	const cropX = ((spriteIndex * width) % img.width);
	const cropY = Math.trunc(spriteIndex * width / img.width) * height;
	context.drawImage(img, cropX, cropY, width, height, x, y, width, height);
}

function clearScreen() {
	context.clearRect(0, 0, canvas.width, canvas.height);
}

const btn = {
	ArrowUp: false,
	ArrowLeft: false,
	ArrowDown: false,
	ArrowRight: false,
	Space: false,
	Enter: false,
	Escape: false
};

const updatePressed = (eventCode, isPressed) => {
	if (eventCode in btn) {
		btn[eventCode] = isPressed;
	}
};

function gameLoop(update, draw) {
	requestAnimationFrame(() => {
		update();
		draw();
		gameLoop(update, draw);
	});
}

function engine(options, update, draw) {
	const {
		width = 800,
		height = 600,
		responsive = true,
		pageBackground = '#000',
		id = 'game',
		background
	} = options;

	canvas.id = id;
	canvas.width = width;
	canvas.height = height;
	canvas.style.background = background;

	canvas.style.imageRendering = 'crisp-edges';
	canvas.style.imageRendering = 'pixelated';
	canvas.style.width = `${width * 4}px`;
	canvas.style.height = `${height * 4}px`;

	if (responsive) {
		canvas.style.maxWidth = '100%';
		canvas.style.maxHeight = '100%';
		canvas.style.height = 'auto';
	}

	document.body.style.background = pageBackground;
	document.body.append(canvas);

	document.addEventListener('keydown', event => updatePressed(event.code, true));
	document.addEventListener('keyup', event => updatePressed(event.code, false));

	gameLoop(update, draw);
}

export {
	engine,
	btn,
	clearScreen,
	setPixel,
	setSprite,
	setMap,
	createSprite
};
