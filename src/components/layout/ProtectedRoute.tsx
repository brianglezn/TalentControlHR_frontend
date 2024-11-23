import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@context/useAuth';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    console.log("isAuthenticated:", isAuthenticated);


    return <>{children}</>;
};
