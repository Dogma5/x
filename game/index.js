import xe from '@x/engine';

import assets from './src/assets.js';
import maps from './src/maps.js';
import {draw, update} from './src/render.js';

(async () => {
	xe.setup();
	xe.assets = await xe.loadAssets(assets);
	xe.maps = maps;
	xe.currentMap = 'dungeon';

	xe.draw = () => draw();
	xe.update = () => update();

	xe.gameLoop();
})();
