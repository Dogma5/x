/*
 *
 * index.js
 *
 * The place where all the magic happens
 *
 */


// Dependencies
import Kontra   from './kontra';
import Assets   from './assets';
import Sprites  from './sprites';
import SETTINGS from './settings';


// Start Kontra
Kontra.init();


// Set the paths to load assets from
Kontra.assets.imagePath = SETTINGS.get().assetPaths.images;


// Load the assets
Kontra.assets.load( ...Assets )
	.then( () => {

			// Create the character spritesheet
			let Character = Kontra.spriteSheet({
				image: Kontra.assets.images[ 'character' ],
				frameWidth: SETTINGS.get().tileSize,
				frameHeight: SETTINGS.get().tileSize,

				// this will also call createAnimations()
				animations: {}
			});


			// Create the different animations
			Character.createAnimations( Sprites.character );


			// Create a game loop
			let loop = Kontra.gameLoop({
				update: () => {
					Character.animations.idleDown.update();
				},
				render: () => {
					Character.animations.idleDown.render({
						x: 16, y: 16,
					});
				}
			});


			// Start the game loop
			loop.start();
	})
	.catch( error => console.error( error ) );

