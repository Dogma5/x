/*
 *
 * sprites.js
 *
 * Keeping our sprites in one location
 *
 */


// Local dependencies
import SETTINGS from './settings';


/**
 * Keeping our settings across multiple imports
 *
 * @type {Object}
 */
const Sprites = {
	character: {
		idleDown: {
			frames: '0..1',
			frameRate: SETTINGS.get().frameRate,
		},
		walkDown: {
			frames: '2..3',
			frameRate: SETTINGS.get().frameRate,
		},
		pushDown: {
			frames: '4..5',
			frameRate: SETTINGS.get().frameRate,
		},
		liftDown: {
			frames: [ 6 ],
			loop: false,
		},
		carryDown: {
			frames: '7..8',
			frameRate: SETTINGS.get().frameRate,
		},
		idleUp: {
			frames: '9..10',
			frameRate: SETTINGS.get().frameRate,
		},
		walkUp: {
			frames: '11..12',
			frameRate: SETTINGS.get().frameRate,
		},
		pushUp: {
			frames: '13..14',
			frameRate: SETTINGS.get().frameRate,
		},
		liftUp: {
			frames: [ 15 ],
			loop: false,
		},
		carryUp: {
			frames: '16..17',
			frameRate: SETTINGS.get().frameRate,
		},
		idleRight: {
			frames: '18..19',
			frameRate: SETTINGS.get().frameRate,
		},
		walkRight: {
			frames: '20..21',
			frameRate: SETTINGS.get().frameRate,
		},
		pushRight: {
			frames: '22..23',
			frameRate: SETTINGS.get().frameRate,
		},
		liftRight: {
			frames: [ 24 ],
			loop: false,
		},
		carryRight: {
			frames: '25..26',
			frameRate: SETTINGS.get().frameRate,
		},
		idleLeft: {
			frames: '27..28',
			frameRate: SETTINGS.get().frameRate,
		},
		walkLeft: {
			frames: '29..30',
			frameRate: SETTINGS.get().frameRate,
		},
		pushLeft: {
			frames: '31..32',
			frameRate: SETTINGS.get().frameRate,
		},
		liftLeft: {
			frames: [ 33 ],
			loop: false,
		},
		carryLeft: {
			frames: '34..35',
			frameRate: SETTINGS.get().frameRate,
		},
	}
};


export default Sprites;
