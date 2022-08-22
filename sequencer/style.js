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
    min-height: 80px;
    max-height: 80px;
    justify-content: space-around;
    align-items: center;
  }

  .bpm {
    display: flex;
  }

  .instruments {
    display: flex;
    flex-wrap: wrap;
    min-width: 140px;
    justify-content: flex-end;
  }

  .instrument {
    color: white;
    height: 30px;
    display: flex;
    width: 70px;
    justify-content: center;
    align-items: center;
  }

  .bpm-control {
    cursor: pointer;
  }

  .bpm-control:hover {
    color: orange;
  }
`