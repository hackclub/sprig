import { dispatch } from "./dispatch.js";
import { addDropUpload } from "./events/addDropUpload.js";
import { addVerticalBarDrag } from "./events/addVerticalBarDrag.js";

const trigger = (e) => e.composedPath()[0];
const matchesTrigger = (e, selectorString) =>
  trigger(e).matches(selectorString);
// create on listener
export const createListener =
  (target) => (eventName, selectorString, event) => {
    // focus doesn't work with this, focus doesn't bubble, need focusin
    target.addEventListener(eventName, (e) => {
      e.trigger = trigger(e); // Do I need this? e.target seems to work in many (all?) cases
      if (selectorString === "" || matchesTrigger(e, selectorString)) event(e);
    });
  };

export function addEvents(state) {
  const bodyListener = createListener(document.body);
  bodyListener("keydown", "", function (event) {
    let code = event.code;

    if (code === "Enter" && (event.shiftKey || event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      dispatch("RUN");
    }
  });

  bodyListener("mousedown", ".docs-trigger", function (event) {
    const setPerc = n => document.documentElement.style.setProperty("--docs-percentage", `${n}%`);
    
    const perc = getComputedStyle(document.documentElement).getPropertyValue("--docs-percentage");
    console.log("open/close docs", perc);

    if (perc.trim() === "0%") setPerc(65);
    else setPerc(0);
  });

  addVerticalBarDrag(state, bodyListener);
  // addNumberDragging(state, bodyListener);
  addDropUpload(state, bodyListener);
}