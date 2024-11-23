import { Outlet } from 'react-router-dom';
import DashboardMenu from '@pages/dashboard/components/DashboardMenu';

import './Dashboard.scss';

export default function Dashboard() {
    return (
        <div className="dashboard-layout">
            <DashboardMenu />
            <div className="dashboard-content">
                <Outlet />
            </div>
        </div>
    );
}
