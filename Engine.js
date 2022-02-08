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

function is_overlapping_range(x1,x2,y1,y2) {
  return Math.max(x1,y1) <= Math.min(x2,y2)
}

function distanceTo(obj0, obj1) {
  // me is obj1, them is obj0

  let top = Infinity;
  let right = Infinity;
  let bottom = Infinity;
  let left = Infinity;

  // top is obj0 top - obj1 bottom if below and left and right are in bounds
  const overlapX = is_overlapping_range(obj0.x, obj0.x+obj0.width, obj1.x, obj1.x+obj1.width);
  const overlapY = is_overlapping_range(obj0.y, obj0.y+obj0.height, obj1.y, obj1.y+obj1.height);

  if (overlapX) {
    top = -(obj0.y + obj0.height - obj1.y);
    bottom = -(obj1.y + obj1.height - obj0.y);
  }

  if (overlapY) {
    left = -(obj0.x + obj0.width - obj1.x);
    right = -(obj1.x+obj1.width-obj0.x);
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
  } else {
    that._sprite = null;
  }
}

class Object {
  constructor(params, engine) {
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
    this.origin = params.origin || [0, 0];

    this.x = params.x ?? 0;
    this.y = params.y ?? 0;
    this.lastX = 0;
    this.lastY = 0;

    this.vx = params.vx ?? 0;
    this.vy = params.vy ?? 0;
    this.bounce = params.bounce ?? 0;
    this.solid = params.solid ?? false;
    this.click = params.click ?? null;
    this.update = params.update ?? null;
    this.collides = params.collides ?? null;
    this.drawBounds = params.drawBounds ?? false;

    this.id = Math.random();
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

  set sprite(spriteData) {
    // scaling doesn't work here
    initSprite(spriteData, this);
    // this.scale = this.scale;
  }

  hasTag(tag) {
    return this.tags.includes(tag);
  }

  get width() {
    return this._width * this.scale[0];
  }

  get height() {
    return this._height * this.scale[1];
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

  draw(obj) {
    const { ctx } = obj.engine;
    const w = this.width;
    const h = this.height;
    ctx.save();
    const [ox, oy] = [w * this.origin[0], h * this.origin[1]];
    ctx.translate(this.x, this.y);
    ctx.rotate(this._rotate);
    
    // const xInvert = this.scale[0] < 0 ? -1 : 1;
    // const yInvert = this.scale[1] < 0 ? -1 : 1;
    // ctx.scale(xInvert, yInvert);

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
      transform: rotate(${rotate}deg) scale(${scale}) translate(-50%, -50%);
      width: max-content;
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

  remove() {
    this.el.remove();
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

    this._heldKeys = new Set();
    this._pressedKeys = new Set();

    const parent = canvas.parentNode;
    parent.querySelectorAll(".text-container > *").forEach((x) => x.remove());
    this.textContainer = parent.querySelector(".text-container");

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

        if (obj.update !== null) obj.update(obj);

        obj.x += obj.vx
        obj.y += obj.vy
      });

      this.resolve();

      this.objects.forEach((obj) => {
        if (obj.draw !== null) obj.draw(obj);
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

  resolve(xy = "xy") {
    const objs = this.objects;

    for (let i = 0; i < objs.length; i++) {
      for (let j = i; j < objs.length; j++) {
          const obj0 = objs[i];
          const obj1 = objs[j];

          resolveObj(obj0, obj1);



          // if (xy === "xy") resolveObj(obj0, obj1);
          // else if (xy === "x") resolveObj(obj0, obj1, "x");
          // else if (xy === "y") resolveObj(obj0, obj1, "y");
         
      }
    }

    function resolveObj (me, them, xy = "xy") {
      if (me == them) return;

      const [x, y] = overlap(me, them);

      if (x <= 0 || y <= 0) return;
      
      const dx = me.x - me.lastX;
      const dy = me.y - me.lastY;

      me.x -= dx;
      me.y -= dy;

      const { top, bottom, left, right } = me.distanceTo(them);

      console.log("collides", { top, bottom, left, right, dx, dy, x, y });

      // if i'm moving in a direction that has space accept the change and move on

      // let acceptable = true;
      // if (dy < 0 && Math.abs(dy) < top) acceptable = false;
      // if (dy > 0 && Math.abs(dy) < bottom) acceptable = false;
      // if (dx < 0 && Math.abs(dx) < left) acceptable = false;
      // if (dx > 0 && Math.abs(dx) < right) acceptable = false;

      // if (acceptable) {
      //   me.x += dx;
      //   me.y += dy;
      //   return;
      // } else {
      //   console.log("collision")
      // }


      // console.log(dx, right)
      // moved and have space to do so
      // if (dy < 0 &&  top) return;
      // if (dy > bottom) return;
      // if (dx < left) return;
      // if (!(dx >= 0 && right >= 0)) return;

      // otherwise collided

      if (them.solid && me.solid) {

        // const udOrlr = Math.min()

        if (dy < 0 && Math.abs(dy) > top && x > y) {
          me.vy = -me.bounce * me.vy;
          me.y = me.y - top;
        }

        if (dy > 0 && Math.abs(dy) > bottom && x > y) {
          me.vy = -me.bounce * me.vy;
          me.y = me.y + bottom;
        }

        if (dx < 0 && Math.abs(dx) > left && y > x) {
          me.vx = -me.bounce * me.vx;
          me.x = me.x - left;
        }

        if (dx > 0 && Math.abs(dx) > right && y > x) {
          me.vx = -me.bounce * me.vx;
          me.x = me.x + right;
        }

        // if (dx > left) {
        //   me.vx = -me.bounce * me.vx;
        //   me.x = me.x + right;
        // }

        // if (dx < right) {
        //   me.vx = -me.bounce * me.vx;
        //   me.x = me.x - left;
        // }

        // if (y > x) {
          // if (dy <= 0 && dx <= 0) {
          //   me.vy = -me.bounce * me.vy;
          //   me.y = me.y - top;

          //   me.vx = -me.bounce * me.vx;
          //   me.x = me.x - left;
          // }

          // else if (dy >= 0 && dx <= 0) {
          //   me.vy = -me.bounce * me.vy;
          //   me.y = me.y + bottom;

          //   me.vx = -me.bounce * me.vx;
          //   me.x = me.x + right;
          // }

          // else if (dy >= 0 && dx >= 0) {
          //   me.vy = -me.bounce * me.vy;
          //   me.y = me.y + bottom;

          //   me.vx = -me.bounce * me.vx;
          //   me.x = me.x + right;
          // }

          // else if (dy >= 0 && dx <= 0) {
          //   me.vy = -me.bounce * me.vy;
          //   me.y = me.y + bottom;

          //   me.vx = -me.bounce * me.vx;
          //   me.x = me.x - left;
          // }

        // }

        // if (x < y) {
          // if (dx < 0) {
          //   me.vx = -me.bounce * me.vx;
          //   me.x = me.x - left;
          // }

          // if (dx > 0) {
          //   me.vx = -me.bounce * me.vx;
          //   me.x = me.x + right;
          // }
        // }


        // if (dx < 0 && left < 0 && x < y) {
        //   me.vx = -me.bounce * me.vx;
        //   me.x = me.x - left;
        // }

        // if (dx > 0 && right < 0 && x < y) {
        //   me.vx = -me.bounce * me.vx;
        //   me.x = me.x + right;
        // }

        // if (x > y) {
        //   if (dy < 0 && top > bottom) { // moving up
        //     me.vy = -me.bounce * me.vy;
        //     me.y = top > bottom 
        //       ? me.y - (dy < 0 ? top : 0) 
        //       : me.y + (dy > 0 ? bottom : 0);
        //   } 
        // }

        // if (y > x) {
        //   if (dx !== 0) { // moving left
        //     me.vx = -me.bounce * me.vx;
        //     me.x = left > right ? me.x - left : me.x + right;
        //   } 
        // }
      } else {
        me.x += dx;
        me.y += dy;
      }

      if (me.collides !== null) me.collides(me, them);

    };

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
