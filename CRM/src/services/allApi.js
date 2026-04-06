import axiosConfig from "./axiosConfig";
import { ENDPOINTS } from "./apiEndpoints";

export const registerUser=async(reqbody)=>{
    return await axiosConfig('post',ENDPOINTS.REGISTER,reqbody)
}