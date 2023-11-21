# Runbook

## Contents (Issues the runbook helps you to address)

## References

- Grafana Dashboard: [telemetry.hackclub.com](https://telemetry.hackclub.com) 

## A bug in the sprig editor

Log a new issue at [hackclub/sprig#issue](https://github.com/hackclub/sprig/issues/new/choose)

## An error you are unsure about

Open the Grafana Dashboard and look at 'Failing operations' and 'API Endpoint Latencies' visualizations under the Sprig dashboard.

From those you should be able to quickly spot issues in the sprig dashboard.

## Database operations fail

To see what database operations are failing, open the sprig dashboard in grafana [here](https://telemetry.hackclub.com/d/b7ac7960-a18f-4c83-a4e5-767d50ad62c7/sprig?orgId=1) and look at what database operations are failing.

If database operations fail, you will want to look at the logs at <logging-service>. 

Alternatively, checkout the Sprig Firebase project to ensure we have not reached our limit and that bills have been paid.

## Sprig stops reporting to grafana

1. Check the Vercel project to make sure the current deployment is not broken
2. Make sure the environment variables are correctly set on vercel