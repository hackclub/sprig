// This code doesn't run in the codebase, it's a backup of the code running in AWS Lambda

// Are you editing this on AWS? Please make sure to update github.com/hackclub/gamelab once you deploy.

// Are you on github? You can find this on https://eu-west-1.console.aws.amazon.com/lambda/home?region=eu-west-1#/functions/getPresignedURL?tab=code
// Under the logins@hackclub.com account (details in the team 1password)

// Based on https://www.youtube.com/watch?v=mw_-0iCVpUc

const AWS = require("aws-sdk");
AWS.config.update({ region: process.env.AWS_REGION });
const s3 = new AWS.S3();

// Main Lambda entry point
exports.handler = async (event) => {
  const result = await getUploadURL(event);
  console.log("Event:", event);
  console.log("Result:", result);
  return result;
};

const checkFileExists = async function (filename) {
  const s3Params = {
    Bucket: process.env.UploadBucket,
    Key: filename,
  };
  const result = await new Promise((resolve) => {
    s3.headObject(s3Params, resolve);
  });
  // this is weird, but this returns "null" when the file exists
  return result == null;
};

const createUploadURL = async function (filename) {
  console.log("generating uploadURL");
  const s3Params = {
    Bucket: process.env.UploadBucket,
    Key: filename,
    ContentType: "application/json",
    ACL: "public-read",
  };
  return await s3.getSignedUrl("putObject", s3Params);
};

const getUploadURL = async function (event) {
  const id =
    event?.queryStringParameters?.id || parseInt(Math.random() * 10000000000);
  const filename = `${id}.json`;

  const exists = await checkFileExists(filename);
  const uploadUrl = await createUploadURL(filename);
  return new Promise((resolve, reject) => {
    // Get signed URL
    resolve({
      statusCode: 200,
      isBase64Encoded: false,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        uploadURL: exists ? undefined : uploadUrl,
        jsonFilename: filename,
        id: id,
        exists: exists,
      }),
    });
  });
};
