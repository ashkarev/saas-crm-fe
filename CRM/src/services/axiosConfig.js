import axios from "axios";

const axiosConfig=async(method,url,reqbody,reqheader,)=>{
    let ConfigObj={
       method:method,
       url:url,
       data:reqbody,
       headers:reqheader 
    }

    return await axios(ConfigObj).then((res)=>{
        return res
    }).catch((err)=>{
        return err
    })
}

export default axiosConfig