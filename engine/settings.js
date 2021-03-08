import {loadAssets} from './assets.js';

const settings = {
	assets: {},
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
	update: () => {},
	loadAssets: spriteData => loadAssets(spriteData)
};

export default settings;
