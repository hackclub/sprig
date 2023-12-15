import { StatsD } from "node-statsd";
import { config } from "dotenv";

config(); // load env vars

const environment = process.env.NODE_ENV;
const graphite = process.env.GRAPHITE_HOST;

if (graphite === null) throw new Error("Graphite host is not configured");

const options = {	
	host: graphite,
	port: 8125,
	prefix: `${environment}.sprig.`
};

const metrics = new StatsD(options);

export default metrics;