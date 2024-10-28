import axios from "axios";

// Check if running on the server or client
const isServer = typeof window === "undefined";

// Default base URL
const defaultBaseURL = "https://orizon-crm-api-uat.yliqo.com/api/v1/Orizonapigateway";

export default class AxiosProvider {
  constructor(baseURL = defaultBaseURL, headers = { "Content-Type": "application/x-www-form-urlencoded" }) {
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

  async post(url, data, config) {
    return this.instance.post(url, data, config);
  }

  async get(url, config) {
    return this.instance.get(url, config);
  }

  async put(url, data, config) {
    return this.instance.put(url, data, config);
  }
  async delete(url, config) {
    return this.instance.delete(url, config);
  }
  handleResponse(response) {
    console.log("Response Data:", response.data);
    return response;
  }

  handleError(error) {
    console.error("Error:", error);
    return Promise.reject(error);
  }
}
