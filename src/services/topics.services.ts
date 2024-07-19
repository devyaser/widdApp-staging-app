import { AxiosResponse } from "axios";
import http from "http/http";
import { TOPICS_CATEGORIES } from "utils/common";

export const getAllTopics = (
  pagination: IPagination,
  type: TOPICS_CATEGORIES,
  userId?: string
): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    http(
      `/topic/getAllTopics?page=${pagination.page}&pageSize=${
        pagination.pageSize
      }&type=${type}&userId=${userId as string}`,
      "get"
    )
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const getAllPinnedTopics = (
  pagination: IPagination
): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    http(
      `/pin/getAllPinnedTopics?page=${pagination.page}&pageSize=${pagination.pageSize}`,
      "get"
    )
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const getOwnedTopicsData = (
  pagination: IPagination
): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    http(
      `/topic/getMyOwnedContent?page=${pagination.page}&pageSize=${pagination.pageSize}`,
      "get"
    )
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const addNewTopic = (topic: Partial<ITopic>): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    http(`/topic/createTopic`, "post", topic)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const getTopicById = (topicId: string): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    http(`/topic/${topicId}`, "get")
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const updateTopic = (topic: Partial<ITopic>): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    http(`/topic/update`, "patch", topic)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const joinUserInTopic = (
  topicId: string,
  memberId: string
): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    http(`/topic/joinMember`, "post", { topicId, memberId })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
export const getUsersInTopic = (topicId: string): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    http(`/topic/getMembers/${topicId}`, "get")
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const getOwnedTopics = (): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    http(`/topic/getMyOwnedContent`, "get")
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const getGlobalTopic = (): Promise<AxiosResponse> => {
  return http("/topic/getGlobalTopic", "get");
};

export const pinTopic = ({
  topicId,
}: {
  topicId: string;
}): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    http(`/pin/pinnedTopic`, "post", { topicId })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const unpinTopic = ({
  topicId,
}: {
  topicId: string;
}): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    http(`/pin/removepinnedTopic/${topicId}`, "delete")
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
