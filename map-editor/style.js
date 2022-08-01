
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
    position:relative;
  }

  .grid {
    position: absolute;
  }

  .canvas-container > canvas {
    background: var(--bg-surface);
    image-rendering: pixelated;
  }

  .tools {
    width: var(--editor-sidebar-width);
    background: var(--bg-floating);
    padding: 15px;
  }

  .sprite-button {
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

  .sprite-button.active {
    box-shadow: inset 0 0 0 6px #fcc419;
  }

  .action-button-container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .action-button {
    margin: 10px;
    --shadow-color: var(--btn-inactive-shadow);
    position: relative;
    display: flex;
    background: var(--btn-inactive);
    box-shadow: 0 4px 0 var(--shadow-color);
    border: none;
    font-family: inherit;
    font-size: inherit;
    color: #ffffff;
    border-radius: 4px;
    cursor: pointer;
    padding: 10px 14px;
    align-items: center;
    width: 40%;
  }

  .action-button.active {
    background: var(--pcb-base);
    --shadow-color: var(--pcb-trace);
  }

  .action-button:active {
    top: 4px;
    box-shadow: 0 0px 0 var(--shadow-color);
  }

  .tiles {
    display: flex;
    flex-wrap: wrap;
  }
`