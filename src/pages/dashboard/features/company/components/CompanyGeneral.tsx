import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import { ButtonGroup } from 'primereact/buttongroup';
import { Tooltip } from 'primereact/tooltip';

import './CompanyGeneral.scss';
import { Company } from '@utils/types';
import logoCompany from '@assets/images/logo.png';

interface CompanyGeneralProps {
    company: Company;
    setCompany: (company: Company) => void;
}

export default function CompanyGeneral({ company, setCompany }: CompanyGeneralProps) {
    const [isEditing, setIsEditing] = useState(false);

    const handleFileUpload = (e: { files: File[] }) => {
        const file = e.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setCompany({ ...company, image: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        console.log('Company data saved:', company);
        setIsEditing(false);
    };

    return (
        <div className="company-general">
            <Tooltip target=".save-button" content="Save changes" position="top" />
            <Tooltip target=".cancel-button" content="Cancel changes" position="top" />

            <div className="header">
                <div className="company-info">
                    <div className="company-logo">
                        <img src={company.image || logoCompany} alt="Company Logo" />
                    </div>
                    <div className="company-basic-info">
                        <h1>{company.name}</h1>
                        <p>{`3 employees are part of this company`}</p>
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
                                        value={company.name}
                                        onChange={(e) =>
                                            setCompany({ ...company, name: e.target.value })
                                        }
                                    />
                                    <label htmlFor="companyName">Company Name</label>
                                </span>
                            </div>
                            <div className="form-field">
                                <span className="p-float-label">
                                    <InputText
                                        id="companyIndustry"
                                        value={company.industry}
                                        onChange={(e) =>
                                            setCompany({ ...company, industry: e.target.value })
                                        }
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
                                />
                            </div>
                            <div className="form-actions">
                                <ButtonGroup>
                                    <Button
                                        className="save-button"
                                        icon="pi pi-check"
                                        onClick={handleSave}
                                    />
                                    <Button
                                        className="cancel-button"
                                        icon="pi pi-times"
                                        onClick={() => setIsEditing(!isEditing)}
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
