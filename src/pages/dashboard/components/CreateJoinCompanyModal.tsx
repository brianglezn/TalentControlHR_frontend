import { TabView, TabPanel } from 'primereact/tabview';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';

import './CreateJoinCompanyModal.scss';
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
    const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
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

    const handleJoinCompany = async () => {
        if (!selectedCompany) return;

        setLoading(true);
        try {
            await addUserToCompany(selectedCompany, user.userId);
            onCompanyAssociated({ ...user });
        } catch (error) {
            console.error('Error joining company:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} className="create-join-company-modal">
            <TabPanel header="Create a Company">
                <div className="input-group">
                    <span className="p-float-label">
                        <InputText
                            id="name"
                            value={companyData.name}
                            onChange={(e) => setCompanyData({ ...companyData, name: e.target.value })}
                        />
                        <label htmlFor="name">Company Name</label>
                    </span>
                </div>
                <div className="input-group">
                    <span className="p-float-label">
                        <InputText
                            id="description"
                            value={companyData.description}
                            onChange={(e) => setCompanyData({ ...companyData, description: e.target.value })}
                        />
                        <label htmlFor="description">Description</label>
                    </span>
                </div>
                <div className="input-group">
                    <span className="p-float-label">
                        <InputText
                            id="industry"
                            value={companyData.industry}
                            onChange={(e) => setCompanyData({ ...companyData, industry: e.target.value })}
                        />
                        <label htmlFor="industry">Industry</label>
                    </span>
                </div>
                <div className="input-group">
                    <span className="p-float-label">
                        <InputText
                            id="image"
                            value={companyData.image}
                            onChange={(e) => setCompanyData({ ...companyData, image: e.target.value })}
                        />
                        <label htmlFor="image">Image URL</label>
                    </span>
                </div>
                <Button label="Create" icon="pi pi-check" onClick={handleCreateCompany} loading={loading} />
            </TabPanel>

            <TabPanel header="Join a Company">
                {companies.length > 0 ? (
                    <>
                        <Dropdown
                            value={selectedCompany}
                            options={companies.map((company) => ({
                                label: company.name,
                                value: company.companyId,
                            }))}
                            onChange={(e) => setSelectedCompany(e.value)}
                            placeholder="Select a Company"
                            className="p-dropdown"
                        />
                        <Button
                            label="Join"
                            icon="pi pi-sign-in"
                            className="p-button-outlined"
                            onClick={handleJoinCompany}
                            disabled={!selectedCompany || loading}
                        />
                    </>
                ) : (
                    <p className="no-companies">No companies available to join</p>
                )}
            </TabPanel>
        </TabView>
    );
}
