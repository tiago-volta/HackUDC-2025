import axios, { AxiosInstance } from "axios";
import { HttpRequestError } from "../../core/errors/http.error";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CONFIG } from "../../constants/config";

class AxiosHttpClient {
  private cache: Map<string, { data: any; timestamp: number }>;
  private readonly CACHE_DURATION = 2500; // 2.5 seconds in milliseconds
  public readonly client: AxiosInstance;

  constructor() {
    this.cache = new Map();
    this.client = axios.create({
      baseURL: CONFIG.API.BASE_URL,
      timeout: 20000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  private getCacheKey(config: any): string {
    return `${config.method}:${config.url}${JSON.stringify(
      config.params || {}
    )}`;
  }

  private isCacheValid(timestamp: number): boolean {
    return Date.now() - timestamp < this.CACHE_DURATION;
  }

  private async getToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(CONFIG.APP.STORAGE_COOKIE_NAME);
    } catch (error) {
      console.error("Error getting token from AsyncStorage:", error);
      return null;
    }
  }

  private setupInterceptors() {
    this.client.interceptors.request.use(
      async (config) => {
        // Set Authorization header if token exists in AsyncStorage
        const token = await this.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        console.log(`[Request] ${config.method?.toUpperCase()} ${config.url}`);
        console.log("[Request] Headers:", config.headers);
        console.log("[Request] Body:", config.data);

        const cacheKey = this.getCacheKey(config);
        const cachedData = this.cache.get(cacheKey);

        if (cachedData && this.isCacheValid(cachedData.timestamp)) {
          console.log(`[Cache] Hit for ${cacheKey}`);
          // Return cached data by rejecting the request with a special flag
          return Promise.reject({
            __cached: true,
            data: cachedData.data,
          });
        }

        console.log(`[Cache] Miss for ${cacheKey}`);
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      (response) => {
        const cacheKey = this.getCacheKey(response.config);
        this.cache.set(cacheKey, {
          data: response.data,
          timestamp: Date.now(),
        });
        console.log(`[Cache] Stored ${cacheKey}`);
        return response;
      },
      (error) => {
        // If this is our cached response, return it as a successful response
        if (error.__cached) {
          return Promise.resolve({ data: error.data });
        }

        if (axios.isAxiosError(error)) {
          return Promise.reject(
            new HttpRequestError(
              error.message,
              error.response?.status || 500,
              error.config,
              error.response
            )
          );
        }
        return Promise.reject(error);
      }
    );
  }
}

const { client: api } = new AxiosHttpClient();

export { api };
