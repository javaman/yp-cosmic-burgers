import Cookies from 'js-cookie';

export function isAuthenticated() {
    const result = !!localStorage.getItem("refresh-token") && !!Cookies.get('access-token');
    console.log(result);
    return result;
}