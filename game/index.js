import {init, update, draw, clearScreen} from '../engine/index.js';

const options = {};

let x = 100;
let y = 100;

clearScreen();

init(options);

update(() => {
	x += 1;
	y += 1;
});

draw(() => {

});
