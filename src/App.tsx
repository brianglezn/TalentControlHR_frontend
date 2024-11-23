import React from 'react';
import { Routes, Route } from 'react-router-dom';

const Home = React.lazy(() => import('@pages/landing/Home'));
const Dashboard = React.lazy(() => import('@pages/dashboard/Dashboard'));
const DashHome = React.lazy(() => import('@pages/dashboard/features/home/DashHome'));
const Shifts = React.lazy(() => import('@pages/dashboard/features/shifts/Shifts'));
const Vacations = React.lazy(() => import('@pages/dashboard/features/vacations/Vacations'));
const Calendar = React.lazy(() => import('@pages/dashboard/features/calendar/Calendar'));
const UserSettings = React.lazy(() => import('@pages/dashboard/features/userSettings/UserSettings'));
const Notifications = React.lazy(() => import('@pages/dashboard/features/notifications/Notifications'));

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
                    <Route index element={<DashHome />} />
                    <Route path="calendar" element={<Calendar />} />
                    <Route path="shifts" element={<Shifts />} />
                    <Route path="vacations" element={<Vacations />} />
                    <Route path="user-settings" element={<UserSettings />} />
                    <Route path="notifications" element={<Notifications />} />
                </Route>
            </Routes>
        </AuthProvider>
    );
}
