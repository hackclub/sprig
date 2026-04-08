import { readFile } from "node:fs/promises";
import { parentPort, workerData } from "node:worker_threads";
import { baseEngine } from "../engine/dist/base/index.js";

const { name } = workerData;

function simEngine() {
  let { api, state } = baseEngine();

  let intervals = [];
  let timeouts = [];

  timeouts.forEach(clearTimeout);
  timeouts = [];
  api.setTimeout = () => {};

  intervals.forEach(clearInterval);
  intervals = [];
  api.setInterval = () => {};

  let tileInputs = {
    w: [], s: [], a: [], d: [],
    i: [], j: [], k: [], l: [],
  };
  let afterInputs = [];
  function onInput(type, fn) {
    if (!(type in tileInputs)) throw new Error(
      `Unknown input key, "${type}": expected one of ${Object.keys(tileInputs).join(', ')}`
    );
    tileInputs[type].push(fn);
  }
  function afterInput(fn) {
    afterInputs.push(fn);
  }

  let jsr = 0x5EED;
  const random = () => {
    jsr ^= (jsr << 17);
    jsr ^= (jsr >> 13);
    jsr ^= (jsr << 5);
    return (jsr >>> 0) / 4294967295;
  };
  api = {
    getState: () => { throw new Error(" BAD! NO! ") },
    playTune: () => ({ end: () => {}, isPlaying: () => false }),
    setBackground: (type) => {},
    onInput, afterInput,
    setLegend: (...bitmaps) => {
      bitmaps.forEach(([key, value]) => {
        if (key.length !== 1) throw new Error(`Bitmaps must have one character names.`);
      });
      state.legend = bitmaps;
    },
    ...api,
    console: { log: () => {} },
    Math: new Proxy({}, {
      get(target, prop, receiver) {
        if (prop == "random") return random;
        return Reflect.get(Math, prop, Math);
      }
    }),
  };

  return {
    api,
    cleanup: () => {
      timeouts.forEach(clearTimeout);
      intervals.forEach(clearInterval);
      intervals = [];
      timeouts = [];
    },
    simulateKey: key => {
      const VALID_INPUTS = ["w", "a", "s", "d", "i", "j", "k", "l"];
      if (!VALID_INPUTS.includes(key)) return;
      for (const valid_key of VALID_INPUTS)
        if (key == valid_key)
          tileInputs[key].forEach(fn => fn());
      afterInputs.forEach(f => f());
      state.sprites.forEach(s => { s.dx = 0; s.dy = 0; });
    }
  };
}

try {
  const script = await readFile(`./games/${name}`, 'utf-8');
  const { api, cleanup, simulateKey } = simEngine();

  const choose = arr => arr[Math.floor(Math.random() * arr.length)];
  const keys = [...Array(1000)].map(_ => choose("wasdjilk".split('')));

  const fn = new Function(...Object.keys(api), script);
  fn(...Object.values(api));

  for (const key of keys) {
    simulateKey(key);
  }

  cleanup();
  parentPort.postMessage({ ok: true });
} catch (e) {
  parentPort.postMessage({ ok: false, error: e.message });
}
