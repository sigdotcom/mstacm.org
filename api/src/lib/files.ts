import {
  Aborter,
  BlobURL,
  BlockBlobURL,
  ContainerURL,
  Pipeline,
  ServiceURL,
  SharedKeyCredential,
  StorageURL,
  uploadStreamToBlockBlob
} from "@azure/storage-blob";
import { Readable } from "stream";
import { config } from "../config";

const CONTAINER_NAME = "resumes";
const EIGHT_MB = 8096 * 1000 * 1000;
const STORAGE_ACCOUNT = config.AZURE_STORAGE_ACCOUNT;
const STORAGE_KEY = config.AZURE_STORAGE_ACCOUNT_KEY;

const generatePipeline = (): Pipeline => {
  const sharedKeyCredential = new SharedKeyCredential(
    STORAGE_ACCOUNT,
    STORAGE_KEY
  );

  return StorageURL.newPipeline(sharedKeyCredential);
};

const generateContainerURL = (containerName: string): ContainerURL => {
  const pipeline = generatePipeline();
  const serviceURL = new ServiceURL(config.AZURE_STORAGE_URL, pipeline);

  return ContainerURL.fromServiceURL(serviceURL, CONTAINER_NAME);
};

const generateBlockBlobURL = (
  containerURL: ContainerURL,
  filename: string
): BlockBlobURL => {
  const blobURL = BlobURL.fromContainerURL(containerURL, filename);

  return BlockBlobURL.fromBlobURL(blobURL);
};

export const deleteFile = async (url: string) => {
  const pipeline = generatePipeline();
  const blockBlobURL = new BlockBlobURL(url, pipeline);
  await blockBlobURL.delete(Aborter.none);
};

export const uploadFile = async (
  stream: Readable,
  filename: string
): Promise<string> => {
  const containerURL = generateContainerURL(CONTAINER_NAME);
  try {
    await containerURL.create(Aborter.none);
  } catch (e) {}
  const blockBlobURL = generateBlockBlobURL(containerURL, filename);
  await uploadStreamToBlockBlob(
    Aborter.none,
    stream,
    blockBlobURL,
    EIGHT_MB,
    16
  );

  return Promise.resolve(blockBlobURL.url);
};
