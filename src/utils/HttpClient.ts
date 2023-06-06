import axios, { AxiosRequestConfig } from "axios";

export default class HttpClient {
  public static async get<T>(url: string, params?: Object): Promise<T> {
    const response = await axios.get(url);
    return response.data;
  }

  public static async post<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig<any>
  ): Promise<T> {
    const response = await axios.post(url, data, config);
    return response.data;
  }

  public static async put<T>(url: string, data: any): Promise<T> {
    const response = await axios.put(url, data);
    return response.data;
  }

  public static async delete<T>(url: string): Promise<T> {
    const response = await axios.delete(url);
    return response.data;
  }
}
