export async function getConsolesRemaining(): Promise<number> {
	const jsonText = await fetch('https://airbridge.hackclub.com/v0.1/Sprig%20Waitlist/Requests')
	const data = await jsonText.json()
	if (!data) {
		throw 'Failed to Fetch'
	}
	const consoleCount = data.filter((console: any) => {
		let status = console.fields.Status
		return (status === 'Pending' || status === 'Approved')
	}).length
	return 420 - consoleCount
}