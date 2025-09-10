# Engineering Runbook

## Rollback Deployment

If a deployment is causing issues, you can rollback to a previous version:

1. Check the git history to find the last known good commit
2. Deploy that commit manually or revert the problematic changes

## Debugging Database Issues

If there are database issues:

1. Check the database logs for any errors
2. Verify database connection settings
3. Check if the database is running and accessible

## Debugging Telemetry Issues

If telemetry is not working:

1. Check if telemetry host is correctly configured
2. Verify telemetry data is being sent correctly
3. Check telemetry server logs for any issues

## Debugging Game Loading Issues

If games are not loading:

1. Check browser console for JavaScript errors
2. Verify game files are accessible
3. Check if game loading API endpoints are responding

## Need More Help?

Contact the development team on Slack for additional support.
