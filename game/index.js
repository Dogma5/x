import xe from '@x/engine';

import playerImagePath from './src/sprites/player.png';
import dungeonImagePath from './src/sprites/dungeon.png';
import {startGame} from './src/index.js';

(async () => {
	const options = {};
	xe.setup(options);
	await xe.loadSprites(playerImagePath, 16, 16, {});
	await xe.loadSprites(dungeonImagePath, 16, 16, {
		collide: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
	});
	startGame();
})();
