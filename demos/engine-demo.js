const output = document.querySelector(".game-output");
output.innerHTML = `<canvas></canvas>`;
const canvas = document.querySelector("canvas");
const { width, height } = output.getBoundingClientRect();
canvas.width = width;
canvas.height = height;

const e = new Engine(canvas);
const ctx = e.ctx;

e.add({
  tags: ["player"],
  solid: true,
  x: 50,
  y: 50,
  // sprite: name,
  // scale: 1,
  draw: (obj) => {
    ctx.fillStyle = "blue";
    ctx.fillRect(obj.x, obj.y, 20, 20);
    // obj.scale(3);
    // obj.rotate(90);

    obj.ay = 0.4;

    e.get("platform").forEach((x) => {
      if (obj.collides(x, { bottom: 3 })) obj.vx = x.vx;
    });

    if (e.heldKey("ArrowLeft")) obj.x -= 3;
    if (e.heldKey("ArrowRight")) obj.x += 3;
  },
});

const addPlatform = (x, y) =>
  e.add({
    tags: ["platform"],
    solid: true,
    x: x,
    y: y,
    vx: -1,
    draw: (obj) => {
      ctx.fillStyle = "green";
      ctx.fillRect(obj.x, obj.y, 100, 20);

      if (obj.x < 0) obj.vx = 1;
      if (obj.x + obj.width > e.width) obj.vx = -1;
    },
  });

addPlatform(50, 200);
addPlatform(20, 100);

e.start();
