import axios from "axios";

const axiosConfig = async (method, url, reqbody, reqheader = {}) => {
let configObj = {
method: method,
url: url,
data: reqbody,
headers: reqheader,
withCredentials: true
};

try {
const res = await axios(configObj);
return res.data;
} catch (err) {
return err;
}
};

export default axiosConfig;