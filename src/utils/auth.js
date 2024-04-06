import Cookies from 'js-cookie';

export function isAuthenticated() {
    return !!localStorage.getItem("refresh-token") && !!Cookies.get('access-token');
}