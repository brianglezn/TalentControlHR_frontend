import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

import './Company.scss';
import type { Company, User } from '@utils/types';
import { getUsersFromCompany } from '@api/companies/companiesServices';
import CompanyMenu from './components/CompanyMenu';
import CompanyContent from './components/CompanyContent';
import { useUserCompany } from '@context/useUserCompany';

export default function Company() {
    const [selectedSection, setSelectedSection] = useState('general');
    const [employees, setEmployees] = useState<User[]>([]);
    const { company, setCompany, isLoading } = useUserCompany();

    useEffect(() => {
        const fetchEmployees = async () => {
            if (!company?._id) {
                return;
            }

            try {
                const fetchedEmployees = await getUsersFromCompany(company._id);
                setEmployees(fetchedEmployees);
            } catch (error) {
                console.error('Error fetching company data:', error);
                toast.error('Failed to load company data');
            }
        };

        fetchEmployees();
    }, [company]);

    if (isLoading) {
        return null;
    }

    if (!company) {
        return null;
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
