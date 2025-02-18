/* eslint-env browser */

import * as Y from 'yjs'
import { WebrtcProvider } from '../src/y-webrtc.js'

const ydoc = new Y.Doc()
const provider = new WebrtcProvider('webrtc-test', ydoc, { signaling: ['ws://localhost:8080'] })
const yarray = ydoc.getArray()

provider.on('synced', synced => {
  // NOTE: This is only called when a different browser connects to this client
  // Windows of the same browser communicate directly with each other
  // Although this behavior might be subject to change.
  // It is better not to expect a synced event when using y-webrtc
  console.log('synced!', synced)
})

yarray.observeDeep(() => {
  console.log('yarray updated: ', yarray.toJSON())
})

// @ts-ignore
window.example = { provider, ydoc, yarray }
