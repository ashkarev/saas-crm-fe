import { baseUrl } from "./baseUrl";

const API_BASE = `${baseUrl}/api`;

export const ENDPOINTS = {
  LOGIN: `${API_BASE}/users/userLogin`,
  ME: `${API_BASE}/users/me`,
  LOGOUT: `${API_BASE}/auth/logout`,
  REGISTER: `${API_BASE}/users/userAdding`,
  ATTENDANCE: `${API_BASE}/attendance`,
  MY_ATTENDANCE: `${API_BASE}/attendance/my`,
  LEADS: `${API_BASE}/leads`,
  DASHBOARD: `${API_BASE}/organizations/dashboard`,
  ANALYTICS: `${API_BASE}/organizations/analytics`,
  ORG_ME: `${API_BASE}/organizations/me`,
  ROLES: `${API_BASE}/roles`,
  AUDIT_LOGS: `${API_BASE}/audit-logs`,
  RECORDS: `${API_BASE}/records`,
  UPDATE_ME: `${API_BASE}/users/updateMe`,
  CHANGE_PASSWORD: `${API_BASE}/users/changePassword`,
};
