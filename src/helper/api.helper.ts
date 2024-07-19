const handleResponse = async (response: any) => {
  const isJson = response.headers?.get("content-type")?.includes("application/json");

  const data = isJson ? await response.json() : null;

  // Check if error response
  if (!response.ok) {
    // const { user, logout } = useUserStore();

    // Auto logout if 401 Unauthorized or 403 Forbidden response returned from api
    // if ([401, 403].includes(response.status) && user) {
    //   logout();
    // }

    // Get error message from body or default to response status
    const error = data?.message || "Something went wrong";

    return Promise.reject(error);
  }

  return data;
};

const request = (method: "GET" | "POST"): any => {
  return (url: string, bodyOrOptions: any): any => {
    let requestOptions: any = { method, headers: {} };

    // Update options if it has the extra ones in case of GET calls
    if (method === "GET" && !!bodyOrOptions) {
      requestOptions = { ...requestOptions, ...bodyOrOptions };
    }

    // Update options if it has the body in case of Non-GET calls
    if (method !== "GET" && !!bodyOrOptions) {
      requestOptions.headers["Content-Type"] = "application/json";
      requestOptions.body = JSON.stringify(bodyOrOptions);
    }

    return fetch(`${process.env.BACKEND_URL}${url}`, requestOptions).then(handleResponse);
  };
};

export const api = {
  get: request("GET"),
  post: request("POST"),
};
