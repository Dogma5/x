export function update(callback) {
	requestAnimationFrame(() => {
		callback();
		update(callback);
	});
}

export function draw() {
	return 'whuu';
}

export function clearScreen() {
	console.log('clear');
}

export function init({
	width = 800,
	height = 600,
	background = '#111',
	responsive = false,
	pageBackground = '#000',
	id = 'game'
}) {
	const canvas = document.createElement('canvas');
	canvas.id = id;
	canvas.width = width;
	canvas.height = height;
	canvas.style.background = background;

	if (responsive) {
		canvas.style.maxWidth = '100%';
		canvas.style.maxHeight = '100%';
	}

	document.body.style.background = pageBackground;
	document.body.append(canvas);
}
