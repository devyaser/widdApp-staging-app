import { AxiosResponse } from "axios";
import http from "http/http";

export const getAllUsersLists = (): Promise<AxiosResponse> => {
  return http(`/list/getAllLists`, "get");
};

export const deleteUserList = (id: string): Promise<AxiosResponse> => {
  return http(`/list/deleteList/${id}`, "delete");
};
