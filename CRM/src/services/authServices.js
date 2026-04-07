import axiosConfig from "./axiosConfig";

export const loginUser = async (data) => {
  try {
    const res = await axiosConfig("POST", "/api/users/userLogin", data);
    return res;
  } catch (err) {
    return err.response?.data;
  }
};