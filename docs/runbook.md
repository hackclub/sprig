# Runbook

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

## Saving and other database operations take too long
- Open the [sprig Grafana dashboard](https://telemetry.hackclub.com/d/b7ac7960-a18f-4c83-a4e5-767d50ad62c7/sprig?orgId=1) and look under 'Endpoint latencies over time'. 
- Look at what endpoint is taking the most time to resolve. 


## Database operations fail
- To see what database operations are failing, open the sprig dashboard in grafana [here](https://telemetry.hackclub.com/d/b7ac7960-a18f-4c83-a4e5-767d50ad62c7/sprig?orgId=1) and look at what database operations are failing.
- Open the [Vercel Logs](https://vercel.com/hackclub/sprig/logs?page=1&timeline=past30Minutes&startDate=1702547588649&endDate=1702549388649) for Sprig and checkout logs with level 'Error' or 'Warning'. 

### Attempt to trigger a failing operation
- If the failing database operation is any of the following, open the live logs on vercel while doing one of the following.
	- `api_games_save`, reproduce by opening one of your games in the editor, make an edit
	- `api_games_delete`, reproduce by deleting one of the games in your accout from the dashboard
	- `api_games_rename`, reproduce by opening one of your games in the editor, edit the games's name 
	- `api_thumbnail`, reproduce by opening the [sprig gallery](https://sprig.hackclub.com/gallery) 
	- `api_auth_email-login-code` or `api_auth_submit-code`, reproduce by logging into your account

## Sprig stops reporting to grafana

1. Check the Vercel project to make sure the current deployment is not broken
2. Make sure the environment variables are correctly set on vercel