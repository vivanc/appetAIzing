require("dotenv").config({ path: `.env.development` });
// const aws = require("aws-sdk");
const {
  S3Client,
  PutObjectCommand,
  ListObjectsV2Command,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");

const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const uuid = require("uuid");
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

// get all object keys
const getImageKeysByUser = async (userID) => {
  const command = new ListObjectsV2Command({
    Bucket: process.env.AWS_BUCKET,
    Prefix: userID,
  });

  // ListObjectsV2Command returns an array of properties and we want Contents property
  const { Contents = [] } = await s3Client.send(command);

  return Contents.map((image) => image.Key);
};

// create presigned url for all keys
const getUserPresignedUrls = async (userID) => {
  try {
    const imageKeys = await getImageKeysByUser(userID); // = [Keys, Keys, Keys]

    const presignedUrls = await Promise.all(
      imageKeys.map((key) => {
        const command = new GetObjectCommand({
          Bucket: process.env.AWS_BUCKET,
          Key: key,
        });
        return getSignedUrl(s3Client, command, { expiresIn: 900 });
      })
    );
    return { presignedUrls };
  } catch (error) {
    console.log("👎");
    return { error };
  }
};

module.exports = { uploadToS3, getUserPresignedUrls };
