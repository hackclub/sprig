import {signal} from '@preact/signals'
import {version as latestVersion} from '../../firmware/spade/src/version.json'

export type UploadState = 'IDLE' | 'LOADING' | 'ERROR'

export const uploadState = signal<UploadState>('IDLE')
export const showUploadWarningModal = signal(false);

const getPort = async (): Promise<SerialPort> => {
	if (!navigator.serial) {
		const msg = 'Your browser does not support the Web Serial API. Please try again in a recent version of a Chromium-based browser, such as Chrome, Edge, or Arc.'
		alert(msg)
		throw new Error(msg)
	}

	// getPorts() returns all the ports granted access to this origin.
	// If there's only one, it's probably a Sprig. This should allow
	// only one button press to upload a game.
	const ports = await navigator.serial.getPorts()
	if (ports.length === 1) return ports[0]!

	return await navigator.serial.requestPort({
		filters: [ { usbVendorId: 0x2e8a, usbProductId: 10 } ]
	})
}

export const logSerialOutput = (value: string) => (value.trim().length > 0) && console.log(`%c< ${value.trim()}`, 'color: #999')


export const uploadToSerial = async (message: string,
																		 writer: WritableStreamDefaultWriter<ArrayBuffer>,
																		 reader: ReadableStreamDefaultReader<string>) => {

	const receivedEOT = new Promise<void>(resolve => {
		(async () => {
			try {
				while (true) {
					const { value, done } = await reader.read()
					if (done) break
					logSerialOutput(value)

					if (value.indexOf('ALL_GOOD') >= 0) resolve()
				}
			} catch (error) {
				console.error(error)
			}
		})()
	})

	const buf = new TextEncoder().encode(message)

	console.log('[UPLOAD > SERIAL] Checkpoint 1')
	await writer.ready
	console.log('[UPLOAD > SERIAL] Checkpoint 1 - writing startup sequence')
	await writer.write(new TextEncoder().encode("UPLOAD"))

	console.log('[UPLOAD > SERIAL] Checkpoint 2')
	await writer.ready
	console.log('[UPLOAD > SERIAL] Checkpoint 2 - writing length')
	await writer.write(new Uint32Array([ buf.length ]).buffer)

	console.log('[UPLOAD > SERIAL] Checkpoint 3')
	await writer.ready
	console.log('[UPLOAD > SERIAL] Checkpoint 3 - writing source code')
	const ticker = setInterval(() => console.warn('[UPLOAD > SERIAL] 300ms passed writing source code'), 300)
    const timeoutId = setTimeout(() => {
        console.error('[UPLOAD > SERIAL] Upload timeout. Please reload the page and try again.');
		showUploadWarningModal.value = true;
		clearInterval(ticker);
    }, 30000);

	await writer.write(buf)
	clearInterval(ticker)
	clearTimeout(timeoutId)
	console.log(`[UPLOAD > SERIAL] Wrote ${buf.length} chars`)

	// Ensure everything is written before continuing
	await writer.ready
	await receivedEOT
}

export const getVersionNumber = async (
	writer: WritableStreamDefaultWriter<ArrayBuffer>,
	reader: ReadableStreamDefaultReader<string>): Promise<string | null> => {
	await writer.ready
	await writer.write(new TextEncoder().encode("VERSION"))

	// 128-char buffer
	let serialBuffer = " ".repeat(128)

	while (true) {
		const { value, done } = await reader.read()

		if (done) return null;
		logSerialOutput(value)

		serialBuffer  = serialBuffer.concat(value)
		serialBuffer = serialBuffer.slice(serialBuffer.length - 128, serialBuffer.length)


		const versionPrefix = "SPADE:"
		const responseIndex = serialBuffer?.indexOf(versionPrefix) + versionPrefix.length
		const endIndex = serialBuffer?.indexOf("END")
		if (endIndex - responseIndex > 3) {
			return serialBuffer?.substring(
				responseIndex, endIndex
			)
		}

	}
}

export const getIsLegacySerial = async (
	writer: WritableStreamDefaultWriter<ArrayBuffer>,
	reader: ReadableStreamDefaultReader<string>): Promise<boolean | null> => {

	await writer.ready
	await writer.write(new Uint8Array([ 0, 1, 2, 3, 4 ]).buffer)

	while (true) {
		const { value, done } = await reader.read()
		if (done) return null
		logSerialOutput(value)

		if (value.indexOf('found startup seq!') >= 0) return true
		if (value.indexOf('legacy detected') >= 0) return false
	}
}

export const upload = async (code: string): Promise<void> => {
	if (uploadState.value === 'LOADING') return
	uploadState.value = 'LOADING'

	let port
	try {
		console.log('[UPLOAD] Prompting user for port...')
		port = await getPort()

		console.log('[UPLOAD] Port found, opening serial stream...')
		const start = Date.now()

		await port.open({ baudRate: 115200 })
		console.log('[UPLOAD] Connected to RP2040, starting upload')

		// Listen to data coming from the serial port.
		const textDecoder = new TextDecoderStream()
		const readableStreamClosed = port.readable!.pipeTo(textDecoder.writable)
		const reader = textDecoder.readable.getReader()

		const writer = port.writable!.getWriter()

		const isLegacySerial = await getIsLegacySerial(writer, reader)

		if (isLegacySerial) {
			alert("Spade is running a legacy version! Please update to continue.") // TODO: error message
			return
		} else {
			console.log("[UPLOAD] Not legacy!")
		}

		const versionNum = await getVersionNumber(writer, reader)
		console.log(versionNum)

		if (versionNum != latestVersion) {
			alert("Spade is not updated to the latest version! You may encounter unexpected behavior.") // TODO: error message
		} else {
			console.log("[UPLOAD] Version up to date!")
		}

		await uploadToSerial(code, writer, reader)

		console.log('[UPLOAD] Waiting on stream close and writer lock release...')
		//reader.releaseLock()
		reader.cancel()
		await readableStreamClosed.catch(_ => { /* ignore */ })
		writer.releaseLock()

		const elapsed = ((Date.now() - start) / 1000).toFixed(2)
		console.log(`[UPLOAD] Upload complete in ${elapsed}s!`)
		uploadState.value = 'IDLE'
	} catch (error) {
		console.log('[UPLOAD] Error uploading!')
		console.error(error)
		uploadState.value = 'ERROR'
	}
	if (port) await port.close()
}