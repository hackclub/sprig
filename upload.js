import { Serial } from "./upload/serial.js"
import { transfer } from "./upload/ymodem.js"

let serial;

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

function fmtImageData(imgData) {
  const pixels = [...imgData.data];
  const { width: w, height: h } = imgData;

  const bytes = new Uint8Array(w*h*2);
  const color16 = (r, g, b) =>
    ((r & 0xF8) << 8) | ((g & 0xFC) << 3) | (b >> 3);

  for (let x = 0; x < w; x++)
    for (let y = 0; y < h; y++) {
      let i = (y*w + x);
      const [r, g, b, a] = pixels.slice(i*4, (i + 1)*4);
      if (a < 255) continue;
      const col = color16(Math.max(b, 5),
                   Math.max(g, 5),
                   Math.max(r, 5));
      bytes[i*2+0] = col >> 8;
      bytes[i*2+1] = col;
    }
  const data = new Uint16Array(bytes.buffer);

  return `{
    data: new Uint16Array([${[...data]}]),
    width: ${w},
    height: ${h}
  }`;
}

let index;
const games = {
  list: (() => {
    const raw = JSON.parse(localStorage.getItem('beaker-games') ?? '[]');
    const list = Array.isArray(raw) ? raw : [];
    return [...Array(3)].map((x, i) => list[i] ?? {
      name: "<empty>",
      code: '',
    });
  })(),
  save() {
    localStorage.setItem('beaker-games', JSON.stringify(this.list));
  },
  add(code) {
    do {
      index = prompt(`
Your Beaker has 3 slots:
${this.list.map((x, i) => `[${i}] - ${x?.name}`).join("\n")}
Where shall we write your game? [0, 1, 2]
      `)
      if (index == null) return null;
    } while(!["0", "1", "2"].includes(index));
    index = +index;

    let name;
    while (!(name = prompt(`What do you call your game?`)));

    alert(`Press upload again to write "${name}" to slot ${index}!`);

    this.list[index] = { code, name };
    this.save();
  }
};

function flash() {
  const textImg = (text, width=80, height=16) => {
    const offscreen = document.createElement("canvas");
    offscreen.width = width;
    offscreen.height = height;
    const octx = offscreen.getContext("2d");
    octx.fillStyle = "white";
    octx.fillRect(0, 0, 108, 108);
    octx.fillStyle = "black";
    octx.fillText(text, 2, 10);
    return octx.getImageData(0, 0, width, height);
  }
  const t0 = textImg("maze game");
  const t1 = textImg("suckyban");

  return `
    const games = [
      ${games.list.map(({ name, code }) => `{
        code: \`${code.replaceAll("`", "\\`")}\`,
        img: ${fmtImageData(textImg(name))},
      }`).join(",\n")}
    ];
    const cr = ${fmtImageData(textImg(">", 16, 16))};

    /* input */
    const { GPIO } = require("gpio");
    const btn = pin => ({
      last: 1,
      pin: new GPIO(pin, INPUT_PULLUP),
      read() {
        const now = this.pin.read();
        return (now != this.last && !(this.last = now));
      }
    });
    const down = btn(0);
    const open = btn(1);

    /* drawin */
    const width = 128, height = 160;
    const pixels = new Uint16Array(width * height);
    const { rfill, sprdraw } = global.require("native");
    const { screen } = require("screen");

    const gc = screen.getContext("buffer");

    let ts = 0;
    let i = 0;
    const loop = (function loop() {
      i = (i + down.read()) % games.length;
      if (open.read()) {
        if (games[i].code) {
          eval(games[i].code);
          return;
        }
        console.log("there's no game there!");
      }
      rfill(pixels, gc.color16(255, 255, 255), width*height);

      let y = 20;
      for (const { img } of games) {
        sprdraw(img.data, img.width, img.height, pixels, 30, y);
        y += 30
      }
      let t = Math.sin(ts++ / 5) * 4;
      sprdraw(cr.data, cr.width, cr.height, pixels, 10+t, 20+30*i);
      
      const pixels8 = new Uint8Array(pixels.buffer);
      screen.fillImage(0, 0, width, height, pixels8);
      setTimeout(loop, 1000/20);
    })();
  `;
}

export async function upload(code) {
  if (index == undefined) {
    games.add(code);
    return;
  }
  games.list[index].code = code;

  if (!serial) {
    const port = await navigator.serial.requestPort();
    serial = new Serial(port);
    await serial.open({ baudRate: 115200 });

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
  }

  await serial.write("\r");
  await serial.write(".flash -w\r");
  await delay(500);

  const result = await transfer(serial, "code",
    new TextEncoder().encode(flash()));
  console.log('ymodem transfer result: ', result);
  await delay(500);
  serial.write("\r.load\r");
}
