import type { APIContext } from 'astro';
import { StatsD } from 'node-statsd';

const statsdClient = new StatsD({
	host: process.env.GRAPHITE_HOST,
	port: 8125,
	prefix: `${process.env.NODE_ENV}.sprig.`
});

export async function post({ request }: APIContext) {
	try {
		const { metric, value, type } = await request.json();

		if (type === 'increment') {
			statsdClient.increment(metric, value || 1);
		} else if (type === 'timing') {
			statsdClient.timing(metric, value);
		} else {
			return new Response('Invalid metric type', { status: 400 });
		}

		return new Response('Metric sent', { status: 200 });
	} catch (error) {
		console.error('Error sending metric:', error);
		return new Response('Failed to send metric', { status: 500 });
	}
}