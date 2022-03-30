const getLimits = (obj, [dx, dy] = [0, 0]) => {
  const w = obj.width;
  const h = obj.height;
  const [ox, oy] = [w * obj.origin[0], h * obj.origin[1]];
  const x = obj.x + dx - ox;
  const y = obj.y + dy - oy;
  const xMin = x;
  const xMax = x + w;
  const yMin = y;
  const yMax = y + h;
  const xCenter = (x + x + w) / 2;
  const yCenter = (y + y + h) / 2;

  return {
    min: [xMin, yMin],
    max: [yMin, yMax],
    center: [xCenter, yCenter],
    xMin,
    xMax,
    yMin,
    yMax,
    xCenter,
    yCenter,
    width: w,
    height: h,
  };
};

function overlap(obj0, obj1, movement = [0, 0]) {
  const obj0Lims = getLimits(obj0, movement);
  const obj1Lims = getLimits(obj1);

  const x_overlap = Math.max(
    -Infinity,
    Math.min(obj0Lims.xMax, obj1Lims.xMax) -
      Math.max(obj0Lims.xMin, obj1Lims.xMin)
  );
  const y_overlap = Math.max(
    -Infinity,
    Math.min(obj0Lims.yMax, obj1Lims.yMax) -
      Math.max(obj0Lims.yMin, obj1Lims.yMin)
  );

  return [x_overlap, y_overlap];
}

function haveCollided(obj0, obj1, buffer = 0) {
  let left, right, bottom, top;
  if (typeof buffer === "object") {
    left = buffer.left ?? 0;
    right = buffer.right ?? 0;
    bottom = buffer.bottom ?? 0;
    top = buffer.top ?? 0;
  } else {
    left = buffer;
    right = buffer;
    bottom = buffer;
    top = buffer;
  }

  return (
    obj0.x < obj1.x + obj1.width + left &&
    obj0.x + obj0.width + right > obj1.x &&
    obj0.y < obj1.y + obj1.height + top &&
    obj0.height + obj0.y + bottom > obj1.y
  );
}

function is_overlapping_range(x1, x2, y1, y2) {
  return Math.max(x1, y1) <= Math.min(x2, y2);
}

function distanceTo(obj0, obj1) {
  // me is obj1, them is obj0

  let top = Infinity;
  let right = Infinity;
  let bottom = Infinity;
  let left = Infinity;

  // top is obj0 top - obj1 bottom if below and left and right are in bounds
  let x0 = obj0.x - obj0.origin[0] * obj0.width;
  let y0 = obj0.y - obj0.origin[1] * obj0.height;
  let x1 = obj1.x - obj1.origin[0] * obj1.width;
  let y1 = obj1.y - obj1.origin[1] * obj1.height;

  const overlapX = is_overlapping_range(
    x0,
    x0 + obj0.width,
    x1,
    x1 + obj1.width
  );
  const overlapY = is_overlapping_range(
    y0,
    y0 + obj0.height,
    y1,
    y1 + obj1.height
  );

  if (overlapX) {
    top = -(y0 + obj0.height - y1);
    bottom = -(y1 + obj1.height - y0);
  }

  if (overlapY) {
    left = -(x0 + obj0.width - x1);
    right = -(x1 + obj1.width - x0);
  }

  // if (left == 0 || right == 0) {
  //   if (left == 0) left = 0;
  //   if (right == 0) right = 0;
  //   top = Infinity;
  //   bottom = Infinity;
  // }

  // if (top == 0 || bottom == 0) {
  //   if (top == 0) top = 0;
  //   if (bottom == 0) bottom = 0;
  //   left = Infinity;
  //   right = Infinity;
  // }

  return { top, right, bottom, left };
}

function initSprite(spriteData, that) {
  if (typeof spriteData === "object") {
    const [w, h] = spriteData.size;

    that.imageData = new ImageData(
      new Uint8ClampedArray(spriteData.colors.flat()),
      w,
      h
    );

    const dx = spriteData.bounds.x;
    const dy = spriteData.bounds.y;
    that._width = spriteData.bounds.width;
    that._height = spriteData.bounds.height;

    that._sprite = document.createElement("canvas");
    that._sprite.width = that._width;
    that._sprite.height = that._height;
    that._sprite.getContext("2d").putImageData(that.imageData, -dx, -dy);
    if (that.initialized) that.draw();
  } else {
    that._sprite = null;
  }
}

const VALID_PARAMS = [
  "x",
  "y",
  "vx",
  "vy",
  "tags",
  "sprite",
  "scale",
  "rotate",
  "collides",
  "update",
  "solid",
  "bounce",
  "origin",
  "props",
  "fps",
  // not doced?
  "click",
];

class Object {
  constructor(params, engine) {
    for (const k in params) {
      if (!VALID_PARAMS.includes(k)) {
        const msg = `Sprite's "${k}" set to "${params[k]}", but sprites don't have "${k}"s`;
        throw new Error(msg);
      }
    }

    this.initialized = false;
    this.engine = engine;
    this.tags = params.tags ?? [];

    let bounds = { x: 0, y: 0, maxX: 16, maxY: 16, width: 16, height: 16 };

    this._sprite = null;
    this._width = null;
    this._height = null;
    this.sprite = params.sprite;

    this._scale = [1, 1];
    this.scale = params.scale;

    this.rotate = params.rotate ?? 0;

    // this.origin = params.origin || [0, 0];

    const origins = {
      "left top": [0, 0],
      "left center": [0, 0.5],
      "left bottom": [0, 1],
      "center top": [0.5, 0],
      "center center": [0.5, 0.5],
      center: [0.5, 0.5],
      "center bottom": [0.5, 1],
      "right top": [1, 0],
      "right center": [1, 0.5],
      "right bottom": [1, 1],
    };

    const origin = params.origin;
    this.origin =
      typeof origin === "string" && origin in origins
        ? origins[origin]
        : Array.isArray(origin)
        ? origin
        : [0, 0];

    this.x = params.x ?? 0;
    this.y = params.y ?? 0;
    this.x += Math.random() / 10;
    this.y += Math.random() / 10;
    this.lastX = this.x;
    this.lastY = this.y;

    this.vx = params.vx ?? 0;
    this.vy = params.vy ?? 0;
    this.bounce = params.bounce ?? 0;
    this.solid = params.solid ?? false;
    this.click = params.click ?? null;
    this.update = params.update ?? null;
    this.collides = params.collides ?? null;
    this.props = params.props ?? {};

    const fps = params.fps;
    if (fps != undefined) {
      this.updateInterval = setInterval(() => {
        if (this.engine.objects.indexOf(this) == -1)
          return clearInterval(this.updateInterval);
        this.update(this);
      }, 1000 / fps);
    }

    this.id = Math.random();
  }

  set fps(x) {
    throw new Error(
      "gamelab doesn't currently support changing the fps " +
        "while the game is running. if you need this, " +
        "file an issue on github.com/hackclub/game-lab. " +
        "We'd love to know what you're making!"
    );
  }

  distanceTo(them) {
    const dists = distanceTo(them, this);
    return dists;
  }

  overlap(them) {
    return overlap(this, them);
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

  draw() {
    const { ctx } = this.engine;
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

    if (Engine.show.origin) {
      ctx.fillStyle = "red";
      ctx.fillRect(-2, -2, 4, 4);
    }

    ctx.restore();

    if (Engine.show.hitbox) {
      ctx.strokeStyle = "grey";
      ctx.strokeRect(this.x - ox, this.y - oy, w, h);
    }

    if (!this.initialized) this.initialized = true;
  }
}

class Text {
  constructor(str, x, y, ops, container) {
    this._text = str;
    this.x = x;
    this.y = y;

    const color = ops.color ?? "black";
    const size = ops.size ?? 12;
    const font = ops.font ?? "monospace";
    const rotate = ops.rotate ?? 0;
    const scale = ops.scale ?? 1;

    const span = document.createElement("a");
    span.style = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      color: ${color};
      font-family: ${font};
      font-size: ${size}px;
      transform: rotate(${rotate}deg) scale(${scale}) translate(-50%, -50%);
      width: max-content;
    `;
    if (ops.href) {
      span.href = ops.href;
      if (ops.newTab) {
        span.target = "_blank";
        span.rel = "noopener";
      }
    } else {
      span.style.pointerEvents = "none";
    }
    span.innerText = str;

    this.el = span;

    container.append(span);
  }

  set text(val) {
    this._text = val;
    this.el.innerText = this._text;

    return this;
  }

  remove() {
    this.el.remove();
  }
}

const clearText = (node) =>
  node.querySelectorAll(".text-container > *").forEach((x) => x.remove());

class Engine {
  constructor(canvas, width, height) {
    this.canvas = canvas;
    canvas.width = width;
    canvas.height = height;
    this.ctx = canvas.getContext("2d");
    this.ctx.webkitImageSmoothingEnabled = false;
    this.ctx.mozImageSmoothingEnabled = false;
    this.ctx.imageSmoothingEnabled = false;
    this.objects = [];
    this.drawing = false;
    this.step = 0;

    this._width = width;
    this._height = height;
    this._mouseX = 0;
    this._mouseY = 0;

    this._heldKeys = new Set();
    this._pressedKeys = new Set();

    clearText(canvas.parentNode);
    this.textContainer = canvas.parentNode.querySelector(".text-container");

    canvas.setAttribute("tabindex", "1");

    canvas.addEventListener("keydown", (e) => {
      const key = e.key;

      if (this._heldKeys.has(key)) return;

      this._heldKeys.add(key);
      this._pressedKeys.add(key);

      e.preventDefault();
    });

    canvas.addEventListener("keyup", (e) => {
      const key = e.key;
      this._heldKeys.delete(key);
      this._pressedKeys.delete(key);

      e.preventDefault();
    });

    canvas.addEventListener("mousemove", (e) => {
      this._mouseX = e.clientX;
      this._mouseY = e.clientY;
    });

    // canvas.addEventListener("click", e => {
    //   console.log(e.clientX, e.clientY);
    // })
  }

  async leaderboard(score) {
    const LB_SERVER = "https://misguided.enterprises/gamelabscores/";

    const hash = this.gameHash;
    const res = await fetch(LB_SERVER, {
      method: "post",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ score, hash }),
    }).then((x) => x.json());

    let lb = await fetch(LB_SERVER + hash).then((x) => x.json());
    let scores = window.Object.entries(lb);
    scores.sort(([, a], [, b]) => b.score - a.score);
    scores = scores.splice(0, 5);

    this.ctx.globalAlpha = 0.66;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    clearText(this.canvas.parentNode);

    let x = this.canvas.width * 0.5;
    let y = this.canvas.height * 0.2;
    let size = this.canvas.height * 0.1;
    this.addText(
      (() => {
        if (res.prev && res.prev > score) return "PERSONAL BEST";
        else if (scores.length) return "LEADERBOARD";
        else return "NO SCORES :(";
      })(),
      x,
      y,
      { size }
    );

    y += size + 5;
    for (const [slack_id, { name, score }] of scores) {
      let opts = {
        size: size - 4,
        href:
          "https://app.slack.com/client/T0266FRGM/C0266FRGV/user_profile/" +
          slack_id,
        newTab: true,
        color: "blue",
      };
      this.addText(name.substring(0, 3), x - 50, y, opts);
      delete opts.href;
      delete opts.color;
      this.addText(score, x + 50, y, opts);
      y += size;
    }

    if (res.err)
      this.addText("login to add your " + score, x, y, {
        size: size - 4,
        color: "blue",
        href:
          LB_SERVER +
          "login/" +
          "?from=" +
          encodeURIComponent(window.location) +
          "&score=" +
          encodeURIComponent(score) +
          "&hash=" +
          encodeURIComponent(hash),
      });
    if (res.prev) {
      this.addText(`score: ${score}, best: ${res.prev}`, x, y, {
        size: size - 4,
      });
    }
  }

  get width() {
    return this._width;
  }
  get height() {
    return this._height;
  }
  get mouseX() {
    const rect = this.canvas.getBoundingClientRect();
    return this._mouseX - rect.left;
  } // not doced
  get mouseY() {
    const rect = this.canvas.getBoundingClientRect();
    return this._mouseY - rect.top;
  } // not doced

  add(params) {
    const newObj = new Object(params, this);
    this.objects.push(newObj);

    return newObj;
  }

  get(tag) {
    // not doced
    return this.objects.filter((x) => x.tags.includes(tag));
  }

  remove(query) {
    if (typeof query === "object")
      this.objects = this.objects.filter((x) => x.id !== query.id);
    else if (typeof query === "string")
      this.objects = this.objects.filter((x) => !x.tags.includes(query));
  }

  start() {
    const draw = () => {
      this.ctx.fillStyle = "white";
      this.ctx.fillRect(0, 0, this.width, this.height);

      this.objects.forEach((obj) => {
        obj.lastX = obj.x;
        obj.lastY = obj.y;

        if (obj.update !== null && obj.updateInterval == undefined)
          obj.update(obj);

        obj.x += obj.vx;
        obj.y += obj.vy;
      });

      this.resolve();

      this.objects.forEach((obj) => {
        if (obj.draw !== null) obj.draw();
      });

      [...this._pressedKeys].forEach((key) => {
        this._pressedKeys.delete(key);
      });

      this.step += 1;

      if (this.drawing) this._animId = window.requestAnimationFrame(draw);
    };

    // setInterval(draw, 1000/10)

    this.drawing = true;

    draw();
  }

  resolve() {
    const objs = this.objects;

    for (let i = 0; i < objs.length; i++) {
      for (let j = 0; j < objs.length; j++) {
        const obj0 = objs[i];
        const obj1 = objs[j];

        resolveObj(obj0, obj1);
      }
    }

    function resolveObj(me, them) {
      if (me == them) return;

      const [x, y] = overlap(me, them);

      const dx = me.x - me.lastX;
      const dy = me.y - me.lastY;

      me.x -= dx;
      me.y -= dy;

      const { top, bottom, left, right } = me.distanceTo(them);

      let canMoveInX = true;
      let canMoveInY = true;
      let collided = false;

      if (x > 0 && y > 0) collided = true;

      const bothSolid = them.solid && me.solid;

      const BUFFER = 0.1;

      if (dy < 0 && Math.abs(dy) > top && top >= -me.height + BUFFER) {
        if (bothSolid) {
          me.vy = -me.bounce * me.vy;
          me.y = me.y - top + BUFFER; // need a little buffer
          canMoveInY = false;
        }

        collided = true;
      }

      if (dy > 0 && Math.abs(dy) > bottom && bottom >= -me.height + BUFFER) {
        if (bothSolid) {
          me.vy = -me.bounce * me.vy;
          me.y = me.y + bottom - BUFFER;
          canMoveInY = false;
        }

        collided = true;
      }

      if (dx < 0 && Math.abs(dx) > left && left >= -me.width + BUFFER) {
        if (bothSolid) {
          me.vx = -me.bounce * me.vx;
          me.x = me.x - left + BUFFER;
          canMoveInX = false;
        }
        collided = true;
      }

      if (dx > 0 && Math.abs(dx) > right && right >= -me.width + BUFFER) {
        if (bothSolid) {
          me.vx = -me.bounce * me.vx;
          me.x = me.x + right - BUFFER;
          canMoveInX = false;
        }
        collided = true;
      }

      if (canMoveInX) me.x += dx;
      if (canMoveInY) me.y += dy;

      if (collided && me.collides !== null) me.collides(me, them);
    }
  }

  end() {
    this.drawing = false;
    window.cancelAnimationFrame(this._animId);
  }

  addText(str, x, y, ops = {}) {
    return new Text(str, x, y, ops, this.textContainer);
  }

  heldKey(key) {
    return this._heldKeys.has(key);
  }

  pressedKey(key) {
    return this._pressedKeys.has(key);
  }
}

export { Engine };
