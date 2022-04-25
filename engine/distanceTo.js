
function is_overlapping_range(x1, x2, y1, y2) {
  return Math.max(x1, y1) <= Math.min(x2, y2);
}

export function distanceTo(obj0, obj1) {
  // me is obj1, them is obj0

  let top = Infinity;
  let right = Infinity;
  let bottom = Infinity;
  let left = Infinity;

  // top is obj0 top - obj1 bottom if below and left and right are in bounds
  let x0 = obj0.x - obj0.origin[0] * obj0.width;
  let y0 = obj0.y - obj0.origin[1] * obj0.height;
  let x1 = obj1.x - obj1.origin[0] * obj1.width;
  let y1 = obj1.y - obj1.origin[1] * obj1.height;

  const overlapX = is_overlapping_range(
    x0,
    x0 + obj0.width,
    x1,
    x1 + obj1.width
  );
  const overlapY = is_overlapping_range(
    y0,
    y0 + obj0.height,
    y1,
    y1 + obj1.height
  );

  if (overlapX) {
    top = -(y0 + obj0.height - y1);
    bottom = -(y1 + obj1.height - y0);
  }

  if (overlapY) {
    left = -(x0 + obj0.width - x1);
    right = -(x1 + obj1.width - x0);
  }

  return { top, right, bottom, left };
}
