import axiosConfig from "./axiosConfig";
import { ENDPOINTS } from "./apiEndpoints";

export const loginUser = async (data) => {
return await axiosConfig("post", ENDPOINTS.LOGIN, data);
};