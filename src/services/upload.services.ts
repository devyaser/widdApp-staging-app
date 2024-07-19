import { AxiosResponse } from "axios";
import http from "http/http";

export const getPreSignedUrl = (
  fileName: string,
): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    const requestUrl = `/s3/upload-file?fileName=${fileName}`;

    http(requestUrl, "get")
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const directUpload = async (url: string, file: File | Blob): Promise<Response> => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      body: file,
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(async (res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
