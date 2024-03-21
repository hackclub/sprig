// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

let panel: vscode.WebviewPanel | null = null;
let sprigFilename: string | null = null;

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  let openCommand = vscode.commands.registerTextEditorCommand(
    "sprig.open",
    (editor) => {
      if (panel) {
        panel.reveal();
        return;
      }

      panel = vscode.window.createWebviewPanel(
        "sprig",
        "Sprig",
        vscode.ViewColumn.Beside,
        {
          enableScripts: true,
        }
      );
      panel.iconPath = vscode.Uri.file(
        context.asAbsolutePath("images/sprig.png")
      );

      const gameCode = editor.document.getText();
      sprigFilename = editor.document.fileName;

      panel.webview.html = getWebviewContent(gameCode);

      panel.onDidDispose(
        () => {
          panel = null;
        },
        null,
        context.subscriptions
      );
    }
  );

  let fileSaved = vscode.workspace.onDidSaveTextDocument((document) => {
    if (!panel) {
      return;
    }

    if (document.fileName !== sprigFilename) {
      return;
    }

    const gameCode = document.getText();
    panel.webview.html = getWebviewContent(gameCode);
  });

  context.subscriptions.push(openCommand, fileSaved);
}

function getWebviewContent(gameCode: string) {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Sprig</title>
      <style>
        body {
          height: 100vh;
          max-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
        }

        #canvas {
          border: 3px solid #078969;
          display: block;
          margin: 0 auto;
          background-color: #000;
          width: 100%;
          height: auto;
          max-height: 80%;
          image-rendering: crisp-edges;
          image-rendering: pixelated;
          outline: none;
        }

        h2 {
          font-family: sans-serif;
          color: #078969;
          font-weight: bold;
          text-align: center;
          margin-top: 10px;
          margin-bottom: 5px;
        }

        #output {
          font-family: monospace;
          background-color: #000;
          border: 3px solid #078969;
          height: 100%;
          font-size: 16px;
          padding: 4px;
          overflow-y: scroll;
          width: 100%;
          margin: 0;
        }

        #output * {
          overflow-anchor: none;
        }

        #anchor {
          overflow-anchor: auto;
          height: 1px;
        }

        #actions {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 10px;
        }

        button {
          font-family: sans-serif;
          font-size: 16px;
          padding: 8px 20px;
          margin: 0 10px;
          background-color: #078969;
          color: #fff;
          border: none;
          cursor: pointer;
          transition: 0.3s;
          border-radius: 5px;
        }
      </style>
    </head>
    <body>
      <h2>Game</h2>
      <canvas width="500" height="400" id="canvas" tabindex="0"></canvas>
      <div id="actions">
        <button id="restart">Restart</button>
        <button id="stop">Stop</button>
      </div>
      <h2>Console</h2>
      <p id="output">
        <div id="anchor"></div>
      </p>

      <script type="module">
        import { webEngine } from "https://esm.sh/sprig@1/web";

        function _addConsoleOutput() {
          const output = document.getElementById("output");
          const text = Array.from(arguments).join(" ");
          output.innerText += text + "\\n";
        };

        console.log = _addConsoleOutput;
        console.error = _addConsoleOutput;
      
        const runGame = (api) => {
          const {
            map, bitmap, color, tune, setMap, addText, clearText, addSprite,
            getGrid, getTile, tilesWith, clearTile, setSolids, setPushables,
            setBackground, getFirst, getAll, width, height,setLegend, onInput,
            afterInput, playTune, setTimeout, setInterval, clearTimeout, clearInterval
          } = api
          // game starts here
          ${gameCode}
        };
      
        let game = webEngine(document.getElementById("canvas"));
        runGame(game.api);

        document.getElementById("restart").addEventListener("click", async () => {
          game.cleanup();
          game = webEngine(document.getElementById("canvas"))
          runGame(game.api);
        });

        document.getElementById("stop").addEventListener("click", () => {
          game.cleanup();
        });
      </script>
    </body>
  </html>`;
}

// This method is called when your extension is deactivated
export function deactivate() {}
