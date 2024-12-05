// Vendor Agnostic Fullscreen Functions
export const requestFullscreen = (element: HTMLElement) => {
	if (element.requestFullscreen) {
		element.requestFullscreen();
	} else { // @ts-ignore
		if (element.mozRequestFullScreen) {
			// @ts-ignore
			element.mozRequestFullScreen();
		} else { // @ts-ignore
			if (element.webkitRequestFullscreen) {
				// @ts-ignore
				element.webkitRequestFullscreen();
			}
		}
	}
};

export const exitFullscreen = () => {
	if (document.exitFullscreen) {
		document.exitFullscreen();
	} else { // @ts-ignore
		if (document.mozCancelFullScreen) {
			// @ts-ignore
			document.mozCancelFullScreen();
		} else { // @ts-ignore
			if (document.webkitExitFullscreen) {
				// @ts-ignore
				document.webkitExitFullscreen();
			}
		}
	}
};

export const fullscreenElement = () => {
	return (
		document.fullscreenElement ||
		// @ts-ignore
		document.mozFullScreenElemen ||
		// @ts-ignore
		document.webkitFullscreenElement
	);
};