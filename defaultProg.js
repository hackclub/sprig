export const defaultProg = `
const canvas = document.querySelector(".game-canvas");

const e = new Engine(canvas, 300, 300);

e.add({
	tags: ["player"],
	solid: true,
	x: 50,
	y: 50,
	// sprite: sprite_jeb,
	// scale: 2,
	draw: (obj) => {
		if (e.heldKey("ArrowLeft")) obj.x -= 3;
		if (e.heldKey("ArrowRight")) obj.x += 3;
	},
})

e.start();







`