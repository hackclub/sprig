

export function addVerticalBar(state, bodyListener) {
  let moveBar = false;

  bodyListener("mousedown", ".vertical-bar", (e) => {
    moveBar = true;
  });

  bodyListener("mousemove", "", (e) => {
    if (!moveBar) return;

    let x = ((e.clientX - 30) / (window.innerWidth - 40)) * 100;
    if (x === 0) return;

    const minX = 2;
    const maxX = 98;

    if (x < minX) x = minX;
    if (x > maxX) x = maxX;

    document.documentElement.style.setProperty("--editor-width", `${x}%`);

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

