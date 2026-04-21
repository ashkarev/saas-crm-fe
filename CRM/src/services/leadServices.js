import axiosConfig from "./axiosConfig";
import { ENDPOINTS } from "./apiEndpoints";

export const getLeads = (params) => axiosConfig("GET", `${ENDPOINTS.LEADS}?${new URLSearchParams(params)}`);
export const getSingleLead = (id) => axiosConfig("GET", `${ENDPOINTS.LEADS}/${id}`);
export const createLead = (data) => axiosConfig("POST", ENDPOINTS.LEADS, data);
export const updateLead = (id, data) => axiosConfig("PATCH", `${ENDPOINTS.LEADS}/${id}`, data);
export const deleteLead = (id) => axiosConfig("DELETE", `${ENDPOINTS.LEADS}/${id}`);

export const getContacts = (lead_id) => axiosConfig("GET", `${ENDPOINTS.LEADS}/contacts/all${lead_id ? `?lead_id=${lead_id}` : ""}`);
export const createContact = (data) => axiosConfig("POST", `${ENDPOINTS.LEADS}/contacts`, data);
export const updateContact = (id, data) => axiosConfig("PATCH", `${ENDPOINTS.LEADS}/contacts/${id}`, data);
export const deleteContact = (id) => axiosConfig("DELETE", `${ENDPOINTS.LEADS}/contacts/${id}`);

export const getDeals = (lead_id) => axiosConfig("GET", `${ENDPOINTS.LEADS}/deals/all${lead_id ? `?lead_id=${lead_id}` : ""}`);
export const createDeal = (data) => axiosConfig("POST", `${ENDPOINTS.LEADS}/deals`, data);
export const updateDeal = (id, data) => axiosConfig("PATCH", `${ENDPOINTS.LEADS}/deals/${id}`, data);
export const deleteDeal = (id) => axiosConfig("DELETE", `${ENDPOINTS.LEADS}/deals/${id}`);

export const getActivities = (lead_id) => axiosConfig("GET", `${ENDPOINTS.LEADS}/activities/all${lead_id ? `?lead_id=${lead_id}` : ""}`);
export const createActivity = (data) => axiosConfig("POST", `${ENDPOINTS.LEADS}/activities`, data);
export const markActivityDone = (id) => axiosConfig("PATCH", `${ENDPOINTS.LEADS}/activities/${id}/done`);
export const deleteActivity = (id) => axiosConfig("DELETE", `${ENDPOINTS.LEADS}/activities/${id}`);
