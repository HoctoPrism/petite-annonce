import jwtDecode from "jwt-decode";

let getToken = () => {
    return localStorage.getItem('access_token');
}

let getDecodedToken = () => {
    return jwtDecode(localStorage.getItem('access_token'));
}

let getRoles = () => {
    return JSON.parse(getDecodedToken().roles).toString();
}

let getEmail = () => {
    return getDecodedToken().email;
}

export default {getToken, getDecodedToken, getRoles, getEmail}