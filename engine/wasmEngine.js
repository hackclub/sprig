// Tagged template literal factory go brrr
function _makeTag(cb) {
  return (strings, ...interps) => {
    if (typeof strings === "string") {
      throw new Error("Tagged template literal must be used like name`text`, instead of name(`text`)");
    }
    const string = strings.reduce((p, c, i) => p + c + (interps[i] ?? ''), '');
    return cb(string);
  }
}

const importObj = {
  env: {
    putchar: x => console.log(String.fromCharCode(x)),
    putint: console.log,
    oom: () => { throw new Error("sprite alloc overflow (TODO: gendex)"); }
  }
};

const load = {
  async deno() {
    const wasm_src = Deno.readFileSync("../c/build/base_engine.wasm");
    return await WebAssembly.instantiate(wasm_src, importObj);
  },
  async web() {
    const wasm_src = fetch("c/build/base_engine.wasm");
    return await WebAssembly.instantiateStreaming(wasm_src, importObj);
  }
};

const { instance } = await load[('Deno' in globalThis) ? 'deno' : 'web']();
const wasm = instance.exports;

export function wasmEngine() {

  const state = {
    texts: [],
    legend: [],
    deltas: { x: {}, y: {} },
  };

  /* opts: x, y, color (all optional) */
  function addText(str, opts={}) {
    const CHARS_MAX_X = 21;
    const padLeft = Math.floor((CHARS_MAX_X - str.length)/2);

    state.texts.push({
      x: opts.x ?? padLeft,
      y: opts.y ?? 0,
      color: opts.color ?? [10, 10, 40],
      content: str
    });
  }

  function clearText() {
    state.texts = [];
  }

  wasm.init();
  new Uint8Array(wasm.memory.buffer).fill(0);

  /* WASM helpers */
  const readByte = adr => new Uint8Array(wasm.memory.buffer, adr)[0];
  const readU32 = adr => new Uint32Array(wasm.memory.buffer, adr)[0];
  const memcpy = (str, adr) => {
    const buf = new Uint8Array(wasm.memory.buffer, adr)
    new TextEncoder().encodeInto(str, buf);
  };

  function addrToSprite(addr) {
    if (addr == 0) return undefined;
    return new Sprite(addr);
  }

  const ds = state.deltas;
  class Sprite {
    constructor(addr) { this.addr = addr; }

    set type(k) { wasm.sprite_set_kind(this.addr, k.charCodeAt(0)); }
    get type()  { return String.fromCharCode(wasm.sprite_get_kind(this.addr)); }

    set x(newX) { ds.x[this.addr] = wasm.map_move(this.addr, newX - this.x, 0); }
    get x()     { return wasm.sprite_get_x(this.addr); }

    set y(newY) { ds.y[this.addr] = wasm.map_move(this.addr, 0, newY - this.y); }
    get y()     { return wasm.sprite_get_y(this.addr); }

    get dx() { return ds.x[this.addr] || 0; }
    get dy() { return ds.y[this.addr] || 0; }

    get next() { return readU32(this.addr); }

    remove() { wasm.map_remove(this.addr); }
  }

  const api = {
    setMap: str => {
      const mem = wasm.temp_str_mem();
      memcpy(str.trim(), mem);
      wasm.map_set(mem);
    }, 

    addText,
    clearText,

    addSprite: (x, y, type) => addrToSprite(wasm.map_add(x, y, type.charCodeAt(0))),
    getGrid: () => {
      const iter = wasm.temp_MapIter_mem();
      const  width = wasm.map_width();
      const height = wasm.map_height();

      const grid = Array.from(
        { length: height * width },
        _ => [],
      );
      while (wasm.map_get_grid(iter)) {
        const sprite = addrToSprite(readU32(iter));
        const i = sprite.x + sprite.y*width;
        grid[i].push(sprite);
      }
      return grid;
    },
    getTile: (x, y) => {
      const iter = wasm.temp_MapIter_mem();
      wasm.MapIter_position(iter, x, y);

      const out = [];
      while (wasm.map_get_grid(iter)) {
        const sprite = addrToSprite(readU32(iter));
        if (sprite.x != x || sprite.y != y)
          break;
        out.push(sprite);
      }
      return out;
    },
    tilesWith: (...mustHave) => {
      const mustHave_mem = wasm.temp_str_mem();
      memcpy(mustHave.join(''), mustHave_mem);

      const iter = wasm.temp_MapIter_mem();
      const out = [];
      while (wasm.map_tiles_with(iter, mustHave_mem)) {
        const tile = [];
        let top = readU32(iter);
        do { tile.push(addrToSprite(top)); } while (top = readU32(top));
        out.push(tile);
      }
      return out;
    },
    clearTile: wasm.map_drill, 
    setSolids: solids => {
      wasm.solids_clear();
      for (const s of solids)
        wasm.solids_push(s.charCodeAt(0));
    }, 
    setPushables: push_table => {
      wasm.push_table_clear();
      for (const [pusher, pushesList] of Object.entries(push_table))
        for (const pushes of pushesList)
          wasm.push_table_set(pusher.charCodeAt(0), pushes.charCodeAt(0));
    },
    map: _makeTag(text => text),
    bitmap: _makeTag(text => text),
    tune: _makeTag(text => text),
    getFirst: char => addrToSprite(wasm.map_get_first(char.charCodeAt(0))),
    getAll: char => {
      const iter = wasm.temp_MapIter_mem();
      const step = char
        ? (() => wasm.map_get_all(iter, char.charCodeAt(0)))
        : (() => wasm.map_get_grid(iter));

      const out = [];
      while (step()) out.push(addrToSprite(readU32(iter)));
      return out;
    },
    width: () => wasm.map_width(),
    height: () => wasm.map_height(),
    // setBackground: (type) => { 
    //   _checkLegend(type);
    //   background = type;
    // }
  };

  return { api, state };
}
