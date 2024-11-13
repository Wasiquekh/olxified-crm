import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

// Check if running on the server or client
const isServer = typeof window === "undefined";

// Default base URL
const defaultBaseURL = "https://orizon-crm-api-uat.yliqo.com/api/v1/Orizonapigateway";

export default class AxiosProvider {
  private instance: AxiosInstance;
  private baseURL: string;

  constructor(
    baseURL: string = defaultBaseURL,
    headers: Record<string, string> = { "Content-Type": "application/x-www-form-urlencoded" }
  ) {
    // Dynamically set the base URL based on environment (server or client)
    this.baseURL = isServer
      ? process.env.NEXT_PUBLIC_API_URL || baseURL // server-side
      : baseURL; // client-side

    this.instance = axios.create({
      baseURL: this.baseURL,
      headers: headers,
    });

    // Add response interceptor
    this.instance.interceptors.response.use(
      this.handleResponse,
      this.handleError
    );
  }

  async post<T = any>(url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.post(url, data, config);
  }

  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.get(url, config);
  }

  async put<T = any>(url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.put(url, data, config);
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.delete(url, config);
  }

  private handleResponse(response: AxiosResponse): AxiosResponse {
    // Optional: Log response data if needed
    // console.log("Response Data:", response.data);
    return response;
  }

  private handleError(error: any): Promise<never> {
    console.error("Error:", error);
    if (error.response?.status === 401) {
      if (!isServer) {
        window.location.href = "/"; // Handle redirection on API error
      }
    }
    return Promise.reject(error);
  }
}
