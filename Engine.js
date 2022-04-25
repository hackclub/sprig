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

    // this
    // this.updatesPerSecond = 60;

    this._width = width;
    this._height = height;
    this._mouseX = 0;
    this._mouseY = 0;

    this._heldKeys = new Set();
    this._pressedKeys = new Set();

    // clearText(canvas.parentNode);
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
    const newObj = new _Object(params, this);
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
    let last = null;
    const draw = (ts) => {
      const elapsedMs = Math.min(3000, ts - (last ?? ts));
      last = ts;

      this.ctx.fillStyle = "white";
      this.ctx.fillRect(0, 0, this.width, this.height);

      this.objects.forEach((obj) => {
        obj.lastX = obj.x;
        obj.lastY = obj.y;

        obj._secondAccumulator += elapsedMs / 1000;
        while (obj._secondAccumulator > obj.secondsBetweenUpdates) {
          obj._secondAccumulator -= obj.secondsBetweenUpdates;
          if (obj.update) obj.update(obj);

          obj.x += obj.vx * obj.secondsBetweenUpdates;
          obj.y += obj.vy * obj.secondsBetweenUpdates;
        }
      });

      this.resolve();

      /* JavaScript's sort is stable, so undefined - undefined here
         won't shuffle; if you don't ever specify an index, things
         render in the order that they were spawned. */

      this.objects.sort((a, b) => a.zIndex - b.zIndex);

      this.objects.forEach((obj) => {
        if (obj.draw !== null) obj.draw();
      });

      this._pressedKeys.clear();

      if (this.drawing) this._animId = window.requestAnimationFrame(draw);
    };

    // setInterval(draw, 1000/10)

    this.drawing = true;

    window.requestAnimationFrame(draw);
  }


  end() {
    this.drawing = false;
    window.cancelAnimationFrame(this._animId);
  }

  addText(str, x, y, ops = {}) {
    return new Text(str, x, y, ops, this.textContainer);
  }

  heldKey(key) {
    return key === undefined
      ? [...this._heldKeys].length > 0
      : this._heldKeys.has(key);
  }

  pressedKey(key) {
    return key === undefined
      ? [...this._pressedKeys].length > 0
      : this._pressedKeys.has(key);
  }
}

export { Engine };
