import metrics from "../metrics";
import {APIContext} from "astro";

export async function onRequest({ request, clientAddress }: APIContext, next: () => any) {
  const path = new URL(request.url).pathname.slice(1);
  
  await fetch("https://plausible.io/api/event", {
	  method: "POST",
	  headers: {
		  "Content-Type": "application/json",
		  "User-Agent": request.headers.get("User-Agent")!,
		  "X-Forwarded-For": clientAddress,
	  },
	  body: JSON.stringify({
		  domain: "sprig.hackclub.com",
		  url: request.url,
		  name: "pageview"
	  })
  })
  
  if (!path.includes("api")) return next();

  const metricName = path.split("/").join("_");
  const start = performance.now();
  const response = await next();
  const time = performance.now() - start;

  const metricKey = `http.${response.status}.${metricName}`;
  console.log(metricKey);
  metrics.increment(metricKey, 1);
  metrics.timing(metricName, time);
}
