
export const style = `

  :root { box-sizing: border-box; }
  * { box-sizing: inherit; }

  .map-editor-container {
    height: 100%;
    display: flex;
    background: var(--bg-overflow);
  }

  .resize-horiz {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    padding: 10px;
  }

  .resize-vert {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    height: 100%;
  }

  .resize-horiz .buttons {
    display: flex;
    flex-direction: row;
    gap: 4px;
  }

  .resize-horiz .buttons button {
    cursor: pointer;
    background: none;
    color: inherit;
    font-family: inherit;
    font-size: 2em;
    padding: 0;
    border: none;
  }

  .resize-horiz .buttons button:hover {
    color: var(--pcb-trace-lighter);
  }

  .canvas-container {
    width: 100%;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .grid {
    position: absolute;
    overflow: visible;
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
    box-shadow: inset 0 0 0 6px var(--pcb-trace-lighter);
  }

  .tiles {
    display: flex;
    flex-wrap: wrap;
  }
`