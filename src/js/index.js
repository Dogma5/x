/*
 *
 * index.js
 *
 * The place where all the magic happens
 *
 */


// Dependencies
import Kontra from './_kontra';
import Assets from './assets';
import Sprites from './sprites';
import SETTINGS from './settings';


// Start Kontra
Kontra.init();


// Set the paths to load assets from
Kontra.assets.imagePath = SETTINGS.get().assetPaths.images;


// Load the assets
Kontra.assets.load( ...Assets )
	.then( () => {
		// Create the player spritesheet
		const playerSpriteSheet = Kontra.spriteSheet({
			image:       Kontra.assets.images.player,
			frameWidth:  SETTINGS.get().tileSize,
			frameHeight: SETTINGS.get().tileSize,

			// this will also call createAnimations()
			animations: Sprites.player,
		});

		const player = Kontra.sprite({
			x:          32,
			y:          32,
			animations: playerSpriteSheet.animations,
		});


		Kontra.keys.bind( 'up', () => {
			player.playAnimation( 'walkUp' );
			player.dy = -1;
			player.dx = 0;
		});

		Kontra.keys.bind( 'down', () => {
			player.playAnimation( 'walkDown' );
			player.dy = 1;
			player.dx = 0;
		});


		Kontra.keys.bind( 'left', () => {
			player.playAnimation( 'walkLeft' );
			player.dx = -1;
			player.dy = 0;
		});

		Kontra.keys.bind( 'right', () => {
			player.playAnimation( 'walkRight' );
			player.dx = 1;
			player.dy = 0;
		});

		// Create a game loop
		const loop = Kontra.gameLoop({
			update: () => {
				player.update();
			},
			render: () => {
				player.render();
			},
		});


		// Start the game loop
		loop.start();
	})
	.catch( error => console.error( error ) );
