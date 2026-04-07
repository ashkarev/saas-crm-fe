import axios from "axios";
import { baseUrl } from "./baseUrl";

const axiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true, // 🔥 MUST for cookies
});

const axiosConfig = async (method, url, data = {}, headers = {}) => {
  try {
    const res = await axiosInstance({
      method,
      url,
      data,
      headers:{},
    });

    return res.data;
  } catch (err) {
    throw err;
  }
};

export default axiosConfig;