require("dotenv").config({ path: `.env.development` });
// const aws = require("aws-sdk");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const uuid = require("uuid");

// aws.config.update({
//   region: process.env.AWS_REGION,
//   accessKeyID: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// });

const s3Client = new S3Client({ region: process.env.AWS_REGION });
const userID = "123";

const uploadToS3 = async ({ file, userID }) => {
  const key = `${userID}/${uuid.v4()}`;
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET,
    Key: key,
    Body: file.buffer,
    // ContentType: file.mimetype,
  });

  try {
    await s3Client.send(command);
    return { key };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

module.exports = { uploadToS3 };
