import { nodeResolve } from "@rollup/plugin-node-resolve"

export default {
  input: {
    "@codemirror/basic-setup": "./node_modules/@codemirror/basic-setup/dist/index.js",
    "@codemirror/lang-javascript": "./node_modules/@codemirror/lang-javascript/dist/index.js",
    "@codemirror/language": "./node_modules/@codemirror/language/dist/index.js",
    "@codemirror/view": "./node_modules/@codemirror/view/dist/index.js",
    "uhtml": "./node_modules/uhtml/esm/index.js"
  },
  output: {
    dir: "./libs/",
    format: "esm",
    generatedCode: "es2015"
  },
  plugins: [ nodeResolve() ]
}