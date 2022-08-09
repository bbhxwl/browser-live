import jwt_decode from "jwt-decode";

export  function getToken() {
    let token = sessionStorage.getItem("token");
    return token == null ? "" : token;
}

export  function getTokenModel() {

    const token = getToken();
    if (!token){
        return null;
    }
    let decodedHeader = jwt_decode(token);
    decodedHeader.UserInfo=JSON.parse(decodedHeader.UserInfo);
    return decodedHeader;
}
