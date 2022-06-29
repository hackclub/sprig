
export const style = `

  :root { box-sizing: border-box; }
  * { box-sizing: inherit; }

  .map-editor-container {
    height: 100%;
    display: flex;
    background: var(--bg-overflow);
  }

  .canvas-container {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .canvas-container > canvas {
    background: var(--bg-surface);
    image-rendering: pixelated;
    width: 100%;
    max-width: 500px;
  }

  .sprites {
    width: var(--editor-sidebar-width);
    background: var(--bg-floating);
    padding: 15px;
  }

  .sprites button {
    --cols: 5;
    width: calc((var(--editor-sidebar-width) - 30px - var(--cols) * 10px) / var(--cols));
    display: inline-block;
    background: var(--bg-surface);
    border: none;
    aspect-ratio: 1 / 1;
    padding: 6px;
    cursor: pointer;
    margin: 5px;
    border-radius: 4px;
  }

  .sprites button.active {
    box-shadow: inset 0 0 0 6px #fcc419;
  }
`