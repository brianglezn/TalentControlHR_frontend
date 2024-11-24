import { useState } from 'react';

import './Company.scss';
import type { Company, User } from '@utils/types';
import CompanyMenu from './components/CompanyMenu';
import CompanyContent from './components/CompanyContent';

export default function Company() {
    const [selectedSection, setSelectedSection] = useState('general');

    const employees: User[] = [
        {
            userId: '1',
            username: 'adrianv',
            name: 'Adrian Vazquez Rodriguez',
            surnames: 'Rodriguez',
            email: 'adrian@example.com',
            password: 'hashedPassword',
            role: 'Manager',
            company: {
                companyId: 'talentcontrol-id',
                name: 'TalentControl HR',
                description: 'Manage HR from one place',
                industry: 'Human Resources',
                image: '',
                teams: [],
            },
            team: {
                teamId: 'bau-team-id',
                name: 'BAU',
                description: 'Daily operations',
                color: '#8B5CF6',
                company: {
                    companyId: 'talentcontrol-id',
                    name: 'TalentControl HR',
                    description: 'Manage HR from one place',
                    industry: 'Human Resources',
                    image: '',
                    teams: [],
                },
            },
        },
        {
            userId: '2',
            username: 'alejandrot',
            name: 'Alejandro Jose Togores Torres',
            surnames: 'Togores',
            email: 'alejandro@example.com',
            password: 'hashedPassword',
            role: 'Employee',
            company: {
                companyId: 'talentcontrol-id',
                name: 'TalentControl HR',
                description: 'Manage HR from one place',
                industry: 'Human Resources',
                image: '',
                teams: [],
            },
            team: {
                teamId: 'bau-team-id',
                name: 'BAU',
                description: 'Daily operations',
                color: '#8B5CF6',
                company: {
                    companyId: 'talentcontrol-id',
                    name: 'TalentControl HR',
                    description: 'Manage HR from one place',
                    industry: 'Human Resources',
                    image: '',
                    teams: [],
                },
            },
        },
    ];
    
    const [company, setCompany] = useState<Company>({
        companyId: 'talentcontrol-id',
        name: 'TalentControl HR',
        description: 'Manage HR from one place',
        industry: 'Human Resources',
        image: '',
        teams: [
            {
                teamId: 'bau-team-id',
                name: 'BAU',
                description: 'Daily operations',
                color: '#8B5CF6',
                company: {
                    companyId: 'talentcontrol-id',
                    name: 'TalentControl HR',
                    description: 'Manage HR from one place',
                    industry: 'Human Resources',
                    image: '',
                    teams: [],
                },
            },
            {
                teamId: 'factory-team-id',
                name: 'Factory',
                description: 'Manufacturing team',
                color: '#3B82F6',
                company: {
                    companyId: 'talentcontrol-id',
                    name: 'TalentControl HR',
                    description: 'Manage HR from one place',
                    industry: 'Human Resources',
                    image: '',
                    teams: [],
                },
            },
            {
                teamId: 'implantacion-team-id',
                name: 'Implantación',
                description: 'Implementation team',
                color: '#22C55E',
                company: {
                    companyId: 'talentcontrol-id',
                    name: 'TalentControl HR',
                    description: 'Manage HR from one place',
                    industry: 'Human Resources',
                    image: '',
                    teams: [],
                },
            },
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
