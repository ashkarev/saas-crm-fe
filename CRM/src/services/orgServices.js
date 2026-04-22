import axiosConfig from "./axiosConfig";
import { ENDPOINTS } from "./apiEndpoints";

export const getDashboard = () => axiosConfig("GET", ENDPOINTS.DASHBOARD);
export const getOrgMe = () => axiosConfig("GET", ENDPOINTS.ORG_ME);
