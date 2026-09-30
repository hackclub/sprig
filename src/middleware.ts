import metrics from "../metrics";

export async function onRequest({ request }: any, next: () => any) {
  const path = new URL(request.url).pathname.slice(1);
  let response = await next();

  if (path === "game-sandbox" || path === "game-sandbox/") {
	const contentType = response.headers.get("Content-Type") ?? "";
	if (contentType.includes("text/html")) {
		const html = await response.text();
		response = new Response(
			html.replaceAll(
				'<script type="module" src=',
				'<script type="module" crossorigin="use-credentials" src='
			),
			response
		);
	}

	response.headers.set(
		"Content-Security-Policy",
		[
			"default-src 'none'",
			"script-src 'self' 'unsafe-eval'",
			"style-src 'self' 'unsafe-inline'",
			"img-src 'self' data:",
			"media-src 'none'",
			"font-src 'none'",
			"connect-src 'none'",
			"frame-src 'none'",
			"object-src 'none'",
			"base-uri 'none'",
			"form-action 'none'",
			"frame-ancestors 'self'",
		].join("; ")
	);
	response.headers.set("Referrer-Policy", "no-referrer");
	response.headers.set("X-Content-Type-Options", "nosniff");
  }

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
