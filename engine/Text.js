class Text {
  constructor(str, x, y, ops, container) {
    this._text = str;
    this.x = x;
    this.y = y;

    const color = ops.color ?? "black";
    const size = ops.size ?? 12;
    const font = ops.font ?? "monospace";
    const rotate = ops.rotate ?? 0;
    const scale = ops.scale ?? 1;

    const span = document.createElement("a");
    span.style = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      color: ${color};
      font-family: ${font};
      font-size: ${size}px;
      transform: rotate(${rotate}deg) scale(${scale}) translate(-50%, -50%);
      width: max-content;
    `;
    if (ops.href) {
      span.href = ops.href;
      if (ops.newTab) {
        span.target = "_blank";
        span.rel = "noopener";
      }
    } else {
      span.style.pointerEvents = "none";
    }
    span.innerText = str;

    this.el = span;

    container.append(span);
  }

  set text(val) {
    this._text = val;
    this.el.innerText = this._text;

    return this;
  }

  remove() {
    this.el.remove();
  }
}

const clearText = (node) =>
  node.querySelectorAll(".text-container > *").forEach((x) => x.remove());

export { Text };