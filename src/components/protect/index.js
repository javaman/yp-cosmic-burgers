import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Protect({ element, authorized, to }) {
    const navigate = useNavigate();
    const accessToken = Cookies.get("access-token");
    const refreshToken = localStorage.getItem("refresh-token");

    const secure = (!!accessToken && !!refreshToken) === authorized;

    useEffect(() => {
        if (!secure) {
            navigate(to);
        }
    }, [secure])
    
    if (secure) {
        return element;
    } else {                
        return <></>;
    }
}
