import { EditorView, WidgetType, Decoration } from "@codemirror/view";
import { StateField } from "@codemirror/state";
import { syntaxTree, foldService } from "@codemirror/language";
import { getTag } from "./util.js";
import { dispatch } from "../dispatch.js";
import { global_state } from "../global_state.js";

const pairs = [
  [ "bitmap", "image", "bitmap" ],
  [ "tune", "musical-notes", "sequencer" ],
  [ "map", "map", "map" ],
  [ "color", "color-palette", "palette" ]
]

export class OpenButtonWidget extends WidgetType {
  constructor(label, icon, editorType, text) {
    super();
    
    this.label = label;
    this.icon = icon;
    this.editorType = editorType;
    this.text = text;
  }

  eq(other) {
    return other.label === this.label &&
      other.icon === this.icon &&
      other.editorType === this.editorType &&
      other.text === this.text;
  }
  ignoreEvent() { return true; }

  toDOM() {
    const container = document.createElement("span");
    container.classList.add("cm-open-button");
    
    const button = container.appendChild(document.createElement("button"));
    button.textContent = this.label;
    button.addEventListener("click", (event) => this.onClick(event));

    const iconContainer = button.appendChild(document.createElement("div"));
    iconContainer.classList.add("icon-container");
    const icon = iconContainer.appendChild(document.createElement("ion-icon"));
    icon.name = this.icon;

    if (this.editorType === "bitmap") container.appendChild(document.createElement("bitmap-preview")).setAttribute("text", this.text);

    return container;
  }

  updateDOM(container) {
    const oldButton = container.children[0];
    const button = oldButton.cloneNode(true); // This'll remove all event listeners.
    button.addEventListener("click", (event) => this.onClick(event));
    container.replaceChild(button, oldButton);

    if (this.editorType === "bitmap") {
      container
        .querySelector("bitmap-preview")
        .setAttribute("text", this.text);
    }

    container.querySelector("ion-icon").name = this.icon;

    return true;
  }

  onClick(event) {
    const doc = global_state.codemirror.state.doc.toString();
    let pos = global_state.codemirror.posAtCoords({ x: event.pageX, y: event.pageY });
    let from = -1;

    while (true) {
      if (doc[pos] === "`") {
        if (from === -1) {
          from = pos + 1;
        } else {
          break;
        }
      }
      pos++;
    }

    dispatch("SET_EDIT_RANGE", {
      range: [from, pos]
    });

    dispatch("SET_ASSET_EDITOR", {
      type: this.editorType,
      text: this.text,
    });
  }
}

export class SwatchWidget extends WidgetType {
  constructor(rgba) {
    super();
    this.rgba = rgba;
  }

  eq(other) {
    return other.rgba.every((value, index) => value === this.rgba[index]);
  }
  ignoreEvent() { return false; }

  toDOM() {
    const container = document.createElement("span");
    container.classList.add("cm-swatch");
    container.style.backgroundColor = `rgba(${this.rgba.join(", ")})`;
    return container;
  }

  updateDOM(container) {
    container.style.backgroundColor = `rgba(${this.rgba.join(", ")})`;
    return true;
  }
}

function makeValue(state) {
  const widgets = [];
  const foldRanges = [];
  
  const syntax = syntaxTree(state);
  syntax.iterate({
    enter(node) {
      for (const [label, icon, editorType] of pairs) {
        const tag = getTag(label, node, syntax, state.doc);
        if (!tag) continue;
        if (tag.nameFrom === tag.nameTo) continue;

        widgets.push(Decoration.replace({
          widget: new OpenButtonWidget(label, icon, editorType, tag.text)
        }).range(tag.nameFrom, tag.nameTo));

        if (label === "color") {
          const color = global_state.palette.find(([key]) => key === tag.text);
          if (color) {
            widgets.push(Decoration.widget({ widget: new SwatchWidget(color[1]), side: 1 }).range(tag.textFrom));
          }
        } else if (tag.textFrom !== tag.textTo) {
          foldRanges.push({ from: tag.textFrom, to: tag.textTo });
        }
        
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
    return makeValue(transaction.state);
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