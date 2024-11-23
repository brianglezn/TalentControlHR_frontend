import { Routes, Route } from 'react-router-dom';

import Home from '@pages/landing/Home';
import Dashboard from '@pages/dashboard/Dashboard';
import Shifts from '@pages/dashboard/features/shifts/Shifts';
import Vacations from '@pages/dashboard/features/vacations/Vacations';
import UserSettings from '@pages/dashboard/features/userSettings/UserSettings';
import { ProtectedRoute } from '@components/layout/ProtectedRoute';
import { AuthProvider } from '@context/AuthContext';

export default function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/dashboard/*"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                >
                    <Route path="shifts" element={<Shifts />} />
                    <Route path="vacations" element={<Vacations />} />
                    <Route path="user-settings" element={<UserSettings />} />
                </Route>
            </Routes>
        </AuthProvider>
    );
}
