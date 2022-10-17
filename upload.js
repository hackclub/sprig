import { Serial } from "./upload/serial.js";
import { transfer } from "./upload/ymodem.js";
import { dispatch } from "./dispatch.js";

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

async function getPort() {
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

const imports = `
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

  /* constructors */ bitmap, tune, map,

  /* input handling */ onInput, afterInput,

  /* how much sprite has moved since last onInput: sprite.dx, sprite.dy */

  playTune,
} = require("engine");
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

async function uploadToSerial(serial, code) {
  let respStr;
  serial.on("data", t => {
    for (let c of t) {
      if (c === 10) return;  // Newline
      if (c === 13) {        // Carriage return
        dispatch('UPLOAD_LOG', '< ' + respStr);
        respStr = '';
      }
      else respStr += String.fromCharCode(c);
    }
  })

  let disconnected = false;
  const checkDisconnect = () => {
    if (disconnected) throw new Error("Device disconnected unexpectedly");
  };
  serial.on("disconnect", () => disconnected = true)

  const write = (s) => {
    checkDisconnect();
    dispatch('UPLOAD_LOG', '> ' + s);
    return serial.write(s);
  }

  await write("\r.hi\r");
  await write("\r.reset\r");
  await write('\r')
  await write(".flash -w\r");
  await delay(500);

  dispatch("UPLOAD_LOG", "transferring file...");
  checkDisconnect();
  const result = await transfer(
    serial,
    "code",
    new TextEncoder().encode(startupBurrito(code))
  );
  dispatch("UPLOAD_LOG", `wrote ${result.writtenBytes}/${result.totalBytes} bytes`);
  await delay(500);
  checkDisconnect();
  await write("\r.reset\r");
  await write("\r.load\r");
}

export async function upload(code) {
  dispatch("SET_UPLOAD_STATE", "uploading");
  
  let serial;
  try {
    const port = await getPort();

    dispatch("UPLOAD_LOG", "port found, opening serial stream...");
    const start = Date.now();
    serial = new Serial(port);
    await serial.open({ baudRate: 115200 });
    dispatch("UPLOAD_LOG", "connected to rp2040!");
    
    await uploadToSerial(serial, code);
    dispatch("UPLOAD_LOG", `upload complete in ${((Date.now() - start) / 1000).toFixed(2)}s! you may need to unplug and replug your device.`);
  } catch (error) {
    dispatch("UPLOAD_LOG", `error: ${error.toString()}`);
  }
  
  if (serial) serial.close();
  dispatch("SET_UPLOAD_STATE", "done");
}
