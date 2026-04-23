import axiosConfig from './axiosConfig';

// ==========================================
// USERS
// ==========================================
export const getUsers = async (params = {}) => {
  return await axiosConfig('GET', '/api/users/getAllUsers', params);
};

export const createUser = async (data) => {
  return await axiosConfig('POST', '/api/users/userAdding', data);
};

export const updateUser = async (id, data) => {
  return await axiosConfig('PUT', `/api/users/${id}/UpdateUser`, data);
};

export const deleteUser = async (id) => {
  return await axiosConfig('DELETE', `/api/users/${id}/deleteUser`);
};

// ==========================================
// ROLES
// ==========================================
export const getRoles = async (params = {}) => {
  return await axiosConfig('GET', '/api/roles/getRole', params);
};

export const createRole = async (data) => {
  return await axiosConfig('POST', '/api/roles/createRole', data);
};

export const updateRole = async (id, data) => {
  return await axiosConfig('PUT', `/api/roles/${id}/UpdateRole`, data);
};

export const deleteRole = async (id) => {
  return await axiosConfig('DELETE', `/api/roles/${id}/deleteRole`);
};

// ==========================================
// DASHBOARD & ANALYTICS
// ==========================================
export const getDashboard = async () => {
  return await axiosConfig('GET', '/api/organizations/dashboard');
};

export const getAnalytics = async () => {
  return await axiosConfig('GET', '/api/organizations/analytics');
};

// ==========================================
// AUDIT LOGS
// ==========================================
export const getAuditLogs = async (params = {}) => {
  return await axiosConfig('GET', '/api/audit-logs/getAudit', params);
};

// ==========================================
// RECORDS
// ==========================================
export const getRecords = async (params = {}) => {
  return await axiosConfig('GET', '/api/records/getRecord', params);
};

export const createRecord = async (data) => {
  return await axiosConfig('POST', '/api/records/create', data);
};

export const updateRecord = async (id, data) => {
  return await axiosConfig('PUT', `/api/records/${id}/update`, data);
};

export const deleteRecord = async (id) => {
  return await axiosConfig('DELETE', `/api/records/${id}/delete`);
};

export const restoreRecord = async (id) => {
  return await axiosConfig('PUT', `/api/records/${id}/restore`);
};

// 
// ATTENDANCE
// 
export const attendanceServices = {
  getAllAttendance: () => axiosConfig('GET', '/api/attendance/all'),
  markAttendance: (data) => axiosConfig('POST', '/api/attendance/mark', data),
  getMyAttendance: () => axiosConfig('GET', '/api/attendance/my'),
};

export const getAttendance = async (params = {}) => {
  return await axiosConfig('GET', '/api/attendance/all', params);
};


export const getMyAttendance = async () => {
  return await axiosConfig('GET', '/api/attendance/my');
};