import { useState } from 'react';

import './Company.scss';
import type { Company, User } from '@utils/types';
import CompanyMenu from './components/CompanyMenu';
import CompanyContent from './components/CompanyContent';

export default function Company() {
    const [selectedSection, setSelectedSection] = useState('general');

    const employees: User[] = [
        {
            username: 'adrianv',
            name: 'Adrian Vazquez Rodriguez',
            surnames: 'Rodriguez',
            email: 'adrian@example.com',
            role: 'Manager',
            team: 'BAU / Factory / Implantación',
        },
        {
            username: 'alejandrot',
            name: 'Alejandro Jose Togores Torres',
            surnames: 'Togores',
            email: 'alejandro@example.com',
            role: 'Employee',
            team: 'BAU',
        },
        {
            username: 'alfonsop',
            name: 'Alfonso Paz Freire',
            surnames: 'Paz Freire',
            email: 'alfonso@example.com',
            role: 'Employee',
            team: 'Factory',
        },
        {
            username: 'mariacn',
            name: 'Mª Carmen Nogueira Balseiros',
            surnames: 'Nogueira Balseiros',
            email: 'mariacarmen@example.com',
            role: 'Employee',
            team: 'BAU',
        },
        {
            username: 'odairv',
            name: 'Odair Vicente Diego',
            surnames: 'Vicente Diego',
            email: 'odair@example.com',
            role: 'Employee',
            team: 'Implantación',
        },
    ];

    const [company, setCompany] = useState<Company>({
        name: 'TalentControl HR',
        description: 'Manage HR from one place',
        industry: 'Human Resources',
        image: '',
        teams: [
            { name: 'BAU', description: 'Daily operations', color: '#8B5CF6' },
            { name: 'Factory', description: 'Manufacturing team', color: '#3B82F6' },
            { name: 'Implantación', description: 'Implementation team', color: '#22C55E' },
        ],
    });

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
