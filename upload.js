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
  let timers = [];
  let id = 0;
  setTimeout  = (fn, ms) => (timers.push({ fn, ms, id }), id++);
  setInterval = (fn, ms) => (timers.push({ fn, ms, id, restartAt: ms }), id++);
  clearTimeout = clearInterval = id => {
    timers = timers.filter(t => t.id != id);
  };
  native.frame_cb(dt => {
    timers = timers.filter(tim => {
      if (tim.ms <= 0) {
        /* trigger their callback */
        tim.fn();

        /* in case they cleared themselves */
        if (!timers.some(t => t == tim))
          return false;

        /* restart intervals, clear timeouts */
        if (tim.restartAt !== undefined)
          tim.ms = tim.restartAt;
        else
          return false;
      }
      tim.ms -= dt;
      return true;
    });
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
  const ports = await navigator.serial.getPorts();
  if (ports.length !== 1) {
    dispatch("UPLOAD_LOG", "please pick a device.");
    return await navigator.serial.requestPort({
      filters: [
        { usbVendorId: 0x2e8a, usbProductId: 10 },
      ]
    });
  } else {
    return ports[0];
  }
}

/* don't await me, just let me sit on promise queue */
async function logSerialOutput(port) {
  async function* streamAsyncIterator(stream) {
    // Get a lock on the stream
    const reader = stream.getReader();

    try {
      while (true) {
        // Read from the stream
        const {done, value} = await reader.read();
        // Exit if we're done
        if (done) return;
        // Else yield the chunk
        yield value;
      }
    }
    finally {
      reader.releaseLock();
    }
  }

  console.log("for await on reader");
  const reader = port.readable.pipeThrough(new TextDecoderStream());
  let str = "";
  let flushtimeout = setTimeout(() => {}, 0);
  const flush = () => { console.log('[pico] ' + str); str = "" };
  for await (const val of streamAsyncIterator(reader)) {
    str += val;
    clearTimeout(flushtimeout);
    flushtimeout = setTimeout(flush, 10);
  }
}

async function uploadToSerial(message, writableStream) {
  // defaultWriter is of type WritableStreamDefaultWriter
  const defaultWriter = writableStream.getWriter();

  const buf = new TextEncoder().encode(message);
  console.log(new TextDecoder().decode(buf));

  await defaultWriter.ready;
  // await defaultWriter.write(new ArrayBuffer(htonl(message.length)));
  await defaultWriter.write(new Uint32Array([buf.length]).buffer);

  await defaultWriter.ready;
  await defaultWriter.write(buf);
  console.log(`wrote ${buf.length} chars`);

  // Ensure all are written before closing
  await defaultWriter.ready;
  defaultWriter.close();
}

export async function upload(code) {
  dispatch("SET_UPLOAD_STATE", "uploading");
  
  let serial;
  try {
    const port = await getPort();

    dispatch("UPLOAD_LOG", "port found, opening serial stream...");
    const start = Date.now();

    /* connect and begin logging output */
    await port.open({ baudRate: 115200 });
    logSerialOutput(port);
    dispatch("UPLOAD_LOG", "connected to rp2040!");
    
    await uploadToSerial(startupBurrito(code), port.writable);
    dispatch("UPLOAD_LOG", `upload complete in ${((Date.now() - start) / 1000).toFixed(2)}s! you may need to unplug and replug your device.`);
  } catch (error) {
    dispatch("UPLOAD_LOG", `error: ${error.toString()}`);
  }
  
  if (serial) serial.close();
  dispatch("SET_UPLOAD_STATE", "done");
}
