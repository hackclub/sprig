const getLimits = (obj, [dx, dy] = [0, 0]) => {
  const [ox, oy] = [obj.width * obj.origin[0], obj.height * obj.origin[1]];
  const x = obj.x + dx - ox;
  const y = obj.y + dy - oy;
  const xMin = x;
  const xMax = x + obj.width;
  const yMin = y;
  const yMax = y + obj.height;
  const xCenter = (x + x + obj.width) / 2;
  const yCenter = (y + y + obj.height) / 2;

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
    width: obj.width,
    height: obj.height,
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

class Object {
  constructor(params, engine) {
    this.engine = engine;
    this.tags = params.tags ?? [];

    let bounds = { x: 0, y: 0, maxX: 16, maxY: 16, width: 16, height: 16 };

    if (typeof params.sprite === "object") {
      const [w, h] = params.sprite.size;

      this.imageData = new ImageData(
        new Uint8ClampedArray(params.sprite.colors.flat()),
        w,
        h
      );

      this.spriteOffsetX = params.sprite.bounds.x;
      this.spriteOffsetY = params.sprite.bounds.y;
      this.unscaledWidth = this.width = params.sprite.bounds.width;
      this.unscaledHeight = this.height = params.sprite.bounds.height;

      this.sprite = document.createElement("canvas");
      this.sprite.width = this.width + 1;
      this.sprite.height = this.height + 1;
      this.sprite
        .getContext("2d")
        .putImageData(this.imageData, -this.spriteOffsetX, -this.spriteOffsetY);
    } else {
      this.sprite = null;
    }

    this.scale = params.scale ?? 1;
    this.rotate = params.rotate ?? 0;

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

    this.origin =
      typeof params.origin === "string" && params.origin in origins
        ? origins[params.origin]
        : Array.isArray(params.origin)
        ? params.origin
        : [0, 0];

    // this._x = params.x ?? 0;
    // this._y = params.y ?? 0;
    this._x = (params.x ?? 0) - this.width * this.origin[0];
    this._y = (params.y ?? 0) - this.height * this.origin[1];
    this._vx = params.vx ?? 0;
    this._vy = params.vy ?? 0;
    this._ax = params.ax ?? 0;
    this._ay = params.ay ?? 0;
    this.bounce = params.bounce ?? 0;
    // this.solidTo = params.solidTo ?? [];
    this.solid = params.solid ?? false;
    this.click = params.click ?? null;
    this._update = params.update ?? null;
    this._collides = params.collides ?? null;
    this.drawBounds = params.drawBounds ?? false;
    this.dx = 0;
    this.dy = 0;

    this.id = Math.random();
  }

  hasTag(tag) {
    return this.tags.includes(tag);
  }

  translate(dx, dy) {
    let canMoveInX = true;
    let canMoveInY = true;

    this.engine.objects.forEach((otherObj) => {
      const [ogx, ogy] = overlap(this, otherObj);
      const [x, y] = overlap(this, otherObj, [dx, dy]);

      if (otherObj.solid && this.solid) {
        if (x <= 0 || y <= 0) return;

        if (x > 0 && ogx <= 0) {
          canMoveInX = false;
          this._ax = 0;
          this._vx = -this.bounce * this._vx;
          this._x -= ogx < -1.5 ? ogx : 0;
        }

        if (y > 0 && ogy <= 0) {
          canMoveInY = false;
          this._ay = 0;
          this._vy = -this.bounce * this._vy;
          this._y -= ogy < -1.5 ? ogy : 0;
        }
      }

      if (x >= 0 && y >= 0 && this._collides !== null)
        this._collides(this, otherObj);
    });

    if (canMoveInX) this._x += dx;
    if (canMoveInY) this._y += dy;
  }

  set scale(factor) {
    this.width = this.unscaledWidth * factor;
    this.height = this.unscaledHeight * factor;
  }

  get rotate() {
    return (this._rotate / Math.PI) * 180;
  }
  set rotate(x) {
    this._rotate = (x / 180) * Math.PI;
  }

  draw(obj) {
    const { ctx } = obj.engine;
    ctx.save();
    const [ox, oy] = [
      this.width * this.origin[0],
      this.height * this.origin[1],
    ];
    ctx.translate(this._x + ox, this._y + oy);
    ctx.rotate(this._rotate);

    // draw sprite with sprite scale
    if (this.sprite !== null)
      ctx.drawImage(this.sprite, -ox, -oy, this.width, this.height);

    if (Engine.show.origin) {
      ctx.fillStyle = "red";
      ctx.fillRect(-2, -2, 4, 4);
    }

    this._update(obj);
    ctx.restore();

    if (Engine.show.hitbox) {
      ctx.strokeStyle = "grey";
      ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
  }

  set x(val) {
    this.translate(val - this._x, 0);
  }
  set y(val) {
    this.translate(0, val - this._y);
  }
  set vx(val) {
    this._vx = val;
  }
  set vy(val) {
    this._vy = val;
  }
  set ax(val) {
    this._ax = val;
  }
  set ay(val) {
    this._ay = val;
  }

  get x() {
    return this._x;
  }
  get y() {
    return this._y;
  }
  get vx() {
    return this._vx;
  }
  get vy() {
    return this._vy;
  }
  get ax() {
    return this._ax;
  }
  get ay() {
    return this._ay;
  }
}

class Text {
  constructor(str, x, y, ops, container) {
    this._text = str;
    this.x = x;
    this.y = y;

    const color = ops.color ?? "black";
    const size = ops.size ?? 12;
    const font = ops.font ?? "Times New Roman";
    const rotate = ops.rotate ?? 0;
    const scale = ops.scale ?? 1;

    const span = document.createElement("span");
    span.style = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      color: ${color};
      font-family: ${font};
      font-size: ${size}px;
      transform: rotate(${rotate}deg) scale(${scale});
    `;
    span.innerText = str;

    this.el = span;

    container.append(span);
  }

  set text(val) {
    this._text = val;
    this.el.innerText = this._text;

    return this;
  }
}

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

    this._onDraw = [];

    this._heldKeys = new Set();
    this._pressedKeys = new Set();

    const parent = canvas.parentNode;
    parent.querySelectorAll(".text-container > *").forEach((x) => x.remove());
    this.textContainer = parent.querySelector(".text-container");

    /* let's make sure we know how big all the sprites are before we do any game logic */
    dispatch("SIZE_UP_SPRITES");

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

  get width() {
    return this._width;
  }
  get height() {
    return this._height;
  }
  get mouseX() {
    return this._mouseX;
  } // not doced
  get mouseY() {
    return this._mouseY;
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
        let ogX = obj.x;
        let ogY = obj.y;

        if (obj.draw !== null) obj.draw(obj);

        obj.vx += obj.ax;
        obj.vy += obj.ay;
        obj.translate(obj.vx, obj.vy);

        obj.dx = ogX - obj.x;
        obj.dy = ogY - obj.y;
      });

      [...this._pressedKeys].forEach((key) => {
        this._pressedKeys.delete(key);
      });

      this.step += 1;

      if (this.drawing) window.requestAnimationFrame(draw);
    };

    // setInterval(draw, 1000/10)

    this.drawing = true;
    draw();
  }

  end() {
    this.drawing = false;
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

// should I add concept of ground and gravity
// should it just be solid and not with layers
// platforms should be able to carry you
// can you push things around

// removed acceleration
// elastic collisions
// layers/selective contact

// add dt to engine
// add dx dy to objs
