import { Routes, Route } from 'react-router-dom';

import Home from '@pages/landing/Home';
import Dashboard from '@pages/dashboard/Dashboard';
import { ProtectedRoute } from '@components/layout/ProtectedRoute';
import { AuthProvider } from '@context/AuthContext';

export default function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </AuthProvider>
    );
}
