import axios from "axios";
import { baseUrl } from "./baseUrl";

const axiosConfig = async (method, url, reqbody, params = {}) => {
  const configObj = {
    method: method,
    url: url.startsWith("http") ? url : `${baseUrl}${url}`,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  };

  // GET requests use params, everything else uses body
  if (method.toUpperCase() === "GET") {
    configObj.params = params;
  } else {
    configObj.data = reqbody;
  }

  try {
    const res = await axios(configObj);
    return res.data;
  } catch (err) {
    return err?.response?.data || { success: false, message: "Request failed" };
  }
};

export default axiosConfig;