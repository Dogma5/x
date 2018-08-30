kontra.init();

const tileSize = 16;

// The player character
let CharacterImage = new Image();
CharacterImage.src = 'assets/img/character/character.png';

CharacterImage.onload = () => {

	// use kontra.spriteSheet to create animations from an image
	const Character = kontra.spriteSheet({
		image: CharacterImage,
		frameWidth: tileSize,
		frameHeight: tileSize,
		animations: {
			// create a named animation: walk
			idleLeft: {
				frames: '0..1',  // frames 0 through 9
				frameRate: 4,
			}
		}
	});

	const CharacterSprite = kontra.sprite({
		x: ( kontra.canvas.width / 2 ) - tileSize / 2,
		y: ( kontra.canvas.height / 2 ) - tileSize / 2,

		// required for an animation sprite
		animations: Character.animations
	});

	StartGame( CharacterSprite );

};


const StartGame = ( sprite ) => {
	const Loop = kontra.gameLoop({
		update: ( dt ) => {
			sprite.update();
		},
		render: () => {
			sprite.render();
		}
	});

	Loop.start();
}

