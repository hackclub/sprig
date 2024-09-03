import { expect, test } from "vitest"
import {normalizeGameError} from "./error"

// SyntaxErrors (not in evals) seem to go through babel (i.e. have an error.code), so they are not tested here

test('calls a mistyped console.log function (line 2)', () => {
    const payload = {kind: "runtime", error: new TypeError("console.llog is not a function")}
    payload.error.stack = `TypeError: console.llog is not a function
    at eval (eval at runGame (http://localhost:3000/src/lib/engine/index.ts?t=1721074151204:58:16), <anonymous>:4:9)
    at runGame (http://localhost:3000/src/lib/engine/index.ts?t=1721074151204:59:5)
    at Object.onRun [as onClick] (http://localhost:3000/src/components/big-interactive-pages/editor.tsx:284:17)
    at Object.onClick [as clickfalse] (http://localhost:3000/src/components/design-system/button.tsx:17:35)
    at HTMLButtonElement.I (http://localhost:3000/node_modules/.vite/deps/chunk-XHOUILMY.js?v=67609d21:161:26)`

    const normalizedError = normalizeGameError(payload as any)

    expect(normalizedError).toStrictEqual({
        column: 9,
        line: 2,
        description: "TypeError: console.llog is not a function\n    at eval (index.ts:2:9)",
        raw: payload.error
    })
})

test('ReferenceError (line 1)', () => {
    const payload = {kind: "runtime", error: new ReferenceError("e is not defined")}
    payload.error.stack = `ReferenceError: e is not defined
    at eval (eval at runGame (index.ts:74:14), <anonymous>:3:1)
    at runGame (index.ts:75:3)
    at Object.onRun [as onClick] (editor.tsx:415:15)
    at Object.onClick [as clickfalse] (button.tsx:34:25)
    at HTMLButtonElement.I (chunk-XHOUILMY.js?v=67609d21:161:26)`

    const normalizedError = normalizeGameError(payload as any)

    expect(normalizedError).toStrictEqual({
        column: 1,
        line: 1,
        description: "ReferenceError: e is not defined\n    at eval (index.ts:1:1)",
        raw: payload.error
    })
})

test('ReferenceError (line 2, last line)', () => {
    const payload = {kind: "runtime", error: new ReferenceError("e is not defined")}
    payload.error.stack = `ReferenceError: e is not defined
    at eval (eval at runGame (index.ts:74:14), <anonymous>:4:1)
    at runGame (index.ts:75:3)
    at Object.onRun [as onClick] (editor.tsx:415:15)
    at Object.onClick [as clickfalse] (button.tsx:34:25)
    at HTMLButtonElement.I (chunk-XHOUILMY.js?v=49f2f3d3:161:26)`

    const normalizedError = normalizeGameError(payload as any)

    expect(normalizedError).toStrictEqual({
        column: 1,
        line: 2,
        description: "ReferenceError: e is not defined\n    at eval (index.ts:2:1)",
        raw: payload.error
    })
})

test('RangeError, Division by 0 (line 2)', () => {
    const payload = {kind: "runtime", error: new RangeError("Division by zero")}
    payload.error.stack = `RangeError: Division by zero
    at eval (eval at runGame (index.ts:74:14), <anonymous>:4:4)
    at runGame (index.ts:75:3)
    at Object.onRun [as onClick] (editor.tsx:415:15)
    at Object.onClick [as clickfalse] (button.tsx:34:25)
    at HTMLButtonElement.I (chunk-XHOUILMY.js?v=49f2f3d3:161:26)`

    const normalizedError = normalizeGameError(payload as any)

    expect(normalizedError).toStrictEqual({
        column: 4,
        line: 2,
        description: "RangeError: Division by zero\n    at eval (index.ts:2:4)",
        raw: payload.error
    })
})

test('SyntaxError in eval (line 1)', () => {
    const payload = {kind: "runtime", error: new SyntaxError("Unexpected identifier 'e'")}
    payload.error.stack = `SyntaxError: Unexpected identifier 'e'
    at eval (eval at runGame (index.ts:74:14), <anonymous>:3:1)
    at runGame (index.ts:75:3)
    at Object.onRun [as onClick] (editor.tsx:415:15)
    at Object.onClick [as clickfalse] (button.tsx:34:25)
    at HTMLButtonElement.I (chunk-XHOUILMY.js?v=49f2f3d3:161:26)`

    const normalizedError = normalizeGameError(payload as any)

    expect(normalizedError).toStrictEqual({
        column: 1,
        line: 1,
        description: "SyntaxError: Unexpected identifier 'e'\n    at eval (index.ts:1:1)",
        raw: payload.error
    })
})


test('Infinite recursion (function line 1, return line 2, call line 5)', () => {
    const payload = {kind: "runtime", error: new RangeError("Maximum call stack size exceeded")}

    payload.error.stack = `RangeError: Maximum call stack size exceeded
    at recursion (eval at runGame (index.ts:74:14), <anonymous>:4:3)
    at recursion (eval at runGame (index.ts:74:14), <anonymous>:4:10)
    at recursion (eval at runGame (index.ts:74:14), <anonymous>:4:10)
    at recursion (eval at runGame (index.ts:74:14), <anonymous>:4:10)
    at recursion (eval at runGame (index.ts:74:14), <anonymous>:4:10)
    at recursion (eval at runGame (index.ts:74:14), <anonymous>:4:10)
    at recursion (eval at runGame (index.ts:74:14), <anonymous>:4:10)
    at recursion (eval at runGame (index.ts:74:14), <anonymous>:4:10)
    at recursion (eval at runGame (index.ts:74:14), <anonymous>:4:10)
    at recursion (eval at runGame (index.ts:74:14), <anonymous>:4:10)
    at recursion (eval at runGame (index.ts:74:14), <anonymous>:4:10)
    at recursion (eval at runGame (index.ts:74:14), <anonymous>:4:10)
    at recursion (eval at runGame (index.ts:74:14), <anonymous>:4:10)
    at recursion (eval at runGame (index.ts:74:14), <anonymous>:4:10)
    at recursion (eval at runGame (index.ts:74:14), <anonymous>:4:10)
    at recursion (eval at runGame (index.ts:74:14), <anonymous>:4:10)
    at recursion (eval at runGame (index.ts:74:14), <anonymous>:4:10)
    at recursion (eval at runGame (index.ts:74:14), <anonymous>:4:10)
    at recursion (eval at runGame (index.ts:74:14), <anonymous>:4:10)
    at recursion (eval at runGame (index.ts:74:14), <anonymous>:4:10)
    at recursion (eval at runGame (index.ts:74:14), <anonymous>:4:10)
    at recursion (eval at runGame (index.ts:74:14), <anonymous>:4:10)
    at recursion (eval at runGame (index.ts:74:14), <anonymous>:4:10)
    at recursion (eval at runGame (index.ts:74:14), <anonymous>:4:10)
    at recursion (eval at runGame (index.ts:74:14), <anonymous>:4:10)
    at recursion (eval at runGame (index.ts:74:14), <anonymous>:4:10)
    at recursion (eval at runGame (index.ts:74:14), <anonymous>:4:10)
    at recursion (eval at runGame (index.ts:74:14), <anonymous>:4:10)
    at recursion (eval at runGame (index.ts:74:14), <anonymous>:4:10)
    at recursion (eval at runGame (index.ts:74:14), <anonymous>:4:10)
    at recursion (eval at runGame (index.ts:74:14), <anonymous>:4:10)
    at recursion (eval at runGame (index.ts:74:14), <anonymous>:4:10)
    at recursion (eval at runGame (index.ts:74:14), <anonymous>:4:10)
    at recursion (eval at runGame (index.ts:74:14), <anonymous>:4:10)
    at recursion (eval at runGame (index.ts:74:14), <anonymous>:4:10)
    at recursion (eval at runGame (index.ts:74:14), <anonymous>:4:10)
    at recursion (eval at runGame (index.ts:74:14), <anonymous>:4:10)
    at recursion (eval at runGame (index.ts:74:14), <anonymous>:4:10)
    at recursion (eval at runGame (index.ts:74:14), <anonymous>:4:10)
    at recursion (eval at runGame (index.ts:74:14), <anonymous>:4:10)
    at recursion (eval at runGame (index.ts:74:14), <anonymous>:4:10)
    at recursion (eval at runGame (index.ts:74:14), <anonymous>:4:10)
    at recursion (eval at runGame (index.ts:74:14), <anonymous>:4:10)
    at recursion (eval at runGame (index.ts:74:14), <anonymous>:4:10)
    at recursion (eval at runGame (index.ts:74:14), <anonymous>:4:10)
    at recursion (eval at runGame (index.ts:74:14), <anonymous>:4:10)
    at recursion (eval at runGame (index.ts:74:14), <anonymous>:4:10)
    at recursion (eval at runGame (index.ts:74:14), <anonymous>:4:10)
    at recursion (eval at runGame (index.ts:74:14), <anonymous>:4:10)
    at recursion (eval at runGame (index.ts:74:14), <anonymous>:4:10)`

    const normalizedError = normalizeGameError(payload as any)

    expect(normalizedError).toStrictEqual({
        column: 3,
        line: 2,
        description: "RangeError: Maximum call stack size exceeded\n    at recursion (index.ts:2:3)",
        raw: payload.error
    })
})

test('TypeError - .split on a number (line 3)', () => {
    const payload = {kind: "runtime", error: new TypeError("a.split is not a function")}
    payload.error.stack = `TypeError: a.split is not a function
    at eval (eval at runGame (index.ts:74:14), <anonymous>:5:3)
    at runGame (index.ts:75:3)
    at Object.onRun [as onClick] (editor.tsx:415:15)
    at Object.onClick [as clickfalse] (button.tsx:34:25)
    at HTMLButtonElement.I (chunk-XHOUILMY.js?v=49f2f3d3:161:26)`

    const normalizedError = normalizeGameError(payload as any)

    expect(normalizedError).toStrictEqual({
        column: 3,
        line: 3,
        description: "TypeError: a.split is not a function\n    at eval (index.ts:3:3)",
        raw: payload.error
    })
})

test('URI Error (line 1)', () => {
    const payload = {kind: "runtime", error: new URIError("URI malformed")}
    payload.error.stack = `URIError: URI malformed
    at decodeURIComponent (<anonymous>)
    at eval (eval at runGame (index.ts:74:14), <anonymous>:3:1)
    at runGame (index.ts:75:3)
    at Object.onRun [as onClick] (editor.tsx:415:15)
    at Object.onClick [as clickfalse] (button.tsx:34:25)
    at HTMLButtonElement.I (chunk-XHOUILMY.js?v=49f2f3d3:161:26)`

    const normalizedError = normalizeGameError(payload as any)

    expect(normalizedError).toStrictEqual({
        column: 1,
        line: 1,
        description: "URIError: URI malformed\n    at eval (index.ts:1:1)",
        raw: payload.error
    })
})

test('URI Error (line 1)', () => {
    const payload = {kind: "runtime", error: new Error("this is an error")}
    payload.error.stack = `Error: this is an error
    at eval (eval at runGame (index.ts:74:14), <anonymous>:3:7)
    at runGame (index.ts:75:3)
    at Object.onRun [as onClick] (editor.tsx:415:15)
    at Object.onClick [as clickfalse] (button.tsx:34:25)
    at HTMLButtonElement.I (chunk-XHOUILMY.js?v=49f2f3d3:161:26)`

    const normalizedError = normalizeGameError(payload as any)

    expect(normalizedError).toStrictEqual({
        column: 7,
        line: 1,
        description: "Error: this is an error\n    at eval (index.ts:1:7)",
        raw: payload.error
    })
})