import http from "http/http";
import { AxiosResponse } from "axios";

export const getMessagesByTopicId = (topicId: string): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    http(`/message/getMessagesByTopicId/${topicId}`, "get")
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const sendMessage = ({
  message,
  topicId,
  userId,
}: {
  topicId: string;
  message: string;
  userId: string;
}): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    http(`message/createMessage`, "post", { context: message, sender: userId, topicId })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
