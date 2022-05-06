import { render, html, svg } from "/libs/uhtml.js";

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

export const pixelStyles = html`
  <style>
    :root {
      --dark-grey: #434343;
    }

    .pixel-editor-container {
      width: 100%;
      height: 100%;
      display: flex;
    }

    .canvas-container {
      display: flex;
      align-items: center;
      justify-content: center;
      background: grey;
      width: 90%;
      height: 100%;
      overflow: scroll;
    }

    .drawing-canvas {
      background: white;
    }

    .offscreen-canvas {
      display: none;
    }

    .toolbox {
      display: flex;
      width: 10%;
      flex-direction: column;
      border: 2px solid black;
      padding: 5px;
      background: lightgrey;
      overflow: scroll;
      justify-content: space-between;
      min-width: 100px;
    }

    .tools > * {
      background: lightgrey;
      margin-bottom: 5px;
      width: 100%;
    }

    .colors {
      display: flex;
      flex-wrap: wrap;
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
      border: 2px solid yellow !important;
    }
  </style>
`;
