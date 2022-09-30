import AWS from "aws-sdk";
import { Readable } from "stream";
import { config } from "../config";

const s3: AWS.S3 = new AWS.S3({
  endpoint: config.DO_SPACES_ENDPOINT,
  region: config.DO_SPACES_REGION,
  accessKeyId: config.DO_SPACES_ACCESS_KEY_ID,
  secretAccessKey: config.DO_SPACES_SECRET_KEY_ID
});

export const deleteFile: (url: string) => void = async (url: string) => {
  // The URL will be something like
  // https://mstacm-cdn-test.nyc3.digitaloceanspaces.com/test/UUID.pdf
  // so this will split it down the middle and just give the 'test/UUID.pdf'
  // portion.
  const split_url: string[] = url.split(
    `${config.DO_SPACES_CDN_BUCKET_NAME}.${config.DO_SPACES_ENDPOINT}/`
  );
  const filename: string = split_url[1];
  await s3
    .deleteObject({ Bucket: config.DO_SPACES_CDN_BUCKET_NAME, Key: filename })
    .promise();
};

export const uploadFile: (
  stream: Readable,
  filename: string,
  contentType?: string
) => Promise<string> = async (
  stream: Readable,
  filename: string,
  contentType?: string
): Promise<string> => {
  const response: AWS.S3.ManagedUpload.SendData = await s3
    .upload({
      Bucket: config.DO_SPACES_CDN_BUCKET_NAME,
      Key: filename,
      ACL: "public-read",
      Body: stream,
      ContentType: contentType
    })
    .promise();
  return response.Location;
};
