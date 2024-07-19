import { AxiosResponse } from "axios";
import http from "http/http";

export const getUserByToken = (token: string): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    http("/user/getUserFromToken", "get", null, token)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const updateUserById = (
  userId: string,
  data: any
): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    http(`/user/update`, "patch", { userId, ...data })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const getUserById = (userId: string): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    http(`/user/${userId}`, "get")
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const getAllFollowers = (
  userId: string,
  pagination: IPagination
): Promise<AxiosResponse> => {
  return http(
    `user/getAllFollowers?userId=${userId}&pageSize=${pagination.pageSize}&page=${pagination.page}`,
    "get"
  );
};

export const removeFollowers = (users: string[]): Promise<AxiosResponse> => {
  return http(`user/removeFollowers?ids=${users?.join(",")}`, "delete", {
    followedByArray: users,
  });
};

export const createList = (
  name: string,
  list: string[]
): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    http(`/list/createList`, "post", {
      name,
      memberIdArray: list,
    })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
