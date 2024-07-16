import React from 'react'
import { jwtDecode } from 'jwt-decode';
import LoginForm from '../pages/Login';
import { Navigate, useLocation } from 'react-router-dom';

const RoleProtection = ({ children }) => {
    const token = document.cookie.split("; ").find((c) => c.startsWith("token="));
    let decodedToken = null;
    let isTokenExpired = true;

    if (token) {
        const tokenValue = token.split("=")[1];
        decodedToken = jwtDecode(tokenValue)
        const currentTime = Math.floor(Date.now() / 1000);
        isTokenExpired = decodedToken.exp < currentTime;
    }

    const location = useLocation();
    const role = location.pathname.split('/')[1];
    console.log(role);
    console.log(decodedToken);

    return decodedToken && !isTokenExpired && decodedToken.role === role
        ? children
        : <Navigate to="/login" />;
};

export default RoleProtection
