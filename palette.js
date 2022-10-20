export const palette = [
  // Grey
  ["0", [0, 0, 0, 255]],
  ["L", [73, 80, 87, 255]],
  ["1", [145, 151, 156, 255]],
  ["2", [248, 249, 250, 255]],

  // Red
  ["3", [235, 44, 71, 255]],
  ["C", [139, 65, 46, 255]],

  // Blue
  ["7", [25, 177, 248, 255]],
  ["5", [19, 21, 224, 255]],

  // Yellow
  ["6", [254, 230, 16, 255]],
  ["F", [149, 140, 50, 255]],

  // Green
  ["4", [45, 225, 62, 255]],
  ["D", [29, 148, 16, 255]],
  
  // Pink and purple
  ["8", [245, 109, 187, 255]],
  ["H", [170, 58, 197, 255]],

  // Orange
  ["9", [245, 113, 23, 255]],

  // Transparent
  [".", [0, 0, 0, 0]]
].map(([k, v]) => [k, v.map(Math.round)]);

export const transparentBg = `data:image/svg+xml,%0A%3Csvg width='23' height='23' viewBox='0 0 8 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='8' height='8' fill='white'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M0 0H4V4H0V0ZM4 4H8V8H4V4Z' fill='%23DCEFFC'/%3E%3C/svg%3E%0A`;

export const hexToRGBA = (hex) => {
  let [r, g, b, a = 255] = hex.match(/\w\w/g).map((x) => parseInt(x, 16));
  return [r, g, b, a];
};

export function RGBA_to_hex([r, g, b, a]) {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);
  a = a.toString(16);

  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;
  if (a.length == 1) a = "0" + a;

  return "#" + r + g + b + a;
}