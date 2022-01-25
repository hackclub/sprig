// This code doesn't run in the codebase, it's a backup of the code running in AWS Lambda

// Are you editing this on AWS? Please make sure to update github.com/hackclub/game-lab once you deploy.

// Are you on github? You can find this on https://eu-west-1.console.aws.amazon.com/lambda/home?region=eu-west-1#/functions/getPresignedURL?tab=code
// Under the logins@hackclub.com account (details in the team 1password)

// Based on https://www.youtube.com/watch?v=mw_-0iCVpUc

const AWS = require('aws-sdk')
AWS.config.update({ region: process.env.AWS_REGION })
const s3 = new AWS.S3()

// Main Lambda entry point
exports.handler = async (event) => {
    const result = await getUploadURL(event)
    console.log('Event:', event)
    console.log('Result:', result)
    return result
}


const getUploadURL = async function(event) {
    const id = event?.queryStringParameters?.id || parseInt(Math.random()*10000000000)
    
    const s3Params = {
        Bucket: process.env.UploadBucket,
        Key: `${id}.json`,
        ContentType: 'application/json',
        ACL: 'public-read'
    }
    
    console.log('getUploadURL: ', s3Params)
    return new Promise((resolve, reject) => {
        // Get signed URL
        resolve({
            "statusCode": 200,
            "isBase64Encoded": false,
            "headers": {
                "Access-Control-Allow-Origin": "*"
            },
            "body": JSON.stringify({
                "uploadURL": s3.getSignedUrl('putObject', s3Params),
                "jsonFilename": `${id}.json`,
                "id": id
            })
        })
    })
}