export const style = `
  :root { box-sizing: border-box; }
  * { box-sizing: inherit; }

  .pixel-editor-container {
    display: flex;
    width: 100%;
    height: 100%;
  }

  .canvas-container {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg-overflow);
    overflow: auto;
  }

  .drawing-canvas {
    background: var(--bg-surface);
  }

  .offscreen-canvas {
    display: none;
  }

  .toolbox {
    display: flex;
    width: var(--editor-sidebar-width);
    flex-direction: column;
    padding: 20px;
    background: var(--bg-floating);
    overflow: auto;
    justify-content: space-between;
    min-width: 100px;
  }

  .tools {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .tools button {
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
  }

  .tools button.active {
    background: var(--pcb-base);
    --shadow-color: var(--pcb-trace);
  }

  .tools button:active {
    top: 4px;
    box-shadow: 0 0px 0 var(--shadow-color);
  }

  .tools button ion-icon {
    display: block;
    font-size: 1.25em;
  }

  .tools button div {
    flex: 1;
  }

  .colors {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }

  .colors div {
    height: 50px;
    width: 50px;
    border: 2px solid var(--switch-fg-low);
    border-radius: 4px;
    cursor: pointer;
  }

  .colors div.active {
    border-color: var(--switch-fg-high);
  }

  .gridsize {
    width: 50px;
  }

  .view-window {
    display: flex;
    justify-content: center;
    padding: 5px;
  }
`