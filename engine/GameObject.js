import { initSprite } from "./initSprite.js"; 
import { distanceTo } from "./distanceTo.js"; 

const VALID_PARAMS = [
  "x",
  "y",
  "vx",
  "vy",
  "tags",
  "sprite",
  "scale",
  "solid",
  "bounce",
  "origin",
  "props",
  "zIndex",
];

export class GameObject {
  constructor(params) {
    for (const k in params) {
      if (!VALID_PARAMS.includes(k)) {
        const msg = `Sprite's "${k}" set to "${params[k]}", but sprites don't have "${k}"s`;
        throw new Error(msg);
      }
    }

    this.tags = params.tags ?? [];

    this._sprite = null;
    this._width = null;
    this._height = null;
    this.sprite = params.sprite;

    this._scale = [1, 1];
    this.scale = params.scale;

    this.rotate = params.rotate ?? 0;

    this.origin = params.origin ?? [0, 0];

    this.x = params.x ?? 0;
    this.y = params.y ?? 0;
    this.x += Math.random() / 10;
    this.y += Math.random() / 10;
    this.lastX = this.x;
    this.lastY = this.y;

    this.zIndex = params.zIndex;
    this.vx = params.vx ?? 0;
    this.vy = params.vy ?? 0;
    this.bounce = params.bounce ?? 0;
    this.solid = params.solid ?? false;
    this.props = params.props ?? {};

    this.id = Math.random().toString(36).slice(2);
  }

  distanceTo(them) {
    return distanceTo(them, this);;
  }

  get sprite() {
    return this._sprite;
  }

  teleport(x, y) {
    this.lastX = this.x = x;
    this.lasty = this.y = y;
  }

  set sprite(spriteData) {
    // scaling doesn't work here
    initSprite(spriteData, this);
    // this.scale = this.scale;
  }

  hasTag(tag) {
    return this.tags.includes(tag);
  }

  get width() {
    return this._width * Math.abs(this.scale[0]);
  }

  get height() {
    return this._height * Math.abs(this.scale[1]);
  }

  get rotate() {
    return (this._rotate / Math.PI) * 180;
  }
  set rotate(x) {
    this._rotate = (x / 180) * Math.PI;
  }

  set scale(factor) {
    if (typeof factor === "number") this._scale = [factor, factor];
    if (Array.isArray(factor)) this._scale = factor;
  }

  get scale() {
    return this._scale;
  }

  draw(xDilation, yDilation, ctx) {
    const w = this.width;
    const h = this.height;
    ctx.save();
    const [ox, oy] = [w * this.origin[0], h * this.origin[1]];
    ctx.translate(this.x, this.y);
    ctx.rotate(this._rotate);

    const xInvert = this.scale[0] < 0 ? -1 : 1;
    const yInvert = this.scale[1] < 0 ? -1 : 1;
    ctx.scale(xInvert, yInvert);

    // draw sprite with sprite scale
    if (this.sprite !== null) ctx.drawImage(this.sprite, -ox, -oy, w, h);

    // if (Engine.show.origin) {
    //   ctx.fillStyle = "red";
    //   ctx.fillRect(-2, -2, 4, 4);
    // }

    ctx.restore();

    // if (Engine.show.hitbox) {
    //   ctx.strokeStyle = "grey";
    //   ctx.strokeRect(this.x - ox, this.y - oy, w, h);
    // }

  }
}