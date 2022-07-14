export const style = `
  :root {
    --dark-grey: #434343;
  }

  html, body {
    margin: 0px;
  }

  .svg-container {
    width: 100%;
    height: 100%;
    flex: 1;
    background: white;
  }

  .container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }

  .sequencer-toolbox {
    display: flex;
    min-height: 80px;
    max-height: 80px;
    background: lightgrey;
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