import { render, html, svg } from "../uhtml.js";

// canvas {
//   image-rendering: optimizeSpeed;
//   image-rendering: -moz-crisp-edges;
//   image-rendering: -o-crisp-edges;
//   image-rendering: -webkit-optimize-contrast;
//   image-rendering: optimize-contrast;
//   image-rendering: crisp-edges;
//   image-rendering: pixelated;
//   -ms-interpolation-mode: nearest-neighbor;
// }

const pixelStyles = html`
  <style>
    :root {
      --dark-grey: #434343;
    }

    .canvas-container {
      display: grid;
      background: grey;
      width: 100%;
      height: 100%;
      place-content: center;
    }

    .drawing-canvas {
      background: white;
    }

    .toolbox {
      position: absolute;
      right: 10px;
      top: 10px;
      display: flex;
      flex-direction: column;
      border: 2px solid black;
      padding: 5px;
      background: lightgrey;
    }

    .toolbox > * {
      background: lightgrey;
      margin-bottom: 5px;
    }

    .colors {
      position: absolute;
      right: 10px;
      bottom: 10px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }

    .colors > * {
      margin-right: 5px;
    }

    .gridsize {
      width: 50px;
    }

    .view-window {
      display: flex;
      justify-content: center;
      background: lightgrey;
      padding: 5px;
      border: 2px solid black;
    }

    .selected-tool {
      border: 2px solid yellow;
    }
  </style>
`;

export default pixelStyles;
