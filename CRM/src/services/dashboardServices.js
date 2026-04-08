import axiosConfig from './axiosConfig';

// USERS
export const userServices = {
  createUser: (data) => axiosConfig.post('/api/users', data),
  getUsers: (params) => axiosConfig.get('/api/users', { params }),
  getSingleUser: (id) => axiosConfig.get(`/api/users/${id}`),
  updateUser: (id, data) => axiosConfig.put(`/api/users/${id}`, data),
  deleteUser: (id) => axiosConfig.delete(`/api/users/${id}`),
  restoreUser: (id) => axiosConfig.post(`/api/users/${id}/restore`),
};

// ROLES
export const roleServices = {
  createRole: (data) => axiosConfig.post('/api/roles', data),
  getRoles: (params) => axiosConfig.get('/api/roles', { params }),
  getSingleRole: (id) => axiosConfig.get(`/api/roles/${id}`),
  updateRole: (id, data) => axiosConfig.put(`/api/roles/${id}`, data),
  deleteRole: (id) => axiosConfig.delete(`/api/roles/${id}`),
  restoreRole: (id) => axiosConfig.post(`/api/roles/${id}/restore`),
};

// ORGANIZATIONS
export const organizationServices = {
  getDashboard: () => axiosConfig.get('/api/organizations/dashboard'),
  getAnalytics: () => axiosConfig.get('/api/organizations/analytics'),
  getOrganization: () => axiosConfig.get('/api/organizations/org'),
  upgradeOrganization: (planId) =>
    axiosConfig.post('/api/org/upgrade', { plan_id: planId }),
};

// AUDIT LOGS
export const auditServices = {
  getAuditLogs: (params) => axiosConfig.get('/api/audit-logs', { params }),
};

// RECORDS
export const recordServices = {
  createRecord: (data) => axiosConfig.post('/api/records', data),
  getRecords: (params) => axiosConfig.get('/api/records', { params }),
  getSingleRecord: (id) => axiosConfig.get(`/api/records/${id}`),
  updateRecord: (id, data) => axiosConfig.put(`/api/records/${id}`, data),
  deleteRecord: (id) => axiosConfig.delete(`/api/records/${id}`),
  restoreRecord: (id) => axiosConfig.post(`/api/records/${id}/restore`),
};

// ATTENDANCE
export const attendanceServices = {
  markAttendance: () => axiosConfig.post('/api/attendance/mark'),
  getMyAttendance: (params) => axiosConfig.get('/api/attendance/me', { params }),
};

export default {
  userServices,
  roleServices,
  organizationServices,
  auditServices,
  recordServices,
  attendanceServices,
};