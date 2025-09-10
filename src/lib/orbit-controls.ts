import { EventDispatcher, Object3D, Quaternion, Spherical, Vector2, Vector3 } from 'three'

class OrbitControls extends EventDispatcher {
	object: Object3D
	domElement: HTMLElement
	canStartDrag: () => boolean
	canContinueDrag: () => boolean
	enabled: boolean
	target: Vector3
	autoRotate: boolean
	autoRotateSpeed: number
	rotateSpeed: number
	update: () => boolean
	cleanup: () => void
	registerListeners: () => void
	isDragging: boolean
	
	constructor(object: Object3D, domElement: HTMLElement, canStartDrag: () => boolean, canContinueDrag: () => boolean) {
		super()

		this.object = object
		this.domElement = domElement
		this.canStartDrag = canStartDrag
		this.canContinueDrag = canContinueDrag
		this.isDragging = false

		// Set to false to disable this control
		this.enabled = true

		// "target" sets the location of focus, where the object orbits around
		this.target = new Vector3()

		// Set to true to automatically rotate around the target
		// If auto-rotate is enabled, you must call controls.update() in your animation loop
		this.autoRotate = false
		this.autoRotateSpeed = 2.0 // 30 seconds per orbit when fps is 60
		this.rotateSpeed = 1.0

		// public update method!
		this.update = (function () {
			const offset = new Vector3()

			// so camera.up is the orbit axis
			const quat = new Quaternion().setFromUnitVectors(object.up, new Vector3(0, 1, 0))
			const quatInverse = quat.clone().invert()

			const lastPosition = new Vector3()
			const lastQuaternion = new Quaternion()

			return function update() {
				scope.isDragging = state === STATE.ROTATE || state === STATE.TOUCH_ROTATE

				const position = scope.object.position
				offset.copy(position).sub(scope.target)

				// rotate offset to "y-axis-is-up" space
				offset.applyQuaternion(quat)

				// angle from z-axis around y-axis
				spherical.setFromVector3(offset)

				if (scope.autoRotate && state === STATE.NONE) {
					sphericalDelta.theta -= ((2 * Math.PI) / 60 / 60) * scope.autoRotateSpeed
				}

				spherical.theta += sphericalDelta.theta
				spherical.phi += sphericalDelta.phi

				// restrict phi to be between desired limits
				spherical.phi = Math.max(0, Math.min(Math.PI, spherical.phi))
				spherical.makeSafe()

				offset.setFromSpherical(spherical)

				// rotate offset back to "camera-up-vector-is-up" space
				offset.applyQuaternion(quatInverse)

				position.copy(scope.target).add(offset)
				scope.object.lookAt(scope.target)
				sphericalDelta.set(0, 0, 0)

				// update condition is:
				// min(camera displacement, camera rotation in radians)^2 > EPS
				// using small-angle approximation cos(x/2) = 1 - x^2 / 8
				if (
					lastPosition.distanceToSquared(scope.object.position) > EPS ||
					8 * (1 - lastQuaternion.dot(scope.object.quaternion)) > EPS
				) {
					lastPosition.copy(scope.object.position)
					lastQuaternion.copy(scope.object.quaternion)
					return true
				}

				return false
			}
		})()

		this.cleanup = function () {
			scope.domElement.removeEventListener('pointerdown', onPointerDown)
			scope.domElement.removeEventListener('pointercancel', onPointerCancel)

			scope.domElement.removeEventListener('pointermove', onPointerMove)
			scope.domElement.removeEventListener('pointerup', onPointerUp)
		}

		//
		// internals
		//

		const scope = this

		const STATE = {
			NONE: -1,
			ROTATE: 0,
			TOUCH_ROTATE: 1,
		}

		let state = STATE.NONE

		const EPS = 0.000001

		// current position in spherical coordinates
		const spherical = new Spherical()
		const sphericalDelta = new Spherical()

		const rotateStart = new Vector2()
		const rotateEnd = new Vector2()
		const rotateDelta = new Vector2()

		const pointers: PointerEvent[] = []

		// event handler utilities
		function handleMouseDownRotate(event: MouseEvent) {
			rotateStart.set(event.clientX, event.clientY)
		}

		function handleMouseMoveRotate(event: MouseEvent) {
			rotateEnd.set(event.clientX, event.clientY)
			rotateDelta.subVectors(rotateEnd, rotateStart).multiplyScalar(scope.rotateSpeed)

			const element = scope.domElement
			sphericalDelta.theta -= (2 * Math.PI * rotateDelta.x) / element.clientHeight // yes, height
			sphericalDelta.phi -= (2 * Math.PI * rotateDelta.y) / element.clientHeight
			rotateStart.copy(rotateEnd)
		}

		function handleTouchStartRotate() {
			if (pointers.length === 1) {
				rotateStart.set(pointers[0]!.pageX, pointers[0]!.pageY)
			} else {
				const x = 0.5 * (pointers[0]!.pageX + pointers[1]!.pageX)
				const y = 0.5 * (pointers[0]!.pageY + pointers[1]!.pageY)

				rotateStart.set(x, y)
			}
		}

		function handleTouchMoveRotate(event: PointerEvent) {
			if (pointers.length == 1) {
				rotateEnd.set(event.pageX, event.pageY)
			}
			rotateDelta.subVectors(rotateEnd, rotateStart).multiplyScalar(scope.rotateSpeed)

			const element = scope.domElement
			sphericalDelta.theta -= (2 * Math.PI * rotateDelta.x) / element.clientHeight // yes, height
			sphericalDelta.phi -= (2 * Math.PI * rotateDelta.y) / element.clientHeight
			rotateStart.copy(rotateEnd)
		}

		// event handlers
		function onPointerDown(event: PointerEvent) {
			if (scope.enabled === false || !canStartDrag()) return

			if (pointers.length === 0) {
				scope.domElement.setPointerCapture(event.pointerId)
				scope.domElement.addEventListener('pointermove', onPointerMove)
				scope.domElement.addEventListener('pointerup', onPointerUp)
			}

			addPointer(event)

			if (event.pointerType === 'touch') {
				onTouchStart(event)
			} else {
				onMouseDown(event)
			}
		}
		function onPointerMove(event: PointerEvent) {
			if (scope.enabled === false || !canContinueDrag()) return

			if (event.pointerType === 'touch') {
				onTouchMove(event)
			} else {
				onMouseMove(event)
			}
		}
		function onPointerUp(event: PointerEvent) {
			removePointer(event)

			if (pointers.length === 0) {
				scope.domElement.releasePointerCapture(event.pointerId)
				scope.domElement.removeEventListener('pointermove', onPointerMove)
				scope.domElement.removeEventListener('pointerup', onPointerUp)
			}

			state = STATE.NONE
		}
		function onPointerCancel(event: PointerEvent) {
			removePointer(event)
		}

		function onMouseDown(event: PointerEvent) {
			if (event.button === 0) {
				event.preventDefault()
				handleMouseDownRotate(event)
				state = STATE.ROTATE
			} else {
				state = STATE.NONE
			}
		}
		function onMouseMove(event: PointerEvent) {
			if (state === STATE.ROTATE) {
				event.preventDefault()
				handleMouseMoveRotate(event)
			}
		}

		function onTouchStart(event: PointerEvent) {
			if (pointers.length === 1) {
				event.preventDefault()
				handleTouchStartRotate()
				state = STATE.TOUCH_ROTATE
			} else {
				state = STATE.NONE
			}
		}
		function onTouchMove(event: PointerEvent) {
			if (state === STATE.TOUCH_ROTATE) {
				event.preventDefault()
				handleTouchMoveRotate(event)
			} else {
				state = STATE.NONE
			}
		}

		function addPointer(event: PointerEvent) {
			pointers.push(event)
		}
		function removePointer(event: PointerEvent) {
			for (let i = 0; i < pointers.length; i++) {
				if (pointers[i]!.pointerId == event.pointerId) {
					pointers.splice(i, 1)
					return
				}
			}
		}

		this.registerListeners = () => {
			scope.domElement.addEventListener('pointerdown', onPointerDown)
			scope.domElement.addEventListener('pointercancel', onPointerCancel)
		}

		// force an update at start
		this.update()
	}
}

export { OrbitControls }
