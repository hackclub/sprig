let port;
let reader;
let writer;
let respStr = '';

export async function openPort(){
	let ports = await navigator.serial.getPorts();
	if (ports.length > 0) port = ports[0];
	else port = await navigator.serial.requestPort();

	await port.open({ baudRate: 115200 });

	reader = port.readable.getReader();
	writer = port.writable.getWriter();

	send('.load');

	while(true) {
		let chars = await reader.read();
		for(let i in chars.value) gotChar(chars.value[i]);
	}

	function gotChar(c){
		if (c == 10) return;
		if (c == 13) {
			console.log(respStr);
			respStr = '';
		}
		else respStr += String.fromCharCode(c);
	}
}

function send(str){
	let l = str.split('').map(c=>c.charCodeAt(0)).concat(13);
	writer.write(new Uint8Array(l));
}
