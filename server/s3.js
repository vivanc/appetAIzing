require("dotenv").config({ path: `.env.development` });
const aws = require("aws-sdk");
// const crypto = require("crypto");
// const promiseify = require("util");

const region = "us-east-1";
const bucketName = "appetaizing-bucket";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
});

const generateUploadURL = async () => {
  const rawBytes = randomBytes(16);
  const imageName = rawBytes.toString("hex"); //makes it harder for anyone to just get images from our bucket

  const params = {
    Bucket: bucketName,
    Key: imageName,
    Expires: 60, //url expires in 60secs
  };

  const uploadUrl = await s3.getSignedUrlPromise("putObject", params);
  console.log("upload url is: tada");
  console.log(uploadUrl);
  return uploadUrl;
};

module.exports = {
  generateUploadURL,
};
