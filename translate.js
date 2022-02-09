  translate(dx, dy) {
    let canMoveInX = true;
    let canMoveInY = true;

    this.engine.objects.forEach((otherObj) => {
      if (this == otherObj) return;

      // const [ogx, ogy] = overlap(this, otherObj);
      
      const [x, y] = overlap(this, otherObj, [dx, dy]);

      if (otherObj.solid && this.solid) {
        if (x <= 0 || y <= 0) return; 

        const { top, bottom, left, right } = this.distanceTo(otherObj);


        if (dy < 0 && top !== Infinity) { // moving up
          canMoveInY = false;
          this._vy = -this.bounce * this._vy;
          this._y -= top;
        }

        if (dy > 0 && bottom !== Infinity) { // moving down
          canMoveInY = false;
          this._vy = -this.bounce * this._vy;
          this._y += bottom;
        }

        if (dx < 0 && left !== Infinity) { // moving left
          canMoveInX = false;
          this._vx = -this.bounce * this._vx;
          this._x -= left;
        }

        if (dx > 0 && right !== Infinity) { // moving right
          canMoveInX = false;
          this._vx = -this.bounce * this._vx;
          this._x += right;
        }

      }

      if (x >= 0 && y >= 0 && this._collides !== null)
        this._collides(this, otherObj);
    });

    if (canMoveInX) this._x += dx;
    if (canMoveInY) this._y += dy;
  }
