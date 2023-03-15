export async function getConsolesRemaining(): Promise<number> {
	const data = await fetch('https://airbridge.hackclub.com/v0.1/Sprig%20Waitlist/Requests').then(r => r.json())
	if (!data) throw 'Failed to Fetch'
	const consoleCount = data.filter((console: any) => {
		let status = console.fields.Status
		return (status === 'Pending' || status === 'Approved')
	}).length
	return 420 - consoleCount
}