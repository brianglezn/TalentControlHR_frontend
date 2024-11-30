import { TabView, TabPanel } from 'primereact/tabview';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { toast } from 'react-hot-toast';

import './CreateJoinCompanyModal.scss';
import { getAllCompanies, createCompany, addUserToCompany } from '@api/companies/companiesServices';
import { User, Company, INDUSTRIES, CompanyIndustry } from '@utils/types';
import { useState, useEffect } from 'react';

interface CreateJoinCompanyModalProps {
    user: User;
    onCompanyAssociated: (updatedUser: User, updatedCompany: Company) => void;
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
            toast.error('Error fetching companies. Please try again later.');
            console.error('Error fetching companies:', error);
        }
    };

    const handleCreateCompany = async () => {
        if (!companyData.name || !companyData.industry) {
            toast.error('Name and Industry are required.');
            return;
        }

        setLoading(true);
        try {
            const response = await createCompany(companyData);

            if (response.error) {
                toast.error(response.message);
            } else {
                const newCompany = response.company;

                await addUserToCompany(newCompany._id, user._id, ['admin']);
                toast.success('Company created successfully and you are now an admin!');
                onCompanyAssociated(user, newCompany);
            }
        } catch (error) {
            toast.error('An unexpected error occurred. Please try again.');
            console.error('Error in handleCreateCompany:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleJoinCompany = async () => {
        if (!selectedCompany || !user._id) {
            toast.error('Please select a company to join.');
            return;
        }

        setLoading(true);
        try {
            const updatedCompany = companies.find((company) => company._id === selectedCompany);
            if (!updatedCompany) {
                throw new Error('Selected company not found.');
            }

            await addUserToCompany(selectedCompany, user._id, ['employee']);
            toast.success('You have successfully joined the company as an employee!');
            onCompanyAssociated(user, updatedCompany);
        } catch (error) {
            toast.error('Error joining company. Please try again.');
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
                        <Dropdown
                            id="industry"
                            value={companyData.industry as CompanyIndustry}
                            options={INDUSTRIES}
                            onChange={(e) => setCompanyData({ ...companyData, industry: e.value })}
                            filter
                            placeholder="Select an Industry"
                            className="p-dropdown"
                        />
                        <label htmlFor="industry">Industry</label>
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
                                value: company._id,
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