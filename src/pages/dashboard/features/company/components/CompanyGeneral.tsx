import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import { ButtonGroup } from 'primereact/buttongroup';
import { Tooltip } from 'primereact/tooltip';
import { Dropdown } from 'primereact/dropdown';
import { toast } from 'react-hot-toast';

import './CompanyGeneral.scss';
import { Company, INDUSTRIES, CompanyIndustry } from '@utils/types';

interface CompanyGeneralProps {
    company: Company;
    setCompany: (company: Company) => void;
}

export default function CompanyGeneral({ company, setCompany }: CompanyGeneralProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [localCompany, setLocalCompany] = useState(company);

    const handleFileUpload = (e: { files: File[] }) => {
        const file = e.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setLocalCompany({ ...localCompany, image: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        setCompany(localCompany);
        toast.success('Company data saved successfully');
        setIsEditing(false);
    };

    const handleCancel = () => {
        setLocalCompany(company);
        setIsEditing(false);
    };

    return (
        <div className="company-general">
            <Tooltip target=".save-button" content="Save changes" position="top" />
            <Tooltip target=".cancel-button" content="Cancel changes" position="top" />

            <div className="header">
                <div className="company-info">
                    <div className="company-logo">
                        {localCompany.image ? (
                            <img src={localCompany.image} alt="Company Logo" />
                        ) : (
                            <div className="placeholder-logo">
                                <i className="pi pi-building" />
                            </div>
                        )}
                    </div>
                    <div className="company-basic-info">
                        <h1>{localCompany.name}</h1>
                        <p>{`${company.users.length} ${company.users.length === 1 ? 'employee is' : 'employees are'} part of this company`}</p>
                    </div>
                </div>

                <div className="company-settings">
                    <Button
                        icon="pi pi-cog"
                        className="p-button-rounded p-button-text"
                        onClick={() => setIsEditing(!isEditing)}
                        aria-label="Edit Company Info"
                    />
                </div>
            </div>

            <div className="sections">
                <div className="section">
                    <h2>{isEditing ? 'Edit Company Details' : 'General Information'}</h2>
                    <p>
                        {isEditing
                            ? 'Modify your company details below.'
                            : 'Just a bit of info about your company.'}
                    </p>

                    {isEditing ? (
                        <form>
                            <div className="form-field">
                                <span className="p-float-label">
                                    <InputText
                                        id="companyName"
                                        value={localCompany.name}
                                        onChange={(e) =>
                                            setLocalCompany({ ...localCompany, name: e.target.value })
                                        }
                                    />
                                    <label htmlFor="companyName">Company Name</label>
                                </span>
                            </div>
                            <div className="form-field">
                                <span className="p-float-label">
                                    <Dropdown
                                        id="industry"
                                        value={localCompany.industry as CompanyIndustry}
                                        options={INDUSTRIES}
                                        onChange={(e) => setLocalCompany({ ...localCompany, industry: e.value })}
                                        filter
                                        placeholder="Select an Industry"
                                        className="p-dropdown"
                                    />
                                    <label htmlFor="companyIndustry">Industry</label>
                                </span>
                            </div>
                            <div className="form-field">
                                <label htmlFor="companyLogo">Company Logo</label>
                                <FileUpload
                                    mode="basic"
                                    name="demo[]"
                                    accept="image/*"
                                    maxFileSize={1000000}
                                    chooseLabel="Choose"
                                    customUpload
                                    uploadHandler={handleFileUpload}
                                    className="file-upload"
                                    disabled
                                />
                            </div>
                            <div className="form-actions">
                                <ButtonGroup>
                                    <Button
                                        className="save-button"
                                        icon="pi pi-check"
                                        onClick={handleSave}
                                        tooltip="Save"
                                        tooltipOptions={{ position: 'top' }}
                                    />
                                    <Button
                                        className="cancel-button"
                                        icon="pi pi-times"
                                        onClick={handleCancel}
                                        tooltip="Cancel"
                                        tooltipOptions={{ position: 'top' }}
                                    />
                                </ButtonGroup>
                            </div>
                        </form>
                    ) : (
                        <div>
                            <p>
                                <strong>Company Name: </strong> {company.name}
                            </p>
                            <p>
                                <strong>Industry: </strong> {company.industry}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
