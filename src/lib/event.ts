// Mouse event button utilities
export const leftDown = (event: MouseEvent) => !!(event.buttons & 1)
export const rightDown = (event: MouseEvent) => !!(event.buttons & 2)