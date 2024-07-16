import React from 'react'
import { jwtDecode } from 'jwt-decode';
import LoginForm from '../pages/Login';
import {useLocation, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    console.log(location)
    const token = document.cookie.split("; ").find((c) => c.startsWith("token="));
    let decodedToken = null;
    let isTokenExpired = true;
    const tokenValue = token.split("=")[1];
    console.log(token)
    console.log(tokenValue)
    try {
        if (tokenValue) {
            decodedToken = jwtDecode(tokenValue);
            const currentTime = Math.floor(Date.now() / 1000);
            isTokenExpired = decodedToken.exp < currentTime;
        }
    } catch (error) {
        console.error("Invalid token", error);
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return decodedToken && !isTokenExpired ? children : <Navigate to="/login" state={{ from: location }} />;

}

export default ProtectedRoute
