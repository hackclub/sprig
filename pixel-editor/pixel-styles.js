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

export const pixelStyles = html`
  <style>
    :root {
      --dark-grey: #434343;
    }

    .pixel-editor-container {
      width: 100%;
      height: 100%;
    }

    .canvas-container {
      display: grid;
      align-items: center;
      justify-content: center;
      background: grey;
      width: 100%;
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
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }

    .colors > * {
      flex: 1;
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
