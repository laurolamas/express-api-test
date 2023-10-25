const { BlobServiceClient } = require("@azure/storage-blob");
require("dotenv").config();
const Stream = require("stream");

const connectionString = process.env.AZURE_CONNECTION_STRING;

const blobServiceClient =
  BlobServiceClient.fromConnectionString(connectionString);

const containerName = "images";

// recieve image object and uploads it to azure blob storage

exports.uploadImage = async (image) => {
  console.log("Entro a uploadImage");
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blobName = "image" + new Date().getTime() + ".jpg";
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  const uploadOptions = {
    bufferSize: 4 * 1024 * 1024, // 4MB buffer size
    maxBuffers: 20, // Maximum number of buffers
  };

  console.log(image, typeof image);

  const stream = Stream.Readable.from(image.buffer);

  const uploadResponse = await blockBlobClient.uploadStream(
    stream,
    uploadOptions.bufferSize,
    uploadOptions.maxBuffers,
    { blobHTTPHeaders: { blobContentType: "image/jpeg" } }
  );

  console.log(`Upload complete. ${uploadResponse.requestId}`);
  return blockBlobClient.url;
};

// recieve image url and deletes it from azure blob storage
//async function deleteImage(imageUrl) {}
exports.deleteImage = async (imageUrl) => {};
