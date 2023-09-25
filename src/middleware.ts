import metrics from "../metrics";

export async function onRequest({ request }: any, next: () => any) {
	const url = request.url;

	if (!url.includes("api")) return next();

	const metricName = url.split("/").slice(3).join("_");
	const response = await next();

	const metricKey = `${response.status}.${metricName}`;
	console.log(metricKey);
	metrics.increment(metricKey, 1);
}