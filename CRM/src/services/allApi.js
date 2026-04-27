import axiosConfig from "./axiosConfig";
import { ENDPOINTS } from "./apiEndpoints";
import { baseUrl } from "./baseUrl";

const API_BASE = `${baseUrl}/api`;

// AUTH
export const loginUser = (data) =>
  axiosConfig("POST", ENDPOINTS.LOGIN, data);

export const logoutUser = () =>
  axiosConfig("POST", ENDPOINTS.LOGOUT);

export const getMe = () =>
  axiosConfig("GET", ENDPOINTS.ME);

// USERS
export const getUsers = (params) =>
  axiosConfig("GET", `${API_BASE}/users/getAllUsers`, null, params);

export const createUser = (data) =>
  axiosConfig("POST", `${API_BASE}/users/userAdding`, data);

export const updateUser = (id, data) =>
  axiosConfig("PUT", `${API_BASE}/users/${id}/UpdateUser`, data);

export const deleteUser = (id) =>
  axiosConfig("DELETE", `${API_BASE}/users/${id}/deleteUser`);

export const restoreUser = (id) =>
  axiosConfig("PUT", `${API_BASE}/users/${id}/restoreUser`);

export const getSingleUser = (id) =>
  axiosConfig("GET", `${API_BASE}/users/${id}/getSingleUser`);

// DASHBOARD
export const getDashboard = () =>
  axiosConfig("GET", ENDPOINTS.DASHBOARD);

// ANALYTICS
export const getAnalytics = () =>
  axiosConfig("GET", ENDPOINTS.ANALYTICS);

// ROLES
export const getRoles = (params) =>
  axiosConfig("GET", ENDPOINTS.ROLES, null, params);

export const createRole = (data) =>
  axiosConfig("POST", ENDPOINTS.ROLES, data);

export const updateRole = (id, data) =>
  axiosConfig("PUT", `${ENDPOINTS.ROLES}/${id}`, data);

export const deleteRole = (id) =>
  axiosConfig("DELETE", `${ENDPOINTS.ROLES}/${id}`);

// AUDIT LOGS
export const getAuditLogs = (params) =>
  axiosConfig("GET", ENDPOINTS.AUDIT_LOGS, null, params);

// RECORDS
export const getRecords = (params) =>
  axiosConfig("GET", ENDPOINTS.RECORDS, null, params);

export const createRecord = (data) =>
  axiosConfig("POST", ENDPOINTS.RECORDS, data);

export const updateRecord = (id, data) =>
  axiosConfig("PUT", `${ENDPOINTS.RECORDS}/${id}`, data);

export const deleteRecord = (id) =>
  axiosConfig("DELETE", `${ENDPOINTS.RECORDS}/${id}`);

export const restoreRecord = (id) =>
  axiosConfig("PUT", `${ENDPOINTS.RECORDS}/${id}/restore`);

// ATTENDANCE
export const getAttendance = (params) =>
  axiosConfig("GET", ENDPOINTS.ATTENDANCE, null, params);

export const markAttendance = (data) =>
  axiosConfig("POST", `${ENDPOINTS.ATTENDANCE}/mark`, data);

export const attendanceServices = {
  getAllAttendance: getAttendance,
  markAttendance: markAttendance,
  getMyAttendance: () => axiosConfig("GET", `${ENDPOINTS.ATTENDANCE}/my`),
};