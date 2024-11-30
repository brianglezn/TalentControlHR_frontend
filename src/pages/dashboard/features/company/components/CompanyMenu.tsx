import './CompanyMenu.scss';

interface CompanyMenuProps {
    selectedSection: string;
    setSelectedSection: (section: string) => void;
}

export default function CompanyMenu({ selectedSection, setSelectedSection }: CompanyMenuProps) {
    return (
        <nav className="company-menu">
            <ul>
                <li
                    className={selectedSection === 'general' ? 'active' : ''}
                    onClick={() => setSelectedSection('general')}
                >
                    General Info & Settings
                </li>
                <li
                    className={selectedSection === 'employees' ? 'active' : ''}
                    onClick={() => setSelectedSection('employees')}
                >
                    Employees
                </li>
            </ul>
        </nav>
    );
}
