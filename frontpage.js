import md5 from "https://cdn.skypack.dev/md5";

const lerp = (a, b, t) => (1 - t) * a + t * b;
const invLerp = (a, b, v) => (v - a) / (b - a);

// input: h as an angle in [0,360] and s,l in [0,100] 
// output: r,g,b in [0,1]
function hsl2rgb(h,s,l) {
  s /= 100, l /= 100;
  let a=s*Math.min(l,1-l);
  let f= (n,k=(n+h/30)%12) => l - a*Math.max(Math.min(k-3,9-k,1),-1);
  return [f(0),f(8),f(4)];
}   

function imageData2Image(imagedata, x=0, y=0, w, h) {
  let canvas = document.createElement('canvas');
  let ctx = canvas.getContext('2d');
  canvas.width = w ?? imagedata.width;
  canvas.height = h ?? imagedata.height;
  ctx.putImageData(imagedata, -x, -y);

  let image = new Image();
  image.src = canvas.toDataURL();
  return image;
}

const hslToStr = ([a, b, c]) => `hsl(${a}, ${b}%, ${c}%)`;

const fetchSave = id => fetch(
  `https://project-bucket-hackclub.s3.eu-west-1.amazonaws.com/${id}.json`,
  { mode: "cors" },
).then(r => r.json());
const demoPromise = Promise.all([
  "825d394e021e6ce1dfae5ff2f100359a",
  "36606d745f5b4c6766c66b3a9a1f9de8",
  "71f946d43f0f4728e8a9d19209bf1512",
  "7a2e9404c3890f96ab5251dadaba4cf3",
  "554f55ea7f07f7a896ec5ab394876f60",
].map(fetchSave))


/* takes saves of games, turns their logo sprites into images, + titles */
const gameLogos = games => games
  .reduce((acc, save) => {
    const { name, assets } = save;
    const sprite = assets.find(x => x.name == "logo") ??
                   assets.find(x => x.type == "sprite");
    if (!sprite) return acc;

    const pixels = new Uint8ClampedArray(sprite.data.colors.flat());
    const imageData = new ImageData(pixels, 32, 32);

    /* sprite.bounds doesn't reliably exist (idk), so we recalc */
    const pMap = sprite.data.colors;
    const axes = { x: { min: 32, max: 0 },
                   y: { min: 32, max: 0 } };
    const minmax = (axes, v) => 
     (axes.min = Math.min(v, axes.min),
      axes.max = Math.max(v, axes.max));
    for (const i in pMap) {
      const [_r, _g, _b, alpha] = pMap[i];
      const x = i % 32,
            y = Math.floor(i / 32);
      if (alpha > 0)
        minmax(axes.x, x),
        minmax(axes.y, y);
    }

    const x = axes.x.min,
          y = axes.y.min,
          w = 1 + axes.x.max - x,
          h = 1 + axes.y.max - y;
    const logo = imageData2Image(imageData, x, y, w, h);
    return [...acc, { title: name, logo, save }];
  }, []);

export default async ({ canvas, onSaveClick, buttons }) => {
  canvas.id = "frontpage";
  const ctx = canvas.getContext("2d");


  const d = document.createElement("div");
  d.style.background = "black";
  d.appendChild(canvas);
  document.body.appendChild(d);
  document.getElementById("root").style.zIndex = -1;

  let drawing = true;
  const exit = () => {
    drawing = false;
    document.getElementById("root").style.zIndex = 0;
  }

  let scale, dx, dy;
  (window.onresize = () => {
    if (document.getElementById("frontpage")) {
      scale = Math.min(window.innerWidth/16, window.innerHeight/9);
      canvas.width = scale*16;
      canvas.height = scale*9;

      d.style.width = window.innerWidth + "px";
      d.style.height = window.innerHeight + "px";

      canvas.style.transform = `translate(
        ${dx = (window.innerWidth  - canvas.width)/2}px,
        ${dy = (window.innerHeight - canvas.height)/2}px
      )`;
      ctx.imageSmoothingEnabled = false;
    }
  })();

  const MAX_SCALE = 100;
  let mouse = { x: 0, y: 0 };
  let mouseDown = false;
  let mouseDownPos = { x: 0, y: 0 };
  const pagePos = ({ pageX: x, pageY: y }) => ({
    x: x * MAX_SCALE/scale - dx,
    y: y * MAX_SCALE/scale - dy
  });
  canvas.onmousemove = ev => mouse = pagePos(ev);
  canvas.onmousedown = ev => {
    mouseDown = true;
    mouseDownPos = pagePos(ev);
  };
  canvas.onmouseup = () => mouseDown = false;

  const art = Object.fromEntries(await Promise.all(
    ["wing", "ocean", "pillars", "windows", "btn2", "btn1"]
      .map(name => new Promise(res => {
        const asset = new Image();
        asset.onload = () => res([name, asset]);
        asset.src = `assets/${name}.png`;
      }))
  ));

  const wingData = (() => {
    const offscreen = document.createElement("canvas");
    const { width, height } = art.wing;
    offscreen.width = width;
    offscreen.height = height;
    const octx = offscreen.getContext("2d");
    ctx.drawImage(art.wing, 0, 0);
    return ctx.getImageData(0, 0, width, height);
  })();
  const wings = {
    purple: { hsl: [300, 100, 25] },
    maroon: { hsl: [0, 100, 25] },
    darkblue: { hsl: [240, 100, 25] }
  };
  for (const [name, { hsl }] of Object.entries(wings)) {
    const tintRGB = hsl2rgb(...hsl).map(x => x * 255);
    const data = new ImageData(wingData.width, wingData.height);
    for (let i = 0; i < wingData.data.length; i += 4) {
      let r, g, b;
      const rgb = [r, g, b] = wingData.data.slice(i, i+3);

      const average = (r + g + b) / 3;
      const blueness = (b - average) / 64;

      [r, g, b] = rgb.map((x, i) => lerp(x, tintRGB[i], blueness))
      data.data[i+0] = r;
      data.data[i+1] = g;
      data.data[i+2] = b;
      data.data[i+3] = wingData.data[i+3];
    }
    wings[name].img = imageData2Image(data);
  }

  const demos = gameLogos(await demoPromise);
  const games = gameLogos(JSON.parse(localStorage['hc-game-lab']) ?? []);

  requestAnimationFrame(function frame(now) {
    if (drawing) requestAnimationFrame(frame);

    (() => {
      ctx.save();

      const { width, height } = art.ocean;
      ctx.scale(canvas.width  /  width,
                canvas.height / height);

      const pan = (img, speed) => {
        const w = img.width;
        ctx.drawImage(img, (now / speed) % w, 0);
        ctx.drawImage(img, (now / speed) % w - w*Math.sign(speed), 0);
      };

      pan(art.ocean, 300);
      pan(art.windows, 200);
      pan(art.pillars, 100);

      ctx.restore();
    })();

    ctx.save();
    ctx.scale(scale/MAX_SCALE, scale/MAX_SCALE);

    const cloud = (() => {
      const circles = [];
      for (let i = 0; i < 31; i++) {
        let t = (0.5 - i/30);

        const q = Math.sin(t * 400 + now / 1000)/2;
        const r = q * (0.5 - Math.abs(t));
        const x =     140 - t * 350,
              y = r * 140          ;

        const v = 0.3;
        circles.push({
          x,
          y,
          radius: 65 * (1 - Math.abs(t)),
          brightness: ((1-v) + v * (1-r)) * 245,
        });
      }

      const offscreen = document.createElement("canvas");
      const scale = 0.14;
      const w = 450 * 0.8, h = 250 * 0.8;
      offscreen.width = w * scale;
      offscreen.height = h * scale;
      const octx = offscreen.getContext("2d");

      octx.scale(scale * 0.8, scale * 0.8);
      octx.translate(80, 120);

      const circle = (x, y, radius) => {
        octx.beginPath();
        octx.arc(x, y, radius, 0, Math.PI*2);
        octx.fill();
      }

      const setFill = b => octx.fillStyle = `rgb(${b}, ${b-20}, ${b})`;
      for (let i = 0; i < 5; i++)
        for (const { x, y, radius, brightness: b } of circles)
          setFill(b * 0.65), circle(x, y, radius*1.1);

      for (const { x, y, radius, brightness: b } of circles)
        setFill(b), circle(x, y, radius);

      return () => ctx.drawImage(offscreen, 5-w/2, -h/2, w, h);
    })();


    (() => {
      const drawWing = (wingImg, x, y, ay, dir, flip, scale=1) => {
        ctx.save();
        ctx.translate(x, y);
        scale *= 3;
        ctx.scale(scale * dir, scale);

        const TAU = Math.PI * 2;
        let t = ((ay + now / 300 + ((flip < 0) ? Math.PI : 0)) % TAU) / TAU;
        const tM = 0.5, vM = 0.75;
        if (t < tM) t = lerp(0, vM, invLerp(0, tM, t));
        else        t = lerp(vM, 1, invLerp(tM, 1, t));
        ctx.rotate(Math.sin(t * TAU) * (2/8)*Math.PI)
        const { width, height } = art.wing;
        ctx.drawImage(wingImg, -width*0.8, -height*0.8);
        ctx.restore();
      };

      const text = (text, fontSize, color, maxWidth) => {
        ctx.font = `${fontSize}px "SFPixelateShadedRegular"`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillStyle = color;
        ctx.fillText(text, 0, 0, maxWidth);
      }

      const button = ({
        x: ax, y: ay,
        wing, center, width, height,
        wingScale, flip=1, onClick
      }) => {
        ctx.save();
        const w = width;
        const t = flip * Math.sin(ax*0.015 + ay + now / 300);
        const x = ax + 150 + w/2 + 10 * t, y = ay + 15 * t;

        const posHovers = pos => Math.abs(mouse.x - x) < w/2 &&
                                 Math.abs(mouse.y - y) < height/2;
        const hover = posHovers(mouse);
        if (mouseDown && posHovers(mouseDownPos))
          mouseDown = false, onClick(exit);

        ctx.translate(x, y);
        ctx.rotate(t * (2/70) * Math.PI);

        center(x, y, hover);

        drawWing(wing.img, w/-2, 0, ay,  1, flip, wingScale);
        drawWing(wing.img, w/ 2, 0, ay, -1, flip, wingScale);
        ctx.restore();
      };

      let x, y, w;

      x = 16*MAX_SCALE;
      const columns = [
        { logos: demos, buttonArt: art.btn2, wing: wings.darkblue },
        { logos: games, buttonArt: art.btn1, wing: wings.purple },
      ];
      for (const { logos, buttonArt, wing } of columns) {
        w = 150;
        x -= 400;
        y = -100;
        for (const { title, logo, save } of logos)
          button({
            width: w,
            height: w,
            flip: 0.2,
            onClick: exit => onSaveClick(save, exit),
            center: (x, y, hover) => {
              const centered = (i, w, h=w) =>
                ctx.drawImage(i, -w/2, -h/2, w, h);
              centered(buttonArt, 140);

              ctx.translate(0, 35);
              text(title, 30, hover ? 'crimson' : 'black', w * 0.7);

              ctx.translate(0, 35*-1.5);
              centered(logo, 64 * (logo.width / logo.height), 64);
            },
            wingScale: 0.8,
            wing,
            x,
            y: y += 230*0.8,
          });
      }

      w = 350;
      x = 0, y = 0;
      for (const i in buttons) {
        const wing = wings[['maroon', 'purple', 'darkblue'][i % 3]];
        button({
          onClick: buttons[i].onClick,
          width: w,
          height: 80,
          center: (x, y, hover) => {
            cloud(x, y);
            const color = hover ? "crimson" : hslToStr(wing.hsl)
            text(buttons[i].name, 50, color, w * 0.85);
          },
          wing,
          x: x + 40 * (2-(i%2)),
          y: y += 230,
          flip: (i % 2) ? -1 : 1,
        });
      }

    })();

    ctx.restore();
  });
}
