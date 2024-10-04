/*
@title: Physics Sandbox
@author: Henry Bass
@tags: ['simulation']
@addedOn: 2023-03-27

Controls:

  WASD to move pointer
  
  When in game:
    I to select
    L to grab
    K for action
    J for options
  s
  In options menu:
    I to go up
    K to go down
    L to change option
    J to exit

Options explained:
  Action:
    Select create to spawn more objects
    Select delete to remove objects
    Select freeze to prevent an object from moving
    Select link to connect two objects
    Select reset to remove all objects
  Size:
    Dictates how large the next object created will be
  Spring F:
    Changes how much force links have
  Gravity:
    0.001 - 0.5:
      Downwards force
    Waves:
      Causes objects to sway along the X axis
    Loops:
      Causes objects to sway along the X and Y axis
  Pointer Speed:
    Adjusts how many pixels the pointer moves each time it's moved
  Drag:
    Adjusts how quickly objects loose velocity

Note:
  Feel free to reuse my settings manager - it was designed with reuse in mind!
*/
const player = "p";
let swidth = 64;
let sheight = 64;

let mouseX = 0;
let mouseY = 0;

let dt = 0.001;

let t = 0;
let k = 1;

let gx = 0.1
let gy = 0

let inputSpeed = 3;
let grabbing = false;

const dgrey = "d";
const grey = "g";
const white = "w";
const red = "r";
const green = "v";
let purple = "p";
let black = "b";

let screen = map`
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................`.replaceAll(".", "d");

let freeze = false;
let del = false;

setLegend(
    [white,  bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`],
    [red,    bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333`],
    [green,  bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
    [grey,   bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`],
    [black,  bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
    [purple, bitmap`
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH`],
    [dgrey,  bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
);

setMap(screen);

function dist(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
}

function findatloc(x, y) {
    for (let i = 0; i < entities.length; i++) {
        if (dist(x, y, entities[i].x, entities[i].y) < entities[i].radius) {
            return entities[i]
        }
    }
    return "Fail"
}

function inBounds(x, y) {
    return ((x > 0 && x < swidth) && (y > 0 && y < sheight));
}

class Entity {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.lx = x;
        this.ly = y;
        this.accx = 0;
        this.accy = 0;
        this.radius = radius;
        this.links = [];
        this.fill = "g";
        this.fixed = false;
    }

    renderEntity() {
      let pointerX = Math.max(0, this.x - this.radius);
      let pointerY = Math.max(0, this.y - this.radius);
      while (pointerX < Math.min(swidth, this.x + this.radius + 1)) {
          while (pointerY < Math.min(sheight, this.y + this.radius + 1)) {
              let objDist = dist(pointerX, pointerY, this.x, this.y)
              if ((this.links.length > 0) && (objDist < this.radius) && (objDist > this.radius - 1.5)) {
                addSprite(Math.floor(pointerX), Math.floor(pointerY), "p");
              }
              else if ((this.fixed) && (objDist < this.radius) && (objDist > this.radius - 3)) {
                addSprite(Math.floor(pointerX), Math.floor(pointerY), "g");
              } else if (((objDist) < this.radius) && (objDist > this.radius - 1.1)) {
                addSprite(Math.floor(pointerX), Math.floor(pointerY), "b");
              }else if (objDist < this.radius) {
                addSprite(Math.floor(pointerX), Math.floor(pointerY), this.fill);
              }
              pointerY += 1;
          }
        pointerY = Math.max(0, this.y - this.radius);
        pointerX += 1;
      }
    }

    renderLink(linked) {
      let steps = Math.floor(dist(this.x, this.y, linked.x, linked.y))
      let xdif = (linked.x - this.x) / steps;
      let ydif = (linked.y - this.y) / steps;
      
      for (let i = 0; i < steps; i ++) {
        let drawX = Math.floor(this.x + (xdif * i));
        let drawY = Math.floor(this.y + (ydif * i));

        if (inBounds(drawX, drawY)) addSprite(drawX, drawY, "p");
      }
    }
  
    render() {
      this.renderEntity();
        if (this.links.length > 0) {
            for(let i = 0; i < this.links.length; i++) {
                this.renderLink(this.links[i])
            }
        }
    }

    link(other) {
        if (other !== undefined) {
          this.links.push(other);
          other.links.push(this);
        }
    }

    substep() {
        if (this.x + this.radius > swidth) {
            this.x -= (this.x + this.radius - swidth);
        }
        if (this.y + this.radius > sheight) {
            this.y -= (this.y + this.radius - sheight);
        }
        if (this.x - this.radius < 0) {
            this.x -= (this.x - this.radius);
        }
        if (this.y - this.radius < 0) {
            this.y -= (this.y - this.radius);

        }

        for (let i = 0; i < entities.length; i++) {
            if (entities[i] !== this && this.fixed == false) {
                let odist = dist(this.x, this.y, entities[i].x, entities[i].y);
                let overlap = odist - (this.radius + entities[i].radius);
                if (overlap < 0) {

                    let d = this.radius + entities[i].radius - odist;

                    this.x += ((this.x - entities[i].x) / odist) * d * 0.5;
                    this.y += ((this.y - entities[i].y) / odist) * d * 0.5;
                    if (entities[i].fixed == false) {
                        entities[i].x -= ((this.x - entities[i].x) / odist) * d * 0.5;
                        entities[i].y -= ((this.y - entities[i].y) / odist) * d * 0.5;
                    }

                }
            }
        }
    }

    update() {

        if (this.fixed == false) {

            for (let i = 0; i < this.links.length; i++) {
                if (this.links[i] !== undefined) {
                    let other = this.links[i];
                    let d = dist(this.x, this.y, other.x, other.y)
                    if (!other.fixed) {
                        other.x -= (((other.x - this.x) * d) / 1000) * k;
                        other.y -= (((other.y - this.y) * d) / 1000) * k;
                    }
    
                        this.x += (((other.x - this.x) * d) / 1000) * k;
                        this.y += (((other.y - this.y) * d) / 1000) * k;
    
                }
    
            }

        this.accelerate(gx, gy);

        for (let i = 0; i < 4; i++) {
            this.substep();
        }

        let velx = (this.x - this.lx) * (1 - settingsManager.getValue("Drag"));
        let vely = (this.y - this.ly) * (1 - settingsManager.getValue("Drag"));

        this.lx = this.x;
        this.ly = this.y;

        this.x += velx + this.accx;
        this.y += vely + this.accy;

        this.accx = 0;
        this.accy = 0;
        } else {
            this.fill = "g";
        }

    }

    accelerate(x, y) {
        this.accx += x;
        this.accy += y;
    }
    
}

// The settings manager was designed to be reused - feel free to use this in your own projects!

class SettingsManager {
    constructor() {
      this.enabled = false;
      this.pointerIndex = 0;
      this.options = [
        {name : "Action", states : ["Create", "Delete", "Freeze", "Link", "Reset"], stateIndex : 0},
        {name : "Size", states : [2, 4, 6, 8, "Rand"],  stateIndex : 4},
        {name : "Spring F", states : [0.1, 1, 10, 50],  stateIndex : 1},
        {name : "Gravity", states : [0, 0.1, 1, 5, "Waves", "Loops"],  stateIndex : 2},
        {name : "Pointer Speed", states : [1, 2, 3, 4, 5],  stateIndex : 2},
        {name : "Drag", states : [0, 0.01, 0.05, 0.1, 0.5],  stateIndex : 1},
      ]
    }

    render() {
      clearText();
      if (this.enabled) {
        addText("Options", {x: 2, y: 0, color: color`3`})

      for (let i = 0; i < this.options.length; i++) {
        let option = this.options[i];
        addText(
          option.name + ": " + option.states[option.stateIndex],
          {x: 2, y: 2 * (i + 1),
          color: ((i == this.pointerIndex) ? color`5` : color`3`)}
        )
      }
        
      } else {
        addText("", { x: 2, y: 0, color: color`3`})   
      }
    }

    toggle() {
      this.enabled = !this.enabled;
    }

    handleInput(key) {
      if (key == "k") this.pointerIndex = (this.pointerIndex + 1) % (this.options.length);
      if (key == "i") this.pointerIndex = (this.pointerIndex + (this.options.length - 1)) % (this.options.length);
      if (key == "l") 
      {
        let pState = this.options[this.pointerIndex]
        this.options[this.pointerIndex].stateIndex = Math.abs((pState.stateIndex + 1) % (pState.states.length));
      }
    }

    getValue(key) {
      let retVal = 0
      for (let i = 0; i < this.options.length; i++) {
        if (this.options[i].name == key) retVal = this.options[i].states[this.options[i].stateIndex];
      }
      return retVal
    }
   
}

let settingsManager = new SettingsManager();

let mousedown = false;
let selected = new Entity(16, 16, 4);

let entities = [];
entities.push(selected)

onInput("k", () => {
  if (settingsManager.enabled) {
    settingsManager.handleInput("k")
  } else {
        if (settingsManager.getValue("Action") == "Create") {
            let scale = 1;
            if (settingsManager.getValue("Size") == "Rand") {
              scale = ((Math.random() * 6) + 2);
            } else {
              scale = settingsManager.getValue("Size");
            }
            entities.push(new Entity(mouseX, mouseY, scale));
        } else if ((settingsManager.getValue("Action") == "Delete") && entities.length > 1) {
          let oentry = findatloc(mouseX, mouseY);
          if (oentry !== "Fail") {
              for (let i = 0; i < entities.length; i++) {
                  entities[i].links = entities[i].links.filter(x => x !== oentry);
              }
              entities.splice(entities.indexOf(oentry), 1);

          }
      } else if ((settingsManager.getValue("Action") == "Freeze") && entities.length > 1) {
        let loc = findatloc(mouseX, mouseY);
        if (loc != "Fail") {
            loc.fixed = !loc.fixed;
        }
      } else if ((settingsManager.getValue("Action") == "Reset") && entities.length > 1) {
        entities = [new Entity(16, 16, 4)]
      } else if ((settingsManager.getValue("Action") == "Link") && entities.length > 1) {
        if (entities.length > 1) {
          let oentry = findatloc(mouseX, mouseY);
          if (oentry !== "Fail" && oentry !== selected && (entities.indexOf(selected) !== -1)) {
              oentry.link(selected);
              selected = oentry;
          }
      }
      }
  }
})

onInput("i", () => {
  if (settingsManager.enabled) {
    settingsManager.handleInput("i")
  } else {

        mousedown = true;
        let loc = findatloc(mouseX, mouseY)
        if (loc != "Fail") {
            selected = loc;
        
        }
  }
})

onInput("j", () => {
        settingsManager.toggle();
})

onInput("l", () => {
  if (settingsManager.enabled) {
    settingsManager.handleInput("l")
  } else {
        grabbing = !grabbing;
    }
})

onInput("w", () => {if ((mouseY - inputSpeed) >= 0 && (mouseY - inputSpeed) < sheight) mouseY -= inputSpeed;})
onInput("a", () => {if ((mouseX - inputSpeed) >= 0 && (mouseX - inputSpeed) < sheight) mouseX -= inputSpeed;})
onInput("s", () => {if ((mouseY + inputSpeed) >= 0 && (mouseY + inputSpeed) < sheight) mouseY += inputSpeed;})
onInput("d", () => {if ((mouseX + inputSpeed) >= 0 && (mouseX + inputSpeed) < sheight) mouseX += inputSpeed;})

setInterval(() => {
    setMap(screen);
    settingsManager.render();
    t++;
    // console.log(entities);
    inputSpeed = settingsManager.getValue("Pointer Speed");
    // console.log(settingsManager.getValue("Pointer Speed"));
    let setGrav = settingsManager.getValue("Gravity");
  
    if (typeof setGrav == "string") {
        if (setGrav == "Waves") {
            gx = Math.sin(t / 50) / 3.14 / 10;
            gy = 0.05;
        } else if (setGrav == "Loops") {
            gx = Math.sin(t / 100) / 3.14 / 10;
            gy = Math.cos(t / 100) / 3.14 / 10;
        }
    } else {
      gx = 0;
      gy = setGrav / 10;
    }

    k = settingsManager.getValue("Spring F") / 10;
  
    if (mousedown) {
        if (findatloc(mouseX, mouseY) == selected) {
            selected.x = mouseX;
            selected.y = mouseY;
        }
    }

    if (grabbing) {
      selected.x = mouseX
      selected.y = mouseY
      selected.lx = mouseX
      selected.ly = mouseY
    }
  
    for (let i = 0; i < entities.length; i++) {

      let e = entities[i];
        if (e == selected) {
            entities[i].fill = "r";
        } else if (e == findatloc(mouseX, mouseY)) {
            entities[i].fill = "v";
        } else {
            entities[i].fill = "w";
        }

        entities[i].render();
      if (!settingsManager.enabled) {
        entities[i].update();

    }
    }

    addSprite(mouseX, mouseY, white);
}, 10);

afterInput(() => {
  mousedown = false;
})
