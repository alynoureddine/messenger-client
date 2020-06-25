import axios, { AxiosError, AxiosRequestConfig } from 'axios'

const axiosInstance = axios.create({
  baseURL:  process.env.REACT_APP_ENDPOINT,
});

axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  console.log('request intercepted', request);
  if (request.url !== 'auth/login' && request.url !== 'auth/register') {
    //todo redirect to login page
  }

  return request
});

export interface ApiError {
  message: string,
  errors: {[key: string]: string},
}

export interface ApiResponse <T> {
  response: T | null,
  error: ApiError | null,
}

const mapSuccessfulResponse = <T>({data}: { data: T }): ApiResponse<T> => ({response: data, error: null});
const mapFailedResponse = <T>({ response }: AxiosError): ApiResponse<T> => ({ response: null, error: response?.data});

export const Api = {
  get: <T>(url: string): Promise<ApiResponse<T>> => axiosInstance.get<T>(url)
    .then(mapSuccessfulResponse)
    .catch<ApiResponse<T>>(mapFailedResponse),
  post: <T>(url: string, payload: object = {}): Promise<ApiResponse<T>> => axiosInstance.post<T>(url, payload)
    .then(mapSuccessfulResponse)
    .catch<ApiResponse<T>>(mapFailedResponse),
};
