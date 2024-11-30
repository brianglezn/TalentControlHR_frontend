import React from 'react';
import { Routes, Route } from 'react-router-dom';

const Home = React.lazy(() => import('@pages/landing/Home'));
const Dashboard = React.lazy(() => import('@pages/dashboard/Dashboard'));
const DashHome = React.lazy(() => import('@pages/dashboard/features/dashHome/DashHome'));
const Shifts = React.lazy(() => import('@pages/dashboard/features/shifts/Shifts'));
const TimeOff = React.lazy(() => import('@pages/dashboard/features/timeOff/TimeOff'));
const Calendar = React.lazy(() => import('@pages/dashboard/features/calendar/Calendar'));
const UserSettings = React.lazy(() => import('@pages/dashboard/features/userSettings/UserSettings'));
const Inbox = React.lazy(() => import('@pages/dashboard/features/inbox/Inbox'));
const Company = React.lazy(() => import('@pages/dashboard/features/company/Company'));

import { ProtectedRoute } from '@context/ProtectedRoute';
import { AuthProvider } from '@context/AuthContext';
import { UserCompanyProvider } from '@context/UserCompanyContext';

export default function App() {
    return (
        <AuthProvider>

            <UserCompanyProvider>
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
                        <Route path="timeOff" element={<TimeOff />} />
                        <Route path="user-settings" element={<UserSettings />} />
                        <Route path="inbox" element={<Inbox />} />
                        <Route path="company" element={<Company />} />
                    </Route>
                </Routes>
            </UserCompanyProvider>
        </AuthProvider>
    );
}
