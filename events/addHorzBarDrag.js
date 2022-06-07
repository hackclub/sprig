

export function addHorzBarDrag(state, bodyListener) {
  let moveBar = false;

  bodyListener("mousedown", ".horizontal-bar", (e) => {
    moveBar = true;
  });

  bodyListener("mousemove", "", (e) => {
    if (!moveBar) return;

    let y = (e.clientY / window.innerHeight) * 100;
    if (y === 0) return;

    const minY = 0;
    const maxY = 100;

    if (y < minY) y = minY;
    if (y > maxY) y = maxY;

    document.documentElement.style.setProperty("--horizontal-bar", `${y}%`);

    pauseEvent(e);
  });

  bodyListener("mouseup", "", (e) => {
    moveBar = false;
  });

  bodyListener("mouseleave", "", (e) => {
    moveBar = false;
  });
}

function pauseEvent(e) {
  if (e.stopPropagation) e.stopPropagation();
  if (e.preventDefault) e.preventDefault();
  e.cancelBubble = true;
  e.returnValue = false;
  return false;
}

