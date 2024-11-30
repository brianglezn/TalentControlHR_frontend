import { useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { Avatar } from 'primereact/avatar';
import { InputText } from 'primereact/inputtext';

import './CompanyEmployees.scss';
import { User, Company, CompanyTeam } from '@utils/types';
import avatarImg from '@assets/images/avatar.png';

interface CompanyEmployeesProps {
    employees: User[];
    teams: CompanyTeam[];
    company: Company;
    onAddEmployee: (email: string) => void;
}

export default function CompanyEmployees({ employees, teams, company, onAddEmployee }: CompanyEmployeesProps) {
    const [globalFilter, setGlobalFilter] = useState<string | null>(null);
    const [isAddEmployeeDialogVisible, setIsAddEmployeeDialogVisible] = useState(false);
    const [newEmployeeEmail, setNewEmployeeEmail] = useState('');

    const getEmployeeTeam = (employeeId: string) => {
        const team = teams.find((t) => t.users.includes(employeeId));
        return team
            ? { name: team.name, color: team.color }
            : { name: 'No Team', color: '#6b7280' };
    };

    const imageTemplate = (employee: User) => (
        <Avatar
            label={`${employee.name.charAt(0).toUpperCase()}${employee.surnames.charAt(0).toUpperCase()}`}
            shape="circle"
            className="employee-avatar"
            image={avatarImg}
            style={{
                backgroundColor: '#8b5cf6',
                color: '#fff',
            }}
        />
    );

    const fullNameTemplate = (employee: User) => (
        <span>{`${employee.name} ${employee.surnames}`}</span>
    );

    const teamTemplate = (employee: User) => {
        const team = getEmployeeTeam(employee._id);
        return <Tag value={team.name} style={{ backgroundColor: team.color, color: '#fff' }} />;
    };

    const rolesTemplate = (employee: User) => {
        const companyUser = company.users.find((user) => user.userId === employee._id);
        if (!companyUser || !companyUser.roles) {
            return <span>No Roles</span>;
        }

        return (
            <>
                {companyUser.roles.map((role: string, index: number) => (
                    <Tag
                        key={index}
                        value={role}
                        style={{
                            backgroundColor: role === 'admin' ? '#8b5cf6' : '#3e3e3e',
                            color: '#fff',
                            marginRight: '5px',
                        }}
                    />
                ))}
            </>
        );
    };

    const handleAddEmployee = () => {
        if (!newEmployeeEmail) {
            return;
        }

        onAddEmployee(newEmployeeEmail);
        setIsAddEmployeeDialogVisible(false);
        setNewEmployeeEmail('');
    };

    const renderHeader = () => {
        return (
            <div className="employees-list-header">
                <div className="p-inputgroup">
                    <InputText
                        value={globalFilter || ''}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        placeholder="Search employees"
                    />
                    <span className="p-inputgroup-addon"><i className="pi pi-search" /></span>
                </div>
                <Button
                    label="Add Employee"
                    icon="pi pi-plus"
                    className="p-button mb-3"
                    onClick={() => setIsAddEmployeeDialogVisible(true)}
                />
            </div>
        );
    };

    const header = renderHeader();

    return (
        <div className="company-employees">
            <DataTable
                value={employees}
                className="employees-list"
                paginator
                rows={10}
                globalFilter={globalFilter}
                header={header}
                emptyMessage="No employees found."
            >
                <Column body={imageTemplate} style={{ width: '5%' }} />
                <Column header="Full Name" body={fullNameTemplate} />
                <Column header="Roles" body={rolesTemplate} />
                <Column header="Team" body={teamTemplate} sortable />
            </DataTable>

            <Dialog
                header="Add Employee"
                visible={isAddEmployeeDialogVisible}
                onHide={() => setIsAddEmployeeDialogVisible(false)}
            >
                <div className="add-employee-form">
                    <span className="p-float-label">
                        <InputText
                            id="employeeEmail"
                            value={newEmployeeEmail}
                            onChange={(e) => setNewEmployeeEmail(e.target.value)}
                        />
                        <label htmlFor="employeeEmail">Employee Email</label>
                    </span>
                    <Button
                        label="Add"
                        icon="pi pi-check"
                        onClick={handleAddEmployee}
                        className="p-button-primary mt-2"
                    />
                </div>
            </Dialog>
        </div>
    );
}
