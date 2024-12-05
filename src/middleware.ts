import metrics from "../metrics";

export async function onRequest({ request }: any, next: () => any) {
  const path = new URL(request.url).pathname.slice(1);
  const response = await next();

  if(path.includes("~") || path.includes("editor")) {
	response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
  }

  if (!path.includes("api")) return response;

  const metricName = path.split("/").join("_");
  const start = performance.now();
  const time = performance.now() - start;

  const metricKey = `http.${response.status}.${metricName}`;
  console.log(metricKey);
  
  await Promise.all([
	  new Promise(resolve => metrics.increment(metricKey, 1, resolve)),
	  new Promise(resolve => metrics.timing(metricName, time, resolve))
  ])
}
