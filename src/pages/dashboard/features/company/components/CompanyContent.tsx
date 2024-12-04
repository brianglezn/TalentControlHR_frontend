import './CompanyContent.scss';
import { Company, User } from '@utils/types';
import CompanyGeneral from './CompanyGeneral';
import CompanyEmployees from './CompanyEmployees';
import CompanyTeams from './CompanyTeams';

interface CompanyContentProps {
    selectedSection: string;
    company: Company;
    employees: User[];
    setCompany: (company: Company) => void;
    onAddEmployee: (email: string) => void;
}

export default function CompanyContent({
    selectedSection,
    company,
    employees,
    setCompany,
    onAddEmployee,
}: CompanyContentProps) {
    return (
        <section className="company-content">
            {selectedSection === 'general' && (
                <CompanyGeneral company={company} setCompany={setCompany} />
            )}
            {selectedSection === 'employees' && (
                <CompanyEmployees
                    employees={employees}
                    teams={company.teams}
                    company={company}
                    onAddEmployee={onAddEmployee}
                />
            )}
            {selectedSection === 'teams' && (
                <CompanyTeams company={company} />
            )}
        </section>
    );
}
