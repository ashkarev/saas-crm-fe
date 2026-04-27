import axiosConfig from "./axiosConfig";
import { ENDPOINTS } from "./apiEndpoints";

export const markAttendance = () =>
  axiosConfig("POST", `${ENDPOINTS.ATTENDANCE}/mark`);

export const getMyAttendance = () =>
  axiosConfig("GET", `${ENDPOINTS.ATTENDANCE}/my`);

export const getAllAttendance = (params) =>
  axiosConfig("GET", ENDPOINTS.ATTENDANCE, null, params);