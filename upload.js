import { dispatch } from "./dispatch.js";

async function getPort() {
  if (navigator.serial === undefined)
    throw "your browser does not support the Web Serial API. please try again in a recent version of Chrome.";

  return await navigator.serial.requestPort({
    filters: [ { usbVendorId: 0x2e8a, usbProductId: 10 } ]
  });

  /* possibly return to this behavior when it is confirmed to work again */
  /*
   * const ports = await navigator.serial.getPorts();
   * if (ports.length !== 1) {
   *   dispatch("UPLOAD_LOG", "please pick a device.");
   *   return await navigator.serial.requestPort({
   *     filters: [
   *       { usbVendorId: 0x2e8a, usbProductId: 10 },
   *     ]
   *   });
   * } else {
   *   return ports[0];
   * }
   */
}

async function uploadToSerial(message, writer) {
  const buf = new TextEncoder().encode(message);
  console.log(new TextDecoder().decode(buf));

  console.log("ready 1");
  await writer.ready;
  console.log("ready 1 - writing startup seq");
  await writer.write(new Uint8Array([0, 1, 2, 3, 4]).buffer);

  // await writer.write(new ArrayBuffer(htonl(message.length)));
  console.log("ready 2");
  await writer.ready;
  console.log("ready 2 - writing len");
  await writer.write(new Uint32Array([buf.length]).buffer);

  console.log("ready 3");
  await writer.ready;
  console.log("ready 3 - writing source");
  const ticker = setInterval(() => console.log("writing src - 300ms passed"), 300);
  await writer.write(buf);
  clearInterval(ticker);
  console.log(`wrote ${buf.length} chars`);

  // Ensure all are written before closing
  await writer.ready;
}

export async function upload(code) {
  dispatch("SET_UPLOAD_STATE", "uploading");
  
  let port;
  try {
    port = await getPort();

    dispatch("UPLOAD_LOG", "port found, opening serial stream...");
    const start = Date.now();

    /* connect and begin logging output */
    await port.open({ baudRate: 115200 });
    dispatch("UPLOAD_LOG", "connected to rp2040!");

    const textDecoder = new TextDecoderStream();
    const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
    const reader = textDecoder.readable.getReader();

    /* listen to data coming from the serial device. */
    const receivedEOT = new Promise(res => {
      (async () => {
        try {
          while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            if (value.indexOf("ALL_GOOD") >= 0) res();
            console.log(value);
          }
        } catch(e) {
          console.error(e);
        }
        finally {
          reader.releaseLock();
        }
      })();
    });

    const writer = port.writable.getWriter();
    await uploadToSerial(code, writer);

    await receivedEOT;

    reader.cancel();
    console.log("waiting on close");
    await readableStreamClosed.catch(_ => {/* ignore */});
    console.log("readable closed");

    console.log("writer releasing");
    writer.releaseLock();
    console.log("writer released");

    const elapsed = ((Date.now() - start) / 1000).toFixed(2);
    dispatch("UPLOAD_LOG", `upload complete in ${elapsed}s! ` +
                           `you may need to unplug and replug your device.`);
  } catch (error) {
    if (error)
      dispatch("UPLOAD_LOG", `error: ${error.toString()}`);
    else
      console.log("undefined error!");
  }
  
  if (port) await port.close();
  dispatch("SET_UPLOAD_STATE", "done");
}
