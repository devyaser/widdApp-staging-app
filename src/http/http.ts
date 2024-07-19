import axios, { AxiosError, AxiosResponse } from 'axios'

axios.defaults.baseURL = process.env.BACKEND_URL;


const http = (
  url: string,
  type: 'get' | 'post' | 'put' | 'delete' | 'patch',
  body: any = null,
  token: string | null = null
): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    if (type === 'get') {
      axios[type](url, token ? { headers: { Authorization: `Bearer ${token}` } } : {})
        .then((res: AxiosResponse) => {
          return resolve(res)
        })
        .catch((err: AxiosError) => {
          return reject(err)
        })
    } else {
      axios[type](url, body, token ? { headers: { Authorization: `Bearer ${token}` } } : {})
        .then((res: AxiosResponse) => {
          return resolve(res)
        })
        .catch((err: AxiosError) => {
          return reject(err)
        })
    }
  })
}

export default http
