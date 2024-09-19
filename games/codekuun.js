/*
@title: codekuun
@tags: ['hackable', 'puzzle', 'logic']
@addedOn: 2024-09-16
@author: Jomar Milan
*/

const bitmaps = {
  controllableUp: {
    key: '~',
    sprite: bitmap`
.....0....0.....
....00000000....
...0222222220...
...0222222220...
..002222222200..
...0000000000...
.00.02222220....
0200022222200...
0200222222220...
.000222222220...
.000222222220...
...0022222200...
....02222220....
.....000000.....
......0..0......
......0..0......`
  },
  controllableDown: {
    key: '1',
    sprite: bitmap`
.....0....0.....
....00000000....
...0022002200...
...0020000200...
..002222222200..
...0000000000...
....02222220.00.
...0022222200020
...0222222220020
...022222222000.
...022222222000.
...0022222200...
....02222220....
.....000000.....
......0..0......
......0..0......`
  },
  controllableLeft: {
    key: '2',
    sprite: bitmap`
........0.......
......00000.....
.....0220000....
.....0020000....
.....0222220....
.....0000000....
....002222200...
....022222220.00
....022222220020
....022222220020
....022222220020
....02222222000.
....002222200...
.....0000000....
.......0.0......
.......0.0......`
  },
  controllableRight: {
    key: '3',
    sprite: bitmap`
.......0........
.....00000......
....0000220.....
....0000200.....
....0222220.....
....0000000.....
...002222200....
00.022222220....
020022222220....
020022222220....
020022222220....
.00022222220....
...002222200....
....0000000.....
......0.0.......
......0.0.......`
  },
  commandMove: {
    key: '6',
    sprite: bitmap`
.22222222222222.
2277777777777722
2777777777777772
2777777777777772
2777777755777772
2777777775577772
2777777775557772
2775555555555772
2775555555555772
2777777775557772
2777777775577772
2777777755777772
2777777777777772
2777777777777772
2277777777777722
.22222222222222.`
  },
  commandMoveSelected: {
    key: '9',
    sprite: bitmap`
.66666666666666.
6677777777777766
6777777777777776
6777777777777776
6777777755777776
6777777775577776
6777777775557776
6775555555555776
6775555555555776
6777777775557776
6777777775577776
6777777755777776
6777777777777776
6777777777777776
6677777777777766
.66666666666666.`
  },
  commandEmpty: {
    key: '7',
    sprite: bitmap`
.22222222222222.
2200000000000022
2000000000000002
2000000000000002
2000000000000002
2000000000000002
2000000000000002
2000000000000002
2000000000000002
2000000000000002
2000000000000002
2000000000000002
2000000000000002
2000000000000002
2200000000000022
.22222222222222.`
  },
  commandErase: {
    key: '0',
    sprite: bitmap`
.22222222222222.
2200000000000022
2000000000000002
20000LLLLLL00002
2000LLLLLLLL0002
2000011111100002
2000010110100002
2000011001100002
2000011001100002
2000010110100002
2000011111100002
2000011111100002
2000000000000002
2000000000000002
2200000000000022
.22222222222222.`
  },
  commandEraseSelected: {
    key: '-',
    sprite: bitmap`
.66666666666666.
6600000000000066
6000000000000006
60000LLLLLL00006
6000LLLLLLLL0006
6000011111100006
6000010110100006
6000011001100006
6000011001100006
6000010110100006
6000011111100006
6000011111100006
6000000000000006
6000000000000006
6600000000000066
.66666666666666.`
  },
  commandRun: {
    key: '=',
    sprite: bitmap`
.22222222222222.
2244444444444422
2444444444444442
2444444444444442
2444442444444442
2444442244444442
2444442224444442
2444442222444442
2444442222444442
2444442224444442
2444442244444442
2444442444444442
2444444444444442
2444444444444442
2244444444444422
.22222222222222.`
  },
  commandRunSelected: {
    key: 'q',
    sprite: bitmap`
.66666666666666.
6644444444444466
6444444444444446
6444444444444446
6444442444444446
6444442244444446
6444442224444446
6444442222444446
6444442222444446
6444442224444446
6444442244444446
6444442444444446
6444444444444446
6444444444444446
6644444444444466
.66666666666666.`
  },
  commandTurnRight: {
    key: 'e',
    sprite: bitmap`
.22222222222222.
2244444444444422
2444444442444442
2444444444244442
2444422222224442
2444244444244442
2442444442444442
2442444444444442
2442444444444442
2442444444444442
2442444444444442
2442444444444442
2444444444444442
2444444444444442
2244444444444422
.22222222222222.`
  },
  commandTurnRightSelected: {
    key: 'r',
    sprite: bitmap`
.66666666666666.
6644444444444466
6444444442444446
6444444444244446
6444422222224446
6444244444244446
6442444442444446
6442444444444446
6442444444444446
6442444444444446
6442444444444446
6442444444444446
6444444444444446
6444444444444446
6644444444444466
.66666666666666.`
  },
  commandLoop: {
    key: 'y',
    sprite: bitmap`
.22222222222222.
22HHHHHHHHHHHH22
2HH0000000000HH2
2H0HHHHHHHHH0HH2
2H0HHHHHHH000002
2H0HHHHHHHH000H2
2H0HHHHHHHHH0HH2
2H0HHHHHHHHHHHH2
2H0HHHHHHHHHHHH2
2H0HHHHHHHHHHHH2
2H0HHHHHHHHHHHH2
2H0HHHHHHHHHHHH2
2H0HHHHHHHHHHHH2
2HH0000000000HH2
22HHHHHHHHHHHH22
.22222222222222.`
  },
  commandLoopSelected: {
    key: 'u',
    sprite: bitmap`
.66666666666666.
66HHHHHHHHHHHH66
6HH0000000000HH6
6H0HHHHHHHHH0HH6
6H0HHHHHHH000006
6H0HHHHHHHH000H6
6H0HHHHHHHHH0HH6
6H0HHHHHHHHHHHH6
6H0HHHHHHHHHHHH6
6H0HHHHHHHHHHHH6
6H0HHHHHHHHHHHH6
6H0HHHHHHHHHHHH6
6H0HHHHHHHHHHHH6
6HH0000000000HH6
66HHHHHHHHHHHH66
.66666666666666.`
  },
  commandLoopEnd: {
    key: 'i',
    sprite: bitmap`
.22222222222222.
22HHHHHHHHHHHH22
2HHHHH00HHHHHHH2
2HHHHHH00HHHHHH2
2HHHHHH00HHHHHH2
2HHHHHH00HHHHHH2
2HHHHHH00HHHHHH2
2HHHHHHH00HHHHH2
2HHHHHHH00HHHHH2
2HHHHHH00HHHHHH2
2HHHHHH00HHHHHH2
2HHHHHH00HHHHHH2
2HHHHHH00HHHHHH2
2HHHHH00HHHHHHH2
22HHHHHHHHHHHH22
.22222222222222.`
  },
  commandLoopEndSelected: {
    key: 'o',
    sprite: bitmap`
.66666666666666.
66HHHHHHHHHHHH66
6HHHHH00HHHHHHH6
6HHHHHH00HHHHHH6
6HHHHHH00HHHHHH6
6HHHHHH00HHHHHH6
6HHHHHH00HHHHHH6
6HHHHHHH00HHHHH6
6HHHHHHH00HHHHH6
6HHHHHH00HHHHHH6
6HHHHHH00HHHHHH6
6HHHHHH00HHHHHH6
6HHHHHH00HHHHHH6
6HHHHH00HHHHHHH6
66HHHHHHHHHHHH66
.66666666666666.`
  },
  barrier: {
    key: '8',
    sprite: bitmap`
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................`
  },
  scrapCode: {
    key: 'w',
    sprite: bitmap`
................
.00000000000000.
.00000000000000.
.00000000000000.
.0D000000000000.
.00D00000000000.
.000D0000000000.
.0000D000000000.
.000D0000000000.
.00D00000000000.
.0D0000D0D0D0D0.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
................`
  },
  floor: {
    key: '5',
    sprite: bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
LLLLLLLLLLLLLLLL`
  },
  nest1: {
    key: 'p',
    sprite: bitmap`
..........C.C.C.
.........C.CCCCC
........C.CLLLLL
......C..CLCCCCC
.....C.CCLLCCCCC
....C.CLLCCCCCCC
...C.CLCCCCCCCCC
..C.CLCCCCCCCCCC
...CCLCCCCCCCCCC
.CCLLCCCCCCCCCCC
..CLCCCCCCCCCCCC
CCLCCCCCCCCCCCCC
.CLCCCCCCCCCCCCC
CCLCCCCCCCCCCCCC
.CLCCCCCCCCCCCCC
CCLCCCCCCCCCCCCC`
  },
  nest2: {
    key: '[',
    sprite: bitmap`
C.C.C.C.C.C.C.C.
CCCCCCCCCCCCCCCC
LLLLLLLLLLLLLLLL
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`
  },
  nest3: {
    key: ']',
    sprite: bitmap`
C.C.C...........
CCCCC.C.........
LLLLLCC.C.......
CCCCCLLC.C......
CCCCCCLCC.C.....
CCCCCCCLLC.C....
CCCCCCCCCLC.C...
CCCCCCCCCCLC....
CCCCCCCCCCLC.C..
CCCCCCCCCCCLC.C.
CCCCCCCCCCCLLC.C
CCCCCCCCCCCCCLC.
CCCCCCCCCCCCCLCC
CCCCCCCCCCCCCLC.
CCCCCCCCCCCCCLCC
CCCCCCCCCCCCCLC.`
  },
  nest4: {
    key: 'a',
    sprite: bitmap`
.CLCCCCCCCCCCCCC
CCLCCCCCCCCCCCCC
.CLCCCCCCCCCCCCC
CCLCCCCCCCCCCCCC
.CLCCCCCCCCCCCCC
CCLCCCCCCCCCCCCC
.CLCCCCCCCCCCCCC
CCLCCCCCCCCCCCCC
.CLCCCCCCCCCCCCC
CCLCCCCCCCCCCCCC
.CLCCCCCCCCCCCCC
CCLCCCCCCCCCCCCC
.CLCCCCCCCCCCCCC
CCLCCCCCCCCCCCCC
.CLCCCCCCCCCCCCC
CCLCCCCCCCCCCCCC`
  },
  nest5: {
    key: 's',
    sprite: bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`
  },
  nest6: {
    key: 'd',
    sprite: bitmap`
CCCCCCCCCCCCCLC.
CCCCCCCCCCCCCLCC
CCCCCCCCCCCCCLC.
CCCCCCCCCCCCCLCC
CCCCCCCCCCCCCLC.
CCCCCCCCCCCCCLCC
CCCCCCCCCCCCCLC.
CCCCCCCCCCCCCLCC
CCCCCCCCCCCCCLC.
CCCCCCCCCCCCCLCC
CCCCCCCCCCCCCLC.
CCCCCCCCCCCCCLCC
CCCCCCCCCCCCCLC.
CCCCCCCCCCCCCLCC
CCCCCCCCCCCCCLC.
CCCCCCCCCCCCCLCC`
  },
  nest7: {
    key: 'f',
    sprite: bitmap`
CCLCCCCCCCCCCCCC
.CLCCCCCCCCCCCCC
CCLCCCCCCCCCCCCC
.CLCCCCCCCCCCCCC
CCLCCCCCCCCCCCCC
..CLCCCCCCCCCCCC
.CCLLCCCCCCCCCCC
...CCLCCCCCCCCCC
..C.CLCCCCCCCCCC
...C.CLCCCCCCCCC
....C.CLLCCCCCCC
.....C.CCLLCCCCC
......C..CLCCCCC
........C.CLLLLL
.........C.CCCCC
..........C.C.C.`
  },
  nest8: {
    key: 'g',
    sprite: bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
LLLLLLLLLLLLLLLL
CCCCCCCCCCCCCCCC
C.C.C.C.C.C.C.C.`
  },
  nest9: {
    key: 'h',
    sprite: bitmap`
CCCCCCCCCCCCCLCC
CCCCCCCCCCCCCLC.
CCCCCCCCCCCCCLCC
CCCCCCCCCCCCCLC.
CCCCCCCCCCCCCLCC
CCCCCCCCCCCCLC..
CCCCCCCCCCCLLCC.
CCCCCCCCCCLCC...
CCCCCCCCCCLC.C..
CCCCCCCCCLC.C...
CCCCCCCLLC.C....
CCCCCLLCC.C.....
CCCCCLC..C......
LLLLLC.C........
CCCCC.C.........
.C.C.C..........`
  }
};

const tunes = {
  select: tune`
272.72727272727275: E5/272.72727272727275,
8454.545454545456`,
  confirm: tune`
500: A5-500,
15500`,
  collect: tune`
82.1917808219178: F5/82.1917808219178,
82.1917808219178: F5/82.1917808219178,
82.1917808219178: A5/82.1917808219178,
82.1917808219178: A5/82.1917808219178,
82.1917808219178: A5/82.1917808219178,
2219.1780821917805`,
  victory: tune`
333.3333333333333: F5-333.3333333333333,
333.3333333333333: F5-333.3333333333333,
333.3333333333333: F5-333.3333333333333,
333.3333333333333: C5-333.3333333333333,
333.3333333333333: C5-333.3333333333333,
333.3333333333333: C5-333.3333333333333,
333.3333333333333: F5-333.3333333333333,
333.3333333333333: C5-333.3333333333333,
333.3333333333333: F5-333.3333333333333,
333.3333333333333: G5-333.3333333333333,
333.3333333333333: F5-333.3333333333333,
333.3333333333333,
333.3333333333333: C5-333.3333333333333,
6333.333333333333`
};

const inputs = {
  menuLeft: 'a',
  menuRight: 'd',
  menuConfirm: 'k',
  valueUp: 'w',
  valueDown: 's'
};

class Text {
  static #instances = [];

  #text;
  #x;
  #y;
  #color;

  get text() { return this.#text; }
  set text(val) {
    this.#text = val;
    Text.#updateText();
  }
  get x() { return this.#x; }
  set x(val) {
    this.#x = val;
    Text.#updateText();
  }
  get y() { return this.#y; }
  set y(val) {
    this.#y = val;
    Text.#updateText();
  }
  get color() { return this.#color; }
  set color(val) {
    this.#color = val;
    Text.#updateText();
  }

  constructor(text, x, y, color) {
    this.#text = text;
    this.#x = x;
    this.#y = y;
    this.#color = color;

    Text.#instances.push(this);
    Text.#updateText();
  }

  remove() {
    Text.#instances.splice(Text.#instances.indexOf(this), 1);

    Text.#updateText();
  }

  static #updateText() {
    clearText();
    
    Text.#instances.forEach((text) => {
      addText(text.text, {
        x: text.x,
        y: text.y,
        color: text.color
      });
    });
  }
}

class GameObject {
  static sprites = {};
  static solid = false;

  static #solidSprites = [ bitmaps.barrier.key ];
  static #objects = [];

  get x() { return this.#sprigSprite.x; }
  set x(val) { this.#sprigSprite.x = val; }
  get y() { return this.#sprigSprite.y; }
  set y(val) { this.#sprigSprite.y = val; }
  get sprite() { return this.#sprigSprite.type; }
  set sprite(val) {
    if (this.sprite === val) return;
    
    const x = this.x;
    const y = this.y;

    this.#sprigSprite.remove();
    
    addSprite(0, 0, val);
    this.#sprigSprite = getTile(0, 0)[0];
    this.x = x;
    this.y = y;
  }

  #sprigSprite;

  constructor(x, y, initialSprite) {
    // 0, 0 is the 'magic' tile where objects are initialized. Don't put anything
    // here!
    addSprite(0, 0, initialSprite);
    this.#sprigSprite = getTile(0, 0)[0];
    this.x = x;
    this.y = y;

    GameObject.#objects.push(this);
  }

  static register(obj) {
    if (obj.solid) {
      for (const spr in obj.sprites) {
        GameObject.#solidSprites.push(obj.sprites[spr]);
      }
      setSolids(this.#solidSprites);
    };
  }

  static getObjectsOfType(type) {
    return GameObject.#objects.filter((obj) => obj instanceof type);
  }

  static step() {
    GameObject.#objects.forEach((obj) => obj.onStep());
  }

  onStep() {
    GameObject.#objects.forEach((obj) => {
      if (obj !== this && obj.x === this.x && obj.y === this.y) {
        this.onOverlap(obj);
      }
    });
  }

  onOverlap(other) {}

  remove() {
    // Maybe keep track if removed, and prevent operations on object if so?
    this.#sprigSprite.remove();

    GameObject.#objects.splice(GameObject.#objects.indexOf(this), 1);
  }
}

class Controllable extends GameObject {
  static sprites = {
    up: bitmaps.controllableUp.key,
    down: bitmaps.controllableDown.key,
    left: bitmaps.controllableLeft.key,
    right: bitmaps.controllableRight.key
  };
  static solid = true;
  static {
    GameObject.register(Controllable);
  }

  #direction;
  get direction() { return this.#direction; }
  set direction(val) {
    this.#direction = val;
    this.sprite = Controllable.sprites[val];
  }
  
  constructor(x, y, dir) {
    let sprite = Controllable.sprites[dir];
    
    super(x, y, sprite);

    this.#direction = dir;
  }

  move(direction) {
    if (direction === 'up' && this.y > 1) {
      this.y -= 1;
    } else if (direction === 'down' && this.y < height() - 2) {
      this.y += 1;
    } else if (direction === 'left') {
      this.x -= 1;
    } else if (direction === 'right') {
      this.x += 1;
    }
  }

  turn(direction) {
    // right turns in the clockwise direction, left turns counterclockwise
    switch (this.direction) {
      case 'up':
        if (direction === 'right') this.direction = 'right';
        if (direction === 'left') this.direction = 'left';
        break;
      case 'down':
        if (direction === 'right') this.direction = 'left';
        if (direction === 'left') this.direction = 'right';
        break;
      case 'left':
        if (direction === 'right') this.direction = 'up';
        if (direction === 'left') this.direction = 'down';
        break;
      case 'right':
        if (direction === 'right') this.direction = 'down';
        if (direction === 'left') this.direction = 'up';
        break;
    }
  }
}

class Command extends GameObject {
  static sprites = {
    empty: bitmaps.commandEmpty.key,
    move: bitmaps.commandMove.key,
    moveSelected: bitmaps.commandMoveSelected.key,
    erase: bitmaps.commandErase.key,
    eraseSelected: bitmaps.commandEraseSelected.key,
    run: bitmaps.commandRun.key,
    runSelected: bitmaps.commandRunSelected.key,
    turnRight: bitmaps.commandTurnRight.key,
    turnRightSelected: bitmaps.commandTurnRightSelected.key,
    loop: bitmaps.commandLoop.key,
    loopSelected: bitmaps.commandLoopSelected.key,
    loopEnd: bitmaps.commandLoopEnd.key,
    loopEndSelected: bitmaps.commandLoopEndSelected.key
  };
  static solid = false;
  static {
    GameObject.register(Command);
  }

  static commandTypes = {
    empty: {
      default: Command.sprites.empty,
      selected: null
    },
    move: {
      default: Command.sprites.move,
      selected: Command.sprites.moveSelected
    },
    erase: {
      default: Command.sprites.erase,
      selected: Command.sprites.eraseSelected
    },
    run: {
      default: Command.sprites.run,
      selected: Command.sprites.runSelected
    },
    turnRight: {
      default: Command.sprites.turnRight,
      selected: Command.sprites.turnRightSelected
    },
    loop: {
      default: Command.sprites.loop,
      selected: Command.sprites.loopSelected
    },
    loopEnd: {
      default: Command.sprites.loopEnd,
      selected: Command.sprites.loopEndSelected
    }
  };

  value = 0;

  #type = '';
  #selected = false;
  #valueText;

  get type() { return this.#type; }
  set type(val) {
    this.#type = val;
    this.#updateSprite();
  }
  get selected() { return this.#selected; }
  set selected(val) {
    this.#selected = val;
    this.#updateSprite();
  }

  constructor(x, y, type, selected) {
    super(x, y, selected ? type.selected : type.default);

    this.#type = type;
    this.#selected = selected;

    this.#updateSprite();
  }

  execute() {
    // Maybe define behavior in command type object?
    switch (this.#type) {
      case Command.commandTypes.move:
        GameObject.getObjectsOfType(Controllable).forEach((controllable) => controllable.move(controllable.direction));
        break;
      case Command.commandTypes.turnRight:
        GameObject.getObjectsOfType(Controllable).forEach((controllable) => controllable.turn('right'));
        break;
      default:
        break;
    }
  }

  incrementValue() {
    if (this.#type !== Command.commandTypes.loop) return false;
    if (this.value >= 9) return false;

    this.value++;
    this.#updateSprite();
    return true;
  }

  decrementValue() {
    if (this.#type !== Command.commandTypes.loop) return false;
    if (this.value <= 0) return false;

    this.value--;
    this.#updateSprite();
    return true;
  }

  #updateSprite() {
    this.sprite = this.#selected ? this.#type.selected : this.#type.default;

    if (this.#type === Command.commandTypes.loop) {
      if (!this.#valueText) {
        // In a 10x8 map, a tile can fit 2 characters of text horizontally and
        // vertically; thus, the text is in a grid aligned to that of the map
        // with double the size. Thus it is necessary for the map size to be
        // 10x8 -- at least when this technique is in use.
        this.#valueText = new Text(this.value.toString(), (this.x * 2) + 1, (this.y * 2) + 1, color`6`);
      } else {
        this.#valueText.text = this.value.toString();
      }
    } else {
      if (this.#valueText) {
        this.#valueText.remove();
        this.#valueText = null;
      }
    }
  }
}

class Scrap extends GameObject {
  static sprites = {
    code: bitmaps.scrapCode.key
  };
  static solid = false;
  static {
    GameObject.register(Scrap);
  }

  constructor(x, y) {
    /*
    const sprite = Math.floor(Math.random() * 2);
    super(x, y, sprite === 1 ? Scrap.sprites.code
    */

    super(x, y, Scrap.sprites.code);
  }

  onOverlap(other) {
    playTune(tunes.collect);
    
    if (other instanceof Controllable) this.remove();
  }
}

// Map size is 10x8 so the map fits the 160x128 screen. In keeping the map size
// consistent across all levels, the 'hud' elements such as the commands and the
// command palette do not change size nor position, so the map change won't be
// as jarring.
const levels = [
  {
    onLoad(ephemeralObjects, ephemeralText) {
      ephemeralObjects.push(new Controllable(3, 2, 'right'));
      ephemeralObjects.push(new Scrap(6, 2));

      ephemeralObjects.push(new GameObject(0, 3, bitmaps.commandMove.key));
      ephemeralText.push(new Text('to move forward', 2, 7, color`0`));
      ephemeralObjects.push(new GameObject(0, 4, bitmaps.commandErase.key));
      ephemeralText.push(new Text('remove a command', 2, 9, color`0`));
      ephemeralObjects.push(new GameObject(0, 5, bitmaps.commandRun.key));
      ephemeralText.push(new Text('to run program', 2, 11, color`0`));
      
      ephemeralText.push(new Text('A/D-Move  K-Select', 1, 13, color`0`));
    },
    commands: [ Command.commandTypes.move ],
    commandSlots: 3,
    map: map`
..........
...8888...
..855558..
...8888...
..........
..........
..........
..........`
  },
  {
    onLoad(ephemeralObjects, ephemeralText) {
      ephemeralObjects.push(new Controllable(3, 4, 'up'));
      ephemeralObjects.push(new Scrap(5, 4));

      ephemeralText.push(new Text('only the gray floor\ncan be traversed', 1, 10, color`0`));
    },
    commands: [ Command.commandTypes.move, Command.commandTypes.turnRight ],
    commandSlots: 6,
    map: map`
..........
..........
...888....
..85558...
..85858...
...8.8....
..........
..........`
  },
  {
    onLoad(ephemeralObjects, ephemeralText) {
      ephemeralObjects.push(new Controllable(2, 1, 'right'));
      ephemeralObjects.push(new Scrap(7, 1));

      ephemeralText.push(new Text('commands between\nand  will loop', 1, 7, color`0`));
      ephemeralObjects.push(new GameObject(9, 3, bitmaps.commandLoop.key));
      ephemeralObjects.push(new GameObject(2, 4, bitmaps.commandLoopEnd.key));

      ephemeralText.push(new Text('W/S-set iterations', 1, 12, color`0`));
    },
    commands: [ Command.commandTypes.move, Command.commandTypes.loop, Command.commandTypes.loopEnd ],
    commandSlots: 3,
    map: map`
..........
.85555558.
..888888..
..........
..........
..........
..........
..........`
  },
  {
    onLoad(ephemeralObjects, ephemeralText) {
      ephemeralObjects.push(new Controllable(3, 6, 'up'));
      ephemeralObjects.push(new Scrap(3, 2));
      ephemeralObjects.push(new Scrap(7, 2));
    },
    commands: [ Command.commandTypes.move, Command.commandTypes.turnRight, Command.commandTypes.loop, Command.commandTypes.loopEnd],
    commandSlots: 7,
    map: map`
..........
...88888..
..8555558.
..858888..
..858.....
..858.....
..858.....
..........`
  },
  {
    onLoad(ephemeralObjects, ephemeralText) {
      ephemeralObjects.push(new GameObject(2, 2, bitmaps.scrapCode.key));
      ephemeralObjects.push(new GameObject(3, 3, bitmaps.scrapCode.key));
      
      ephemeralText.push(new Text('Nice job! Now Heidi\nhas a nest full of\nscraps!', 1, 11, color`8`));

      playTune(tunes.victory);
    },
    commands: [],
    commandSlots: 0,
    map: map`
..........
..........
..p[].....
..asd.2...
..fgh.....
..........
..........
..........`
  }
];

let level = 0;

const game = {
  commands: [],
  commandSlots: [],
  selected: 0,
  currentSlot: 0,
  canSelect: false,
  ephemeralObjects: [],
  ephemeralText: [],
  
  reset() {
    this.commands.forEach((obj) => obj.remove());
    this.commandSlots.forEach((obj) => obj.remove());

    // Last level is the win screen, there's no controls.
    if (level === levels.length - 1) {
      this.canSelect = false;
      return;
    }

    // Commands
    this.currentSlot = 0;
    this.commandSlots = [];
    for (let i = 0; i < levels[level].commandSlots; i++) {
      this.commandSlots.push(new Command(i + 1, 0, Command.commandTypes.empty, false));
    }

    this.selected = 0;
    this.commands = levels[level].commands.map((type, index) => new Command(index + 1, height() - 1, type, index === 0));
    this.commands.push(new Command(this.commands.length + 1, height() - 1, Command.commandTypes.erase, false));
    this.commands.push(new Command(this.commands.length + 1, height() - 1, Command.commandTypes.run, false));
    
    this.canSelect = true;
  },

  moveSelection(dir) {
    if (!this.canSelect) return;

    playTune(tunes.select);
    
    this.commands[this.selected].selected = false;

    if (dir === 'left') this.selected--;
    if (dir === 'right') this.selected++;

    if (this.selected < 0) {
      this.selected = this.commands.length - 1;
    } else if (this.selected > this.commands.length - 1) {
      this.selected = 0;
    }

    this.commands[this.selected].selected = true;
  },

  selectCommand() {
    if (!this.canSelect) return;
    
    playTune(tunes.confirm);
    
    if (this.commands[this.selected].type === Command.commandTypes.erase) {
      if (this.currentSlot === 0) return;
      
      this.commandSlots[--this.currentSlot].type = Command.commandTypes.empty;
    } else if (this.commands[this.selected].type === Command.commandTypes.run) {
      this.canSelect = false;
      this.commands[this.selected].selected = false;

      const step = (state) => () => {
        if (this.commandSlots[state.instr].type === Command.commandTypes.loop && !state.loop.looping) {
          state.loop.instr = state.instr;
          state.loop.iterations = 0;
          state.loop.looping = true;
        } else if (this.commandSlots[state.instr].type === Command.commandTypes.loopEnd && state.loop.looping) {
          if (++state.loop.iterations < this.commandSlots[state.loop.instr].value) {
            state.instr = state.loop.instr;
          } else {
            state.loop.looping = false;
          }
        }
        
        this.commandSlots[state.instr].execute();

        GameObject.step();
        
        if (state.instr !== this.commandSlots.length - 1 && this.commandSlots[state.instr + 1].type !== Command.commandTypes.empty) {
          // No loop ends or anything. Proceed to next instruction.
          state.instr++;
          setTimeout(step(state), 500);
        } else {
          const scrapCount = GameObject.getObjectsOfType(Scrap).length;

          // Reload the level or load the next level depending if all scraps were successfully
          // collected or not
          if (scrapCount === 0) {
            level++;
          }

          setTimeout(() => this.reloadLevel(levels[level]), 500);
        }
      };

      step({
        instr: 0,
        loop: {
          instr: 0,
          iterations: 0,
          looping: false
        }
      })();
    } else {
      if (this.currentSlot === this.commandSlots.length) return;

      this.commandSlots[this.currentSlot].value = this.commands[this.selected].value;
      this.commandSlots[this.currentSlot].type = this.commands[this.selected].type;
      this.currentSlot++;
    }
  },

  incrementSelectedValue() {
    if (!this.canSelect) return;

    if (this.commands[this.selected].incrementValue()) playTune(tunes.select);
  },

  decrementSelectedValue() {
    if (!this.canSelect) return;

    if (this.commands[this.selected].decrementValue()) playTune(tunes.select);
  },

  reloadLevel(level) {
    this.ephemeralObjects.forEach((obj) => obj.remove());
    this.ephemeralText.forEach((text) => text.remove());
    setMap(level.map);
    this.reset();
    level.onLoad(this.ephemeralObjects, this.ephemeralText);
  }
};

const legend = [];
for (const item in bitmaps) legend.push([ bitmaps[item].key, bitmaps[item].sprite ]);
setLegend(...legend);

game.reloadLevel(levels[level]);

onInput(inputs.menuLeft, () => game.moveSelection('left'));
onInput(inputs.menuRight, () => game.moveSelection('right'));
onInput(inputs.valueUp, () => game.incrementSelectedValue());
onInput(inputs.valueDown, () => game.decrementSelectedValue());
onInput(inputs.menuConfirm, () => game.selectCommand());
