export const defaultProg = `
const output = document.querySelector(".game-output");
output.innerHTML = \`<canvas></canvas>\`;
const canvas = document.querySelector("canvas");
const { width, height } = output.getBoundingClientRect();
canvas.width = width;
canvas.height = height;

const e = new Engine(canvas);

e.add({
  x: 30,
  y: 30,
    sprite: sprite_aht,
    scale: 1,
  draw: (obj) => {

  },
})

e.start();


`