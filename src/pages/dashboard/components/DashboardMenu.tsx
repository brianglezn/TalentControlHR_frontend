import { NavLink } from 'react-router-dom';
import { Avatar } from 'primereact/avatar';

import logoTextH from '@assets/images/logo_text_h.png';
import avatarImg from '@assets/images/avatar.png';

import './DashboardMenu.scss';

export default function DashboardMenu() {
    return (
        <nav className="dashboard-menu">
            <div className="menu-logo">
                <img src={logoTextH} alt="Logo" />
            </div>

            <ul className="menu-sections">
                <li>
                    <NavLink
                        to="/dashboard"
                        end
                        className={({ isActive }) => (isActive ? 'active-link' : '')}
                    >
                        <i className="pi pi-objects-column"></i> Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/dashboard/inbox"
                        className={({ isActive }) => (isActive ? 'active-link' : '')}
                    >
                        <i className="pi pi-bell"></i> Inbox
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/dashboard/calendar"
                        className={({ isActive }) => (isActive ? 'active-link' : '')}
                    >
                        <i className="pi pi-calendar"></i> Calendar
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/dashboard/shifts"
                        className={({ isActive }) => (isActive ? 'active-link' : '')}
                    >
                        <i className="pi pi-clock"></i> Shifts
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/dashboard/timeOff"
                        className={({ isActive }) => (isActive ? 'active-link' : '')}
                    >
                        <i className="pi pi-car"></i> TimeOff
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/dashboard/company"
                        className={({ isActive }) => (isActive ? 'active-link' : '')}
                    >
                        <i className="pi pi-building"></i> Company
                    </NavLink>
                </li>
            </ul>

            <NavLink
                to="/dashboard/user-settings"
                className={({ isActive }) => (isActive ? 'active-link' : '')}
            >
                <div className="menu-user">
                    <Avatar image={avatarImg} shape="circle" />
                    <div className="user-info">
                        <span className="user-name">Brian</span>
                        <span className="user-username">@brianglezn</span>
                    </div>
                    <i className="pi pi-ellipsis-v" style={{ fontSize: '1rem' }}></i>
                </div>
            </NavLink>
        </nav>
    );
}
