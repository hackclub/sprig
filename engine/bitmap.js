// At odds with in-game behavior... doesn't enforce a size with stretching.
export function bitmapTextToImageData(string, palette) {
  const rows = string.trim().split("\n").map(x => x.trim());
  const rowLengths = rows.map(x => x.length);
  const isRect = rowLengths.every(val => val === rowLengths[0])
  if (!isRect) console.error("Level must be rect.");
  const width = rows[0].length || 1;
  const height = rows.length || 1;
  const data = new Uint8ClampedArray(width*height*4);
  
  const colors = Object.fromEntries(palette);
  
  for (let i = 0; i < width*height; i++) {
    const type = string.split("").filter(x => x.match(/\S/))[i];

    if (!(type in colors)) console.error("unknown color:", type);

    const [ r, g, b, a ] = colors[type] ?? colors["."];
    data[i*4] = r;
    data[i*4 + 1] = g;
    data[i*4 + 2] = b;
    data[i*4 + 3] = a;
  }

  return new ImageData(data, width, height);
}