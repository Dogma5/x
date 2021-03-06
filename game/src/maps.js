const dungeonTiles = [
	[[12, true], 9, 10, 11, 9, 10, 11, 9, 10, 11, 12],
	[[13, true], 1, 1, 1, 3, 2, 2, 1, 1, 0, 13],
	[[22, true], 1, 0, 1, 2, 3, 3, 1, 1, 1, 22],
	[[21, true], 20, 19, [18, true], 4, 5, 6, 18, 19, 20, 21],
	[[22, true], 14, 15, 15, 2, 3, 3, 15, 15, 14, 22],
	[[13, true], 14, 15, 14, 3, 3, 3, 14, 15, 14, 13],
	[[22, true], 14, 14, 15, 2, 2, 3, 15, 14, 14, 22]
];

const maps = {
	dungeon: {
		assetId: 'dungeon',
		spriteWidth: 16,
		spriteHeight: 16,
		tiles: dungeonTiles
	}
};

export default maps;
