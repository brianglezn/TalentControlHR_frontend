import { NavLink } from 'react-router-dom';
import './DashboardMenu.scss';

export default function DashboardMenu() {
    return (
        <nav className="dashboard-menu">
            <ul>
                <li>
                    <NavLink
                        to="shifts"
                        className={({ isActive }) => (isActive ? 'active-link' : '')}
                    >
                        Shifts
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="vacations"
                        className={({ isActive }) => (isActive ? 'active-link' : '')}
                    >
                        Vacations
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="user-settings"
                        className={({ isActive }) => (isActive ? 'active-link' : '')}
                    >
                        User Settings
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}
