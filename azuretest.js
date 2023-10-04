const { BlobServiceClient } = require("@azure/storage-blob");
require("dotenv").config();

const connStr = process.env.AZURE_CONNECTION_STRING;

const blobServiceClient = BlobServiceClient.fromConnectionString(connStr);

const containerName = "images";

async function main() {
  const containerClient = blobServiceClient.getContainerClient(containerName);

  // create a new blob containing an image
  const blobName = "image" + new Date().getTime() + ".jpg";
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  const uploadBlobResponse = await blockBlobClient.uploadFile(
    "./public/images/1.jpg"
  );
  console.log(
    `Upload block blob ${blobName} successfully`,
    uploadBlobResponse.requestId
  );

  // URL
  // https://storagerevint.blob.core.windows.net/images/${image_name}

  // list all blobs in the container
  console.log("List blobs...");
  let i = 1;
  for await (const blob of containerClient.listBlobsFlat()) {
    console.log(`Blob ${i++}: ${blob.name}`);
  }
}

main();
