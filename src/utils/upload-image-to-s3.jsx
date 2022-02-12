import requestPN from "request-promise-native";
import appConfigApi from "../api/app-config.api";

export const signS3Url = async (file) => {
  const { S3Token } = await appConfigApi.getAppConfig();
  if (!S3Token) {
    throw new Error("Token expired");
  }

  const res = await requestPN.post(
    "https://api-uat.kindicare.com/api/v1/admin/signedUrlS3",
    {
      auth: { bearer: S3Token },
      json: {
        key: `quan-test/images/${file.name}`,
        type: file.type,
      },
    }
  );
  if (!res) {
    throw new Error("Sign s3 failed");
  }

  return res;
};

export const uploadFileToS3 = async (uploadUrl, file) => {
  await fetch(uploadUrl, {
    method: "PUT",
    body: file,
    headers: {
      Accept: "application/json",
      "Content-Type": file.type,
    },
  });
};
