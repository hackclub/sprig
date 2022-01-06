const getLimits = (obj, [dx, dy] = [0, 0]) => {
	const x = obj.x + dx;
	const y = obj.y + dy;
	const xMin = x;
	const xMax = x + obj.width;
	const yMin = y;
	const yMax = y + obj.height;
	const xCenter = (x + x + obj.width)/2;
	const yCenter = (y + y + obj.height)/2;

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
		height: obj.height
	}
}

const make_px_at = (w, h, data) => (x, y) => 
	(data[(w*y+x)*4] !== 255) ||
	(data[(w*y+x)*4+1] !== 255) ||
	(data[(w*y+x)*4+2] !== 255) ||
	(data[(w*y+x)*4+3] !== 255);

function contextBoundingBox(ctx, w, h) {
    var data = ctx.getImageData(0, 0, w, h).data;
    const pxAt = make_px_at(w, h, data);

    let x, y, minX, minY, maxX, maxY;

    loop0: 
    for (y = h - 1; y > 0; y--) {
    	for (x = w - 1; x > 0; x--) {
    		if (pxAt(x,y)) {
    			maxY = y;
    			break loop0;
    		} 
    	}	 
    }  

    if (maxY === undefined) {
    	console.log("No bounding box.")
    	return { minX: 0, minY: 0, maxX: 0, maxY: 0, width: 0, height: 0 }
    }

    loop1: 
    for (x = w - 1; x > 0; x--) {
    	for (y = 0; y < maxY; y++) {
    		if (pxAt(x,y)) {
    			maxX = x;
    			break loop1;
    		} 
    	}	 
    }    


    loop2: 
    for (x = 0; x < maxX; x++) {
    	for (y = 0; y < maxY; y++) {
    		if (pxAt(x,y)) {
    			minX = x;
    			break loop2;
    		} 
    	}	 
    } 

    loop3: 
    for (y = 0; y < maxY; y++) {
    	for (x = 0; x < maxX; x++) {
    		if (pxAt(x,y)) {
    			minY = y;
    			break loop3;
    		} 
    	}	 
    } 

    return { x:minX, y:minY, maxX:maxX, maxY:maxY, width:maxX-minX, height:maxY-minY };
}

function overlap(obj0, obj1, movement = [0, 0]) {
	const obj0Lims = getLimits(obj0, movement);
	const obj1Lims = getLimits(obj1);

	const x_overlap = Math.max(-Infinity, Math.min(obj0Lims.xMax, obj1Lims.xMax) - Math.max(obj0Lims.xMin, obj1Lims.xMin));
	const y_overlap = Math.max(-Infinity, Math.min(obj0Lims.yMax, obj1Lims.yMax) - Math.max(obj0Lims.yMin, obj1Lims.yMin));

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

    return obj0.x < obj1.x + obj1.width + left &&
           obj0.x + obj0.width + right > obj1.x &&
           obj0.y < obj1.y + obj1.height + top &&
           obj0.height + obj0.y + bottom > obj1.y;
}


class Object {
	constructor(params, engine) {
		this.engine = engine;
		this.tags = params.tags ?? [];
		this._x = params.x ?? 0;
		this._y = params.y ?? 0;
		this._vx = params.vx ?? 0;
		this._vy = params.vy ?? 0;
		this._ax = params.ax ?? 0;
		this._ay = params.ay ?? 0;
		this.bounce = params.bounce ?? 0;
		// this.solidTo = params.solidTo ?? [];
		this.solid = params.solid ?? false;
		this.click = params.click ?? null;
		this.draw = params.draw ?? null;
		this.dx = 0;
		this.dy = 0;

		this.id = Math.random();


		// need width and height
		const bounds = this.updateBoundingBox();
		this.width = bounds.width;
		this.height = bounds.height;
	}

	collides(query, buffer = 0) { // buffer could be obj { left, right, top, bottom }

		if (typeof query === "object") return haveCollided(this, query, buffer);

		let collided = false;
		this.engine.objects.forEach(obj => {
			if (obj.tags.includes(query) && haveCollided(this, obj, buffer)) collided = true;
		})

		return collided;
	}

	updateBoundingBox() {
		this.engine.ctx.fillStyle = "white";
    	this.engine.ctx.fillRect(0, 0, this.engine.width, this.engine.height);
    	this.draw(this);

    	return contextBoundingBox(this.engine.ctx, this.engine.width, this.engine.height);
	}

	translate(dx, dy) {
		let canMoveInX = true;
		let canMoveInY = true;

		this.engine.objects.forEach(otherObj => {
			const [ogx, ogy] = overlap(this, otherObj);

			if (otherObj.solid && this.solid) {
			   const [x, y] = overlap(this, otherObj, [ dx, dy ]);
			   if (x <= 0 || y <= 0) return;

			   if (x > 0 && ogx <= 0) {
			   	canMoveInX = false;
			   	this._ax = 0;
			   	this._vx = -this.bounce*this._vx;
			   	this._x -= ogx < -1.5 ? ogx : 0; 
			   }

			   if (y > 0 && ogy <= 0) {
			   	canMoveInY = false;
			   	this._ay = 0;
			   	this._vy = -this.bounce*this._vy;
			   	this._y -= ogy < -1.5 ? ogy : 0; 
			   }
			}
		})

		if (canMoveInX) this._x += dx; 
		if (canMoveInY) this._y += dy; 
	}

	set x(val) { this.translate(val - this._x, 0); }
	set y(val) { this.translate(0, val - this._y); }
	set vx(val) { this._vx = val; }
	set vy(val) { this._vy = val; }
	set ax(val) { this._ax = val; }
	set ay(val) { this._ay = val; }

	get x() { return this._x; }
	get y() { return this._y; }
	get vx() { return this._vx; }
	get vy() { return this._vy; }
	get ax() { return this._ax; }
	get ay() { return this._ay; }

}

class Engine {
	constructor(canvas) {
		this.canvas = canvas;
		this.ctx = canvas.getContext("2d");
		this.objects = [];
		this.drawing = false;
		this.step = 0; 
		
		const { width, height } = canvas.getBoundingClientRect();
		this._width = width;
		this._height = height; 
		this._mouseX = 0;
		this._mouseY = 0;

		this._onDraw = [];

		this._heldKeys = new Set();
		this._pressedKeys = new Set();

		canvas.setAttribute("tabindex", "1");

		canvas.addEventListener("keydown", e => {
		  const key = e.key;

		  if (this._heldKeys.has(key)) return;

		  this._heldKeys.add(key);
		  this._pressedKeys.add(key);

		  e.preventDefault();
		})

		canvas.addEventListener("keyup", e => {
		  const key = e.key;
		  this._heldKeys.delete(key);
		  this._pressedKeys.delete(key);

		  e.preventDefault()
		})

		canvas.addEventListener("mousemove", e => {
		  this._mouseX = e.clientX;
		  this._mouseY = e.clientY;
		})

		// canvas.addEventListener("click", e => {
		//   console.log(e.clientX, e.clientY);
		// })
	}

	get width() { return this._width };
	get height() { return this._height };
	get mouseX() { return this._mouseX }; // not doced
	get mouseY() { return this._mouseY }; // not doced

	add(params) {
		const newObj = new Object(params, this)
		this.objects.push(newObj);

		return newObj;
	}

	get(tag) { // not doced
		return this.objects.filter(x => x.tags.includes(tag));
	}

	remove(query) {
		if (typeof query === "object") this.objects = this.objects.filter(x => x.id !== query.id);
		else if (typeof query === "string") this.objects = this.objects.filter(x => !x.tags.includes(query));
	}

	onDraw(f) { // not doced
		this._onDraw.push(f);
	}

	start() {
		const draw = () => {
			this.ctx.fillStyle = "white";
    		this.ctx.fillRect(0, 0, this.width, this.height);

			this.objects.forEach(obj => {
				let ogX = obj.x;
				let ogY = obj.y;

				if (obj.draw !== null) obj.draw(obj);
				this._onDraw.forEach(f => f(obj));

				obj.vx += obj.ax;
				obj.vy += obj.ay;
				obj.translate(obj.vx, obj.vy)

				obj.dx = ogX - obj.x;
				obj.dy = ogY - obj.y;
			});

			[...this._pressedKeys].forEach(key => {
				this._pressedKeys.delete(key);
			});


			this.step += 1;

			if (this.drawing) window.requestAnimationFrame(draw);
		}

		// setInterval(draw, 1000/10)

		this.drawing = true;
		draw();
	}

	end() {
		this.drawing = false;
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



