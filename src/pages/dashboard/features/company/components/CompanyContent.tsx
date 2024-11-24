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
}

export default function CompanyContent({ selectedSection, company, employees, setCompany }: CompanyContentProps) {
    return (
        <section className="company-content">
            {selectedSection === 'general' && <CompanyGeneral company={company} setCompany={setCompany} />}
            {selectedSection === 'employees' && <CompanyEmployees employees={employees} />}
            {selectedSection === 'teams' && <CompanyTeams teams={company.teams} setTeams={(teams) => setCompany({ ...company, teams })} />}
        </section>
    );
}
