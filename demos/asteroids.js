const canvas = document.querySelector(".game-canvas");

class Vec2 {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  mulf(f) {
    return new Vec2(this.x * f, this.y * f);
  }
  divf(f) {
    return new Vec2(this.x / f, this.y / f);
  }
  addf(f) {
    return new Vec2(this.x + f, this.y + f);
  }
  subf(f) {
    return new Vec2(this.x - f, this.y - f);
  }

  mul(o) {
    return new Vec2(this.x * o.x, this.y * o.y);
  }
  div(o) {
    return new Vec2(this.x / o.x, this.y / o.y);
  }
  add(o) {
    return new Vec2(this.x + o.x, this.y + o.y);
  }
  sub(o) {
    return new Vec2(this.x - o.x, this.y - o.y);
  }

  maxf(f) {
    return new Vec2(Math.max(f, this.x), Math.max(f, this.y));
  }
  minf(f) {
    return new Vec2(Math.min(f, this.x), Math.min(f, this.y));
  }

  dot(o) {
    return this.x * o.x + this.y * o.y;
  }
  mag() {
    return Math.sqrt(this.dot(this));
  }
  norm() {
    return this.divf(this.mag() || 1);
  }

  perp() {
    return new Vec2(this.y, -this.x);
  }

  toRot() {
    return Math.atan2(this.y, this.x);
  }
  static fromRot(rot) {
    return new Vec2(Math.cos(rot), Math.sin(rot)).perp();
  }
  static fromDeg(deg) {
    return this.fromRot((deg / 180) * Math.PI);
  }
}

const e = new Engine(canvas, 500, 600);
let gameOver = false;

const push = (obj, { x, y }, aco) => {
  (obj.x += x), (obj.y += y);
  (obj.vx += x * aco), (obj.vy += y * aco);
};

e.add({
  tags: ["player"],
  solid: true,
  x: 50,
  y: 50,
  sprite: sprite_qsr,
  rotate: (90 + 180) / 2,
  scale: 2,
  origin: [0.5, 0.5],
  draw(obj) {
    if (gameOver) return;

    if (e.heldKey("ArrowLeft")) obj.rotate -= 3;
    if (e.heldKey("ArrowRight")) obj.rotate += 3;
    if (e.heldKey("ArrowUp")) push(obj, Vec2.fromDeg(obj.rotate).mulf(4), 0.08);
    if (e.heldKey("ArrowDown"))
      push(obj, Vec2.fromDeg(obj.rotate).mulf(-4), 0.08);
    if (e.pressedKey(" ")) {
      // push(obj, Vec2.fromDeg(obj.rotate).mulf(-10), 0.6);
      const { x, y } = new Vec2(obj.x, obj.y).add(
        Vec2.fromDeg(obj.rotate).mulf(obj.height * 1.2)
      );
      e.add({
        tags: ["bullet"],
        solid: true,
        x,
        y,
        rotate: obj.rotate,
        sprite: sprite_tle,
        scale: 2,
        origin: [0.5, 0.5],
        draw(obj) {
          obj.speed = obj.speed ? obj.speed * 0.93 : 10;
          // if (obj.speed < 0.04) e.remove(obj);
          const { x, y } = Vec2.fromDeg(obj.rotate).mulf(obj.speed);
          // obj.x += x, obj.y += y;
        },
      });
    }
    obj.vx *= 0.93;
    obj.vy *= 0.93;
  },
  collide(me, them) {
    if (them.tags.includes("meteor"))
      e.remove(me), e.remove(them), (gameOver = true);
  },
});

e.start();
