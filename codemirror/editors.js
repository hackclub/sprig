import { EditorView, WidgetType, Decoration } from "@codemirror/view";
import { StateField } from "@codemirror/state";
import { syntaxTree, foldService } from "@codemirror/language";
import { getTag } from "./util.js";
import { dispatch } from "../dispatch.js";

const pairs = [
  [ "bitmap", "bitmap" ],
  [ "tune", "sequencer" ],
  [ "map", "map" ]
]

export class OpenButtonWidget extends WidgetType {
  constructor(label, editorType, text, from, to) {
    super();
    
    this.label = label;
    this.editorType = editorType;
    this.text = text;
    this.from = from;
    this.to = to;
  }

  eq(other) { return other.text === this.text && other.from === this.from && other.to === this.to; }
  ignoreEvent() { return false; }

  toDOM() {
    const container = document.createElement("span");
    container.classList.add("cm-open-button");
    
    const button = container.appendChild(document.createElement("button"));
    button.textContent = this.label;
    button.addEventListener("click", () => this.onClick());

    if (this.editorType === "bitmap") container.appendChild(document.createElement("bitmap-preview")).setAttribute("text", this.text);

    return container;
  }

  updateDOM(container) {
    const oldButton = container.children[0];
    const button = oldButton.cloneNode(true); // This'll remove all event listeners.
    button.addEventListener("click", () => this.onClick());
    container.replaceChild(button, oldButton);

    if (this.editorType === "sprite") container.querySelector("bitmap-preview").setAttribute("text", this.text);

    return true;
  }

  onClick() {
    dispatch("SET_EDIT_RANGE", {
      range: [this.from, this.to]
    });

    dispatch("SET_ASSET_EDITOR", {
      type: this.editorType,
      text: this.text,
    });

  }
}

function makeValue(state) {
  const widgets = [];
  const foldRanges = [];
  
  const syntax = syntaxTree(state);
  syntax.iterate({
    enter(node) {
      for (const [label, editorType] of pairs) {
        const tag = getTag(label, node, syntax, state.doc);
        if (!tag) continue;
        const decoration = Decoration.replace({
          widget: new OpenButtonWidget(label, editorType, tag.text, tag.textFrom, tag.textTo)
        });
        widgets.push(decoration.range(tag.nameFrom, tag.nameTo));
        foldRanges.push({ from: tag.textFrom, to: tag.textTo });
        break;
      }
    }
  })

  return {
    decorations: Decoration.set(widgets),
    foldRanges
  };
}

export default StateField.define({
  create(state) {
    return makeValue(state);
  },
  update(value, transaction) {
    if (transaction.docChanged) {
      return makeValue(transaction.state);
    } else {
      return {
        ...value,
        decorations: value.decorations.map(transaction.changes)
      };
    }
  },
  provide(field) {
    return [
      EditorView.decorations.from(field, value => value.decorations),
      foldService.from(field, value => (_, lineStart, lineEnd) => (
        value.foldRanges.find(range => range.from >= lineStart && range.from <= lineEnd) ?? null
      ))
    ];
  }
});