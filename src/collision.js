import xe from '../snowpack/link/x/engine/index.js';

const collision = (x, y, width, height) => {
	const topLeft = xe.getTile(x, y);
	const topRight = xe.getTile(x + width, y);
	const bottomLeft = xe.getTile(x, y + height);
	const bottomRight = xe.getTile(x + height, y + width);

	const isTiles = topLeft && topRight && bottomLeft && bottomRight;
	// Do not move if there isn't any tiles that match
	if (!isTiles) {
		return true;
	}

	// Do not move if the flags have collide
	const tilesCollide =
		topLeft.flags.includes('collide') ||
		topRight.flags.includes('collide') ||
		bottomLeft.flags.includes('collide') ||
		bottomRight.flags.includes('collide');

	if (tilesCollide) {
		return true;
	}

	return false;
};

export default collision;
