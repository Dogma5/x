import xe from '@x/engine';

import playerImagePath from './src/sprites/player.png';
import dungeonImagePath from './src/sprites/dungeon.png';
import {dungeonMap} from './src/maps/index.js';
import {startGame} from './src/index.js';

(async () => {
	const options = {};
	xe.setup(options);
	await xe.loadSprite({
		id: 'player',
		path: playerImagePath,
		spriteWidth: 16,
		spriteHeight: 16,
		flags: {
			'0-0': ['collide']
		}
	});

	await xe.loadSprite({
		id: 'dungeon',
		path: dungeonImagePath,
		spriteWidth: 16,
		spriteHeight: 16,
		flags: {
			'0-7': ['collide'],
			'0-8': ['collide'],
			'0-9': ['collide'],
			'0-10': ['collide'],
			'1-11': ['collide'],
			'1-12': ['collide'],
			'1-13': ['collide'],
			'1-14': ['collide'],
			'1-15': ['collide'],
			'1-16': ['collide'],
			'1-17': ['collide'],
			'1-18': ['collide'],
			'1-19': ['collide'],
			'1-20': ['collide'],
			'2-21': ['collide'],
			'2-22': ['collide'],
			'2-23': ['collide'],
			'2-24': ['collide'],
			'2-2': ['collide']
		}
	});

	xe.maps.dungeon = {
		tiles: dungeonMap,
		asset: 'dungeon'
	};
	startGame();
})();
