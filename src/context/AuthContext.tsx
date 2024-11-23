import { createContext, useState, ReactNode, useEffect } from 'react';
import { verify } from '@api/auth/authService';

interface AuthContextProps {
    isAuthenticated: boolean;
    isLoading: boolean;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const login = () => setIsAuthenticated(true);
    const logout = () => setIsAuthenticated(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { isAuthenticated } = await verify();
                setIsAuthenticated(isAuthenticated);
            } catch {
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
