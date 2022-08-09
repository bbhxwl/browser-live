import axios from "axios";
//import jwt_decode from "jwt-decode";
import { Loading } from 'element-ui';
import qs from "qs";
import {handleStatus} from "@/code/common/index"

const service = axios.create({
  validateStatus(status) {
    // 设置默认的合法的状态
    return status >= 200 && status < 504;
  },
  timeout: 10000, // 请求超时时间
});
const FORM = "application/x-www-form-urlencoded";
const JSON = "application/json";
//const MULTI = "multipart/form-data";
service.defaults.baseURL = "https://api.adl66.com/api/ManageSysApi/";
service.defaults.headers["Content-Type"] = FORM;
let loadingInstance;
// request拦截器
service.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = config.ContentType || JSON;
    config.headers["Accept-Language"] = "zh-CN";
    loadingInstance   = Loading.service({ fullscreen: true });
    // 可以全局设置接口请求header中带token

    if (config.method === "post" && !config.data) {
      config.data = {};
    }else if (config.method === "post"&&config.ContentType===FORM){
        config.data = qs.stringify(config.data); // qs序列化参数
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

//response拦截器
service.interceptors.response.use(
  (response) => {
      loadingInstance.close()
    return handleStatus(response);
  },
  (err) => {
      loadingInstance.close()
    return handleStatus(err.response); // 返回接口返回的错误信息
  }
);
export default service;
