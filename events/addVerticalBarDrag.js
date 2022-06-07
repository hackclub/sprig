

function pauseEvent(e) {
  if (e.stopPropagation) e.stopPropagation();
  if (e.preventDefault) e.preventDefault();
  e.cancelBubble = true;
  e.returnValue = false;
  return false;
}


export function addVerticalBarDrag(state, bodyListener) {
  let moveVerticalBar = false;

  bodyListener("mousedown", ".vertical-bar", (e) => {
    moveVerticalBar = true;
    console.log("move vert bar")
  });

  bodyListener("mousemove", "", (e) => {
    if (!moveVerticalBar) return;

    let x = (e.clientX / window.innerWidth) * 100;
    if (x === 0) return;

    const minX = 0;
    const maxX = 100;

    if (x < minX) x = minX;
    if (x > maxX) x = maxX;

    document.documentElement.style.setProperty("--vertical-bar", `${x}%`);

    pauseEvent(e);
  });

  bodyListener("mouseup", "", (e) => {
    moveVerticalBar = false;
  });

  bodyListener("mouseleave", "", (e) => {
    moveVerticalBar = false;
  });
}