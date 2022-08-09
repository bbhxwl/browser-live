import {getToken} from "@/code/jwt/jwtCommon"
import jwt_decode from "jwt-decode";
function handleStatus(response) {
    let token = getToken();
    switch (response.status) {
        case 401:
            if (token) {
                let decodedHeader = jwt_decode(token);
                let exp = new Date(decodedHeader.exp * 1000);
                if (new Date() > exp) {
                    alert("没有权限,返回登录页面");
                    window.location.pathname = "/";
                } else {
                    alert("token 未失效，仅仅是该接口没有权限");
                }
            } else {
                alert("未登录，跳转到登录页");
                window.location.pathname = "/";
            }
            return Promise.reject(response);
        case 403:
            alert("没有权限");
            break;
        default:
            return Promise.resolve(response);
    }
}

export {
    handleStatus
}