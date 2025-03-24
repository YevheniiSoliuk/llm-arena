import { CONFIG } from "@/config";
import axios from "axios";

const BASE_URL = "https://api-inference.huggingface.co/models";

export const HUGGING_FASE_API = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${CONFIG.HF_API_TOKEN}`,
    "Content-Type": "application/json",
  },
});

HUGGING_FASE_API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config } = error;

    if (error.response.status === 503) {
      try {
        return await HUGGING_FASE_API.request({
          ...config,
          headers: {
            "x-wait-for-model": "true",
          },
        });
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
