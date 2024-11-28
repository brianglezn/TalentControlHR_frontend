import { useState, useEffect } from 'react';

import './Company.scss';
import type { Company, User } from '@utils/types';
import { getCompanyById, getUsersFromCompany } from '@api/companies/companiesServices';
import CompanyMenu from './components/CompanyMenu';
import CompanyContent from './components/CompanyContent';

export default function Company() {
    const [selectedSection, setSelectedSection] = useState('general');
    const [company, setCompany] = useState<Company | null>(null);
    const [employees, setEmployees] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCompanyData = async () => {
            try {
                const companyId = 'talentcontrol-id';
                const fetchedCompany = await getCompanyById(companyId);
                const fetchedEmployees = await getUsersFromCompany(companyId);

                setCompany(fetchedCompany);
                setEmployees(fetchedEmployees);
            } catch (error) {
                console.error('Error fetching company data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCompanyData();
    }, []);

    if (loading) {
        return <div>Loading company data...</div>;
    }

    if (!company) {
        return <div>Error loading company data. Please try again later.</div>;
    }

    return (
        <div className="company">
            <CompanyMenu selectedSection={selectedSection} setSelectedSection={setSelectedSection} />
            <CompanyContent
                selectedSection={selectedSection}
                company={company}
                employees={employees}
                setCompany={setCompany}
            />
        </div>
    );
}
