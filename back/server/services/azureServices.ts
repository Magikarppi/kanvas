import { BlobSASPermissions, BlobServiceClient } from "@azure/storage-blob";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.AZURE_CONNECTION_STRING as string;
const blobServiceClient =
    BlobServiceClient.fromConnectionString(connectionString);

const containerName = process.env.AZURE_CONTAINER_NAME as string;
const containerClient = blobServiceClient.getContainerClient(containerName);

export const uploadImageBlob = async (
    blobName: string,
    base64Image: string,
    metaData: string
): Promise<string> => {
    const binaryData = Buffer.from(base64Image, "base64");
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.upload(binaryData, binaryData.length, {
        blobHTTPHeaders: {
            blobContentType: metaData,
        },
    });

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 365 * 50); // 50 years

    const sasToken = await blockBlobClient.generateSasUrl({
        expiresOn: expiryDate,
        permissions: BlobSASPermissions.parse("r"),
    });

    const urlWithSasToken = `${sasToken}`;

    return urlWithSasToken;
};
