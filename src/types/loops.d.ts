declare module 'loops' {
	export class LoopsClient {
		constructor(apiKey: string)
		findContact(email: string): Promise<any[]>
		createContact(email: string, attrs?: Record<string, any>): Promise<any>
		updateContact(email: string, attrs?: Record<string, any>): Promise<any>
	}
}


