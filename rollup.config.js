import { nodeResolve } from "@rollup/plugin-node-resolve"

export default {
    input: {
      "basic-setup": "./node_modules/@codemirror/basic-setup/dist/index.js",
      "lang-javascript": "./node_modules/@codemirror/lang-javascript/dist/index.js",
      language: "./node_modules/@codemirror/language/dist/index.js",
      view: "./node_modules/@codemirror/view/dist/index.js"
    },
    output: {
      dir: "./@codemirror",
      format: "esm",
      generatedCode: "es2015"
    },
    plugins: [ nodeResolve() ]
  }