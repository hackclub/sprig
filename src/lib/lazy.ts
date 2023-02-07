const lazyUninitialized = Symbol('lazyUninitialized')

export const lazy = <T extends {}>(init: () => T): T => {
	let self: T | typeof lazyUninitialized = lazyUninitialized
	return new Proxy({}, {
		get(_, prop) {
			if (self === lazyUninitialized) self = init()
			const value = Reflect.get(self, prop)
			if (value instanceof Function) {
				return value.bind(self)
			} else {
				return value
			}
		},
		set(_, prop, value) {
			if (self === lazyUninitialized) self = init()
			return Reflect.set(self, prop, value)
		},
	}) as T
}