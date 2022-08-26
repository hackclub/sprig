export const style = `
  html, body {
    margin: 0px;
  }

  .sequencer-grid {
    flex: 1;
    display: flex;
    flex-direction: row;
    background: var(--bg-surface);
  }

  .column {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .column.playhead {
    background: var(--seq-grid-playhead);
  }

  .cell {
    flex: 1;
    border-left: 1px solid var(--seq-grid-low);
    border-bottom: 1px solid var(--seq-grid-low);
  }

  .cell.beat {
    border-left-color: var(--seq-grid-high);
  }

  .cell.root {
    border-bottom-color: var(--seq-grid-high);
  }

  .column:first-of-type .cell { border-left: none; }
  .cell:last-of-type { border-bottom: none; }

  .container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }

  .sequencer-toolbox {
    color: white;
    background: var(--bg-floating);
    display: flex;
    padding: 16px 20px;
    justify-content: space-between;
    align-items: center;
  }

  button {
    --shadow-color: var(--btn-inactive-shadow);
    position: relative;
    background: var(--btn-inactive);
    box-shadow: 0 4px 0 var(--shadow-color);
    border: none;
    font-family: inherit;
    font-size: inherit;
    color: #ffffff;
    border-radius: 4px;
    cursor: pointer;
    padding: 10px 14px;
  }

  button.accent {
    --shadow-color: var(--pcb-trace);
    background: var(--pcb-trace-lighter);
  }

  button.pressed, button:active {
    top: 4px;
    box-shadow: 0 0px 0 var(--shadow-color);
  }

  .instruments {
    display: flex;
    justify-content: flex-end;
    gap: 4px;
  }

  .instrument {
    padding: 10px 16px;
  }

  .bpm {
    display: flex;
    flex-direction: row;
    gap: 2px;
    align-items: center;
  }

  .bpm .label {
    margin-right: 8px;
  }

  .bpm .slider {
    height: 6px;
    border-radius: 3px;
    width: 300px;
    background: var(--btn-inactive);
    -webkit-appearance: none;
  }

  .bpm .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: var(--pcb-trace-lighter);
    cursor: pointer;
  }

  .bpm .slider::-moz-range-thumb {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: red;
    cursor: pointer;
  }

  .bpm .text {
    outline: none;
    font-size: inherit;
    font-family: inherit;
    border: none;
    background: transparent;
    color: var(--pcb-trace-lighter);
    width: 6ch;
    text-align: center;
    padding: 4px 6px;
  }
`