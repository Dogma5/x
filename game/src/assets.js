import playerImagePath from '../assets/player.png';
import dungeonImagePath from '../assets/dungeon.png';

const assets = {
	player: {
		path: playerImagePath,
		spriteWidth: 16,
		spriteHeight: 16
	},
	dungeon: {
		path: dungeonImagePath,
		spriteWidth: 16,
		spriteHeight: 16,
		flags: {
			collide: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
		}
	}
};

export default assets;
