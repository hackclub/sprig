# Runbook

## Contents (Issues the runbook helps you to address)

## References

- Grafana Dashboard: [telemetry.hackclub.com](https://telemetry.hackclub.com) 
- Vercel Project: [hackclub/vercel](https://vercel.com/hackclub/sprig)
- Sprig Grafana Alerts [sprig @ grafana alerts](https://telemetry.hackclub.com/alerting/list)
- Sprig Grafana Dashboard [sprig @ grafana](https://telemetry.hackclub.com/d/b7ac7960-a18f-4c83-a4e5-767d50ad62c7/sprig?orgId=1)

## Rollback to the latest stable deployment

Go to [vercel hackclub/sprig](https://vercel.com/hackclub/sprig) project and click the instant rollback button.
![rollback_01](./assets/rollback01.png)

Then select the previous deployment. 
![rollback_02](./assets/rollback02.png)

## An error you are unsure about

Open the [Grafana Dashboard](https://telemetry.hackclub.com/d/b7ac7960-a18f-4c83-a4e5-767d50ad62c7/sprig?orgId=1) and look at 'Failing operations' and 'API Endpoint Latencies' visualizations under the Sprig dashboard.

From those you should be able to quickly spot issues in the sprig dashboard.

## Database operations fail

To see what database operations are failing, open the sprig dashboard in grafana [here](https://telemetry.hackclub.com/d/b7ac7960-a18f-4c83-a4e5-767d50ad62c7/sprig?orgId=1) and look at what database operations are failing.

If database operations fail, you will want to look at the logs at <logging-service>. 

Alternatively, checkout the Sprig Firebase project to ensure we have not reached our limit and that bills have been paid.

## Sprig stops reporting to grafana

1. Check the Vercel project to make sure the current deployment is not broken
2. Make sure the environment variables are correctly set on vercel