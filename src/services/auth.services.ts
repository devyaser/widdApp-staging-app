import { AxiosResponse } from "axios";
import http from "http/http";

export const registerUser = async ({
  email,
  phoneNo,
  password,
  confirmPassword,
  userName,
  dob,
}: ISignUpBody): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    http("/auth/register", "post", { email, phoneNo, password, confirmPassword, userName, dob })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const loginUser = async ({ userName, password }: ILoginBody): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    http("/auth/login", "post", {
      password,
      userName,
    })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const verifyAccount = async (userId: string, code: string): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    http("/auth/checkVerification", "post", { userId, code })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
