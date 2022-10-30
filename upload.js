import { dispatch } from "./dispatch.js";

const imports = `
let setTimeout, setInterval, clearInterval, clearTimeout;
const {
  /* sprite interactions */ setSolids, setPushables,
  /*              see also: sprite.x +=, sprite.y += */

  /* art */ setLegend, setBackground,
  /* text */ addText, clearText,

  /*   spawn sprites */ setMap, addSprite,
  /* despawn sprites */ clearTile, /* sprite.remove() */

  /* tile queries */ getGrid, getTile, getFirst, getAll, tilesWith,
  /* see also: sprite.type */

  /* map dimensions */ width, height,

  /* constructors */ bitmap, tune, map, color,

  /* input handling */ onInput, afterInput,

  /* how much sprite has moved since last onInput: sprite.dx, sprite.dy */

  playTune,
} = (() => {
const exports = {};
/* re-exports from C; bottom of module_native.c has notes about why these are in C */
exports.setMap = map => native.setMap(map.trim());
exports.addSprite = native.addSprite;
exports.getGrid = native.getGrid;
exports.getTile = native.getTile;
exports.tilesWith = native.tilesWith;
exports.clearTile = native.clearTile;
exports.getFirst = native.getFirst;
exports.getAll = native.getAll;
exports.width = native.width;
exports.height = native.height;
exports.setBackground = native.setBackground;


/* opts: x, y, color (all optional) */
exports.addText = (str, opts={}) => {
  // console.log("engine.js:addText");
  const CHARS_MAX_X = 21;
  const padLeft = Math.floor((CHARS_MAX_X - str.length)/2);

  native.text_add(
    str,
    opts.color ?? [10, 10, 40],
    opts.x ?? padLeft,
    opts.y ?? 0
  );
}

exports.clearText = () => native.text_clear();


exports.setLegend = (...bitmaps) => {
  // console.log("engine.js:setLegend");
  native.legend_clear();
  for (const [charStr, bitmap] of bitmaps) {
    native.legend_doodle_set(charStr, bitmap.trim());
  }
  native.legend_prepare();
};

exports.setSolids = solids => {
  // console.log("engine.js:setSolids");
  native.solids_clear();
  solids.forEach(native.solids_push);
};

exports.setPushables = pushTable => {
  // console.log("engine.js:setPushables");
  native.push_table_clear();
  for (const [pusher, pushesList] of Object.entries(pushTable))
    for (const pushes of pushesList)
      native.push_table_set(pusher, pushes);
};

let afterInputs = [];
// exports.afterInput = fn => (console.log('engine.js:afterInputs'), afterInputs.push(fn));
exports.afterInput = fn => afterInputs.push(fn);

const button = {
  pinToHandlers: {
     "5": [],
     "7": [],
     "6": [],
     "8": [],
    "12": [],
    "14": [],
    "13": [],
    "15": [],
  },
  keyToPin: {
    "w":  "5",
    "s":  "7",
    "a":  "6",
    "d":  "8",
    "i": "12",
    "k": "14",
    "j": "13",
    "l": "15",
  }
};

native.press_cb(pin => {
  button.pinToHandlers[pin].forEach(f => f());

  afterInputs.forEach(f => f());

  native.map_clear_deltas();
});

{
  const timers = [];
  let id = 0;
  setTimeout  = (fn, ms) => (timers.push({ fn, ms, id }), id++);
  setInterval = (fn, ms) => (timers.push({ fn, ms, id, restartAt: ms }), id++);
  clearTimeout = clearInterval = id => {
    timers.splice(timers.findIndex(t => t.id == id), 1);
  };
  native.frame_cb(dt => {
    const errors = [];

    for (const tim of [...timers]) {
      if (!timers.includes(tim)) continue; /* just in case :) */

      if (tim.ms <= 0) {
        /* trigger their callback */
        try {
          tim.fn();
        } catch (error) {
          if (error) errors.push(error);
        }

        /* restart intervals, clear timeouts */
        if (tim.restartAt !== undefined)
          tim.ms = tim.restartAt;
        else
          timers.splice(timers.indexOf(tim), 1);
      }
      tim.ms -= dt;
    }

    /* we'll never need to throw more than one error -ced */
    if (errors.length > 0) throw errors[0];
  });
}

exports.onInput = (key, fn) => {
  // console.log("engine.js:onInput");
  const pin = button.keyToPin[key];

  if (pin === undefined)
    throw new Error(\`the sprig doesn't have a "\${key}" button!\`);

  button.pinToHandlers[pin].push(fn);
};

exports.playTune = () => {};

function _makeTag(cb) {
  return (strings, ...interps) => {
    if (typeof strings === "string") {
      throw new Error("Tagged template literal must be used like name\`text\`, instead of name(\`text\`)");
    }
    const string = strings.reduce((p, c, i) => p + c + (interps[i] ?? ''), '');
    return cb(string);
  }
}
exports.bitmap = _makeTag(text => text);
exports.tune = _makeTag(text => text);
exports.map = _makeTag(text => text);
exports.color = _makeTag(text => text);
return exports;
})();
`;

const startupSound = `
playTune(\`
150: c5~150 + g4~150 + e5^150,
150,
150: g5^150,
150,
150: b4~150 + d5^150 + g4~150,
150,
150: e5^150,
150,
150: a4~150 + f4~150 + c5^150,
150,
150: g4~150 + b4~150 + d5^150,
150,
150: g4~150 + e4~150 + c4~150 + e5^150 + c5~150 + g5~150,
2850
\`);
`;

/* wraps their code in a tortilla of startup menu goodness */
const startupBurrito = code => `
${imports}

${code}
`;

async function getPort() {
  if (navigator.serial === undefined)
    throw "your browser does not support the Web Serial API. please try again in a recent version of Chrome.";

  return await navigator.serial.requestPort({
    filters: [ { usbVendorId: 0x2e8a, usbProductId: 10 } ]
  });

  /* possibly return to this behavior when it is confirmed to work again */
  /*
   * const ports = await navigator.serial.getPorts();
   * if (ports.length !== 1) {
   *   dispatch("UPLOAD_LOG", "please pick a device.");
   *   return await navigator.serial.requestPort({
   *     filters: [
   *       { usbVendorId: 0x2e8a, usbProductId: 10 },
   *     ]
   *   });
   * } else {
   *   return ports[0];
   * }
   */
}

async function uploadToSerial(message, writer) {
  const buf = new TextEncoder().encode(message);
  console.log(new TextDecoder().decode(buf));

  console.log("ready 1");
  await writer.ready;
  console.log("ready 1 - writing startup seq");
  await writer.write(new Uint8Array([0, 1, 2, 3, 4]).buffer);

  // await writer.write(new ArrayBuffer(htonl(message.length)));
  console.log("ready 2");
  await writer.ready;
  console.log("ready 2 - writing len");
  await writer.write(new Uint32Array([buf.length]).buffer);

  console.log("ready 3");
  await writer.ready;
  console.log("ready 3 - writing source");
  const ticker = setInterval(() => console.log("writing src - 300ms passed"), 300);
  await writer.write(buf);
  clearInterval(ticker);
  console.log(`wrote ${buf.length} chars`);

  // Ensure all are written before closing
  await writer.ready;
}

export async function upload(code) {
  dispatch("SET_UPLOAD_STATE", "uploading");
  
  let port;
  try {
    port = await getPort();

    dispatch("UPLOAD_LOG", "port found, opening serial stream...");
    const start = Date.now();

    /* connect and begin logging output */
    await port.open({ baudRate: 115200 });
    dispatch("UPLOAD_LOG", "connected to rp2040!");

    const textDecoder = new TextDecoderStream();
    const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
    const reader = textDecoder.readable.getReader();

    /* listen to data coming from the serial device. */
    const receivedEOT = new Promise(res => {
      (async () => {
        try {
          while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            if (value.indexOf("ALL_GOOD") >= 0) res();
            console.log(value);
          }
        } catch(e) {
          console.error(e);
        }
        finally {
          reader.releaseLock();
        }
      })();
    });

    const writer = port.writable.getWriter();
    await uploadToSerial(startupBurrito(code), writer);

    await receivedEOT;

    reader.cancel();
    console.log("waiting on close");
    await readableStreamClosed.catch(_ => {/* ignore */});
    console.log("readable closed");

    console.log("writer releasing");
    writer.releaseLock();
    console.log("writer released");

    const elapsed = ((Date.now() - start) / 1000).toFixed(2);
    dispatch("UPLOAD_LOG", `upload complete in ${elapsed}s! ` +
                           `you may need to unplug and replug your device.`);
  } catch (error) {
    if (error)
      dispatch("UPLOAD_LOG", `error: ${error.toString()}`);
    else
      console.log("undefined error!");
  }
  
  if (port) await port.close();
  dispatch("SET_UPLOAD_STATE", "done");
}
