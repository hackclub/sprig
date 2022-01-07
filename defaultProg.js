export const defaultProg = `
const canvas = document.querySelector(".game-canvas");

const e = new Engine(canvas, 364, 274);

e.add({
	tags: ["player"],
	solid: true,
	x: 50,
	y: -30,
	// sprite: sprite_jeb,
	// scale: 3,
	draw: (obj) => {
		obj.ay = 0.4;

		e.get("platform").forEach(x => {
			if (obj.collides(x, {bottom: 4})) obj.vx = x.vx;
		})

		if (e.heldKey("ArrowLeft")) obj.x -= 3;
		if (e.heldKey("ArrowRight")) obj.x += 3;
	},
})

const addPlatform = (x, y) => e.add({
	tags: ["platform"],
	solid: true,
	x: x,
	y: y,
	vx: -1,
	// sprite: sprite_awv,
	// scale: 8,
	draw: (obj) => {
		if (obj.x < 0) obj.vx = 1;
		if (obj.x + obj.width > e.width) obj.vx = -1
	},
})

addPlatform(59, 200);
addPlatform(58, 119);

e.start();







`