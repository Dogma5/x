const getFlag = (flags, index) => {
	const matchingFlags = [];

	for (const [key, value] of Object.entries(flags)) {
		if (value.includes(index)) {
			matchingFlags.push(key);
		}
	}

	return matchingFlags;
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

const loadAsset = async ({id, path, spriteWidth, spriteHeight, tiles, flags}) => {
	const image = await loadImage(path);
	const imageWidth = image.width;
	const imageHeight = image.height;

	const asset = {};
	asset[id] = {
		image,
		imageWidth,
		imageHeight,
		spriteWidth,
		spriteHeight,
		sprites: []
	};

	let i = 0;
	for (let row = 0; row < (imageHeight / spriteWidth); row++) {
		for (let column = 0; column < (imageWidth / spriteHeight); column++) {
			asset[id].sprites.push({
				cropX: (column * spriteWidth) % imageWidth,
				cropY: (row * spriteHeight) % imageHeight,
				flags: flags ? getFlag(flags, i) : []
			});
			i++;
		}
	}

	return asset;
};

export const loadAssets = async assetData => {
	const loadedAssets = Object
		.keys(assetData)
		.map(id => loadAsset({id, ...assetData[id]}));
	const assets = await Promise.all(loadedAssets);
	return Object.assign({}, ...assets);
};
