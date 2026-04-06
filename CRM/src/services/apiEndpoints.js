import { baseUrl } from "./baseUrl";

const API_BASE = `${baseUrl}/api`;

export const ENDPOINTS = {
  LOGIN: `${API_BASE}/users/userLogin`,
  ME: `${API_BASE}/users/me`,
  LOGOUT: `${API_BASE}/auth/logout`,
  REGISTER: `${API_BASE}/users/userAdding`,
  ATTENDANCE: `${API_BASE}/attendance`,
  MY_ATTENDANCE: `${API_BASE}/attendance/my`,
};
