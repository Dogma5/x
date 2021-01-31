import xe from '../engine/index.js';

import playerImagePath from './sprites/player.png';
import dungeonImagePath from './sprites/dungeon.png';
import {startGame} from './start-game.js';

(async () => {
	const options = {};
	xe.setup(options);
	await xe.loadSprites(playerImagePath, 16, 16);
	await xe.loadSprites(dungeonImagePath, 16, 16);
	startGame();
})();
