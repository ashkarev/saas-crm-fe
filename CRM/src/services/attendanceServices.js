import axiosConfig from "./axiosConfig";
import { ENDPOINTS } from "./apiEndpoints";

export const markAttendance = async () => {
  return await axiosConfig("post", ENDPOINTS.ATTENDANCE);
};

export const getMyAttendance = async () => {
  return await axiosConfig("get", ENDPOINTS.MY_ATTENDANCE);
};