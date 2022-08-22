import { Serial } from "./upload/serial.js"
import { transfer } from "./upload/ymodem.js"

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
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

async function uploadToSerial(serial, code) {

  let respStr;
  serial.on("data", t => {
    for (let c of t) {
      if (c == 10) return;
      if (c == 13) {
        console.log(respStr);
        respStr = '';
      }
      else respStr += String.fromCharCode(c);
    }
  })

  serial.write("\r.hi\r");

  await serial.write("\r");
  await serial.write(".flash -w\r");
  await delay(500);

  const result = await transfer(
    serial,
    "code",
    new TextEncoder().encode(imports + startupSound + code)
  );
  console.log('ymodem transfer result: ', result);
  await delay(500);
  serial.write("\r.load\r");
  alert("upload complete! you may need to unplug and replug your device.");
}

export async function upload(code) {
  const port = await navigator.serial.requestPort();
  const serial = new Serial(port);
  await serial.open({ baudRate: 115200 });

  uploadToSerial(serial, code)
    .catch(console.error)
    .finally(() => serial.close());
}
