import { TabView, TabPanel } from 'primereact/tabview';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { getAllCompanies, createCompany, addUserToCompany } from '@api/companies/companiesServices';
import { User, Company } from '@utils/types';
import { useState, useEffect } from 'react';

interface CreateJoinCompanyModalProps {
    user: User;
    onCompanyAssociated: (updatedUser: User) => void;
}

export default function CreateJoinCompanyModal({ user, onCompanyAssociated }: CreateJoinCompanyModalProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [companyData, setCompanyData] = useState({ name: '', description: '', industry: '', image: '' });
    const [companies, setCompanies] = useState<Company[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (activeIndex === 1) {
            fetchCompanies();
        }
    }, [activeIndex]);

    const fetchCompanies = async () => {
        try {
            const fetchedCompanies: Company[] = await getAllCompanies();
            setCompanies(fetchedCompanies);
        } catch (error) {
            console.error('Error fetching companies:', error);
        }
    };

    const handleCreateCompany = async () => {
        if (!companyData.name || !companyData.industry) {
            alert('Name and Industry are required');
            return;
        }

        setLoading(true);
        try {
            const newCompany: Company = await createCompany(companyData);
            await addUserToCompany(newCompany.companyId, user.userId);
            onCompanyAssociated({ ...user });
        } catch (error) {
            console.error('Error creating company:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleJoinCompany = async (companyId: string) => {
        setLoading(true);
        try {
            await addUserToCompany(companyId, user.userId);
            onCompanyAssociated({ ...user });
        } catch (error) {
            console.error('Error joining company:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
            <TabPanel header="Create a Company">
                <div className="p-field">
                    <label htmlFor="name">Company Name</label>
                    <InputText
                        id="name"
                        value={companyData.name}
                        onChange={(e) => setCompanyData({ ...companyData, name: e.target.value })}
                    />
                </div>
                <div className="p-field">
                    <label htmlFor="description">Description</label>
                    <InputText
                        id="description"
                        value={companyData.description}
                        onChange={(e) => setCompanyData({ ...companyData, description: e.target.value })}
                    />
                </div>
                <div className="p-field">
                    <label htmlFor="industry">Industry</label>
                    <InputText
                        id="industry"
                        value={companyData.industry}
                        onChange={(e) => setCompanyData({ ...companyData, industry: e.target.value })}
                    />
                </div>
                <div className="p-field">
                    <label htmlFor="image">Image URL</label>
                    <InputText
                        id="image"
                        value={companyData.image}
                        onChange={(e) => setCompanyData({ ...companyData, image: e.target.value })}
                    />
                </div>
                <Button label="Create" icon="pi pi-check" onClick={handleCreateCompany} loading={loading} />
            </TabPanel>

            <TabPanel header="Join a Company">
                <ul className="p-list">
                    {companies.map((company) => (
                        <li key={company.companyId} className="p-d-flex p-jc-between p-ai-center">
                            <span>{company.name}</span>
                            <Button
                                label="Join"
                                icon="pi pi-sign-in"
                                className="p-button-outlined"
                                onClick={() => handleJoinCompany(company.companyId)}
                            />
                        </li>
                    ))}
                </ul>
            </TabPanel>
        </TabView>
    );
}
