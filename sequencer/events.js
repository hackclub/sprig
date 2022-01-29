// import { addPanZoom } from "./panZoom.js";
// import { r } from "./sequencer.js";

function pauseEvent(e) {
    if(e.stopPropagation) e.stopPropagation();
    if(e.preventDefault) e.preventDefault();
    e.cancelBubble=true;
    e.returnValue=false;
    return false;
}

window.pauseEvent = pauseEvent;

const trigger = e => e.composedPath()[0];
const matchesTrigger = (e, selectorString) => trigger(e).matches(selectorString);
// create on listener
const createListener = (target) => (eventName, selectorString, event) => { // focus doesn't work with this, focus doesn't bubble, need focusin
  target.addEventListener(eventName, (e) => {
    e.trigger = trigger(e); // Do I need this? e.target seems to work in many (all?) cases
    if (selectorString === "" || matchesTrigger(e, selectorString)) event(e);
  })
}

export function addEvents(state, r) {
  // const svg = document.querySelector("svg");
  // svg.panZoomParams = addPanZoom(svg);
  // state.panZoomParams = svg.panZoomParams;

  const body = document.querySelector("body");
  const listenBody = createListener(body);

  window.addEventListener("resize", r);


  listenBody("keyup", "", (e) => {
    const string = state.codemirror.view.state.doc.toString();
    state.cellTypes[state.cellType] = string;

    state.spaceDown = false;
  })

  listenBody("keydown", "", (e) => {
    if (e.key === " ") state.spaceDown = true;
  })
}
