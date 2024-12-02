import { useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { Avatar } from 'primereact/avatar';
import { InputText } from 'primereact/inputtext';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { toast } from 'react-hot-toast';

import './CompanyEmployees.scss';
import { User, Company, CompanyTeam } from '@utils/types';
import avatarImg from '@assets/images/avatar.png';
import { createUser } from '@api/user/userServices';
import { deleteUserFromCompany } from '@api/companies/companiesServices';
import { useUserCompany } from '@context/useUserCompany';

interface CompanyEmployeesProps {
    employees: User[];
    teams: CompanyTeam[];
    company: Company;
    onAddEmployee: (email: string) => void;
}

export default function CompanyEmployees({ employees, teams, company, onAddEmployee }: CompanyEmployeesProps) {
    const [globalFilter, setGlobalFilter] = useState<string | null>(null);
    const [isAddEmployeeDialogVisible, setIsAddEmployeeDialogVisible] = useState(false);
    const { updateCompany } = useUserCompany();
    const [newEmployee, setNewEmployee] = useState({
        name: '',
        surnames: '',
        email: '',
        username: '',
        password: '',
    });

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
            console.warn('No roles found for this user:', employee._id);
            return <span>No roles assigned</span>;
        }

        return (
            <>
                {companyUser.roles.map((role, index) => (
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

    const actionTemplate = (employee: User) => (
        <div className="action-buttons">
            <i className="pi pi-pencil"
                onClick={() => handleEditEmployee(employee)}></i>
            <i className="pi pi-trash"
                onClick={() => handleDeleteEmployee(employee)}></i>
        </div>
    );

    const handleEditEmployee = (employee: User) => {
        console.log(`Editing user: ${employee.name} ${employee.surnames}`);
    };

    const handleDeleteEmployee = (employee: User) => {
        const companyUser = company.users.find((user) => user.userId === employee._id);
    
        if (companyUser && companyUser.roles.includes('admin')) {
            toast.error('Admin users cannot be deleted.');
            return;
        }
    
        confirmDialog({
            message: `Are you sure you want to delete ${employee.name} ${employee.surnames}?`,
            header: 'Confirm Deletion',
            icon: 'pi pi-exclamation-triangle',
            accept: async () => {
                try {
                    await deleteUserFromCompany(company._id, employee._id);
                    await updateCompany(company._id);
                    toast.success('Employee deleted successfully!');
                } catch (error) {
                    console.error('Error deleting employee from company:', error);
                    toast.error('Failed to delete employee. Please try again.');
                }
            },
        });
    };
    
    const handleAddEmployee = async () => {
        if (!newEmployee.name || !newEmployee.email || !newEmployee.password || !newEmployee.username) {
            toast.error('All fields are required.');
            return;
        }

        try {
            const createdUser = await createUser({
                ...newEmployee,
            });

            if (!createdUser || !createdUser.userId) {
                console.error('Failed to retrieve user ID from createUser response:', createdUser);
                throw new Error('Failed to create user');
            }

            await onAddEmployee(createdUser.userId);

            await updateCompany(company._id);

            setIsAddEmployeeDialogVisible(false);
            setNewEmployee({
                name: '',
                surnames: '',
                email: '',
                username: '',
                password: '',
            });

            toast.success('Employee added successfully!');
        } catch (error) {
            console.error('Error adding employee:', error);
            toast.error('Failed to add employee. Please try again.');
        }
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
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-search" />
                    </span>
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
                globalFilterFields={['name', 'surnames']}
                header={header}
                emptyMessage="No employees found."
            >
                <Column body={imageTemplate} style={{ width: '5%' }} />
                <Column header="Full Name" body={fullNameTemplate} field="name" style={{ width: '40%' }} />
                <Column header="Roles" body={rolesTemplate} style={{ width: '25%' }} />
                <Column header="Team" body={teamTemplate} sortable style={{ width: '25%' }} />
                <Column body={actionTemplate} style={{ width: '5%' }} />
            </DataTable>

            <Dialog
                header="Add Employee"
                visible={isAddEmployeeDialogVisible}
                onHide={() => setIsAddEmployeeDialogVisible(false)}
            >
                <div className="add-employee-form">
                    <span className="p-float-label">
                        <InputText
                            id="employeeName"
                            value={newEmployee.name}
                            onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                        />
                        <label htmlFor="employeeName">Name</label>
                    </span>
                    <span className="p-float-label mt-2">
                        <InputText
                            id="employeeSurnames"
                            value={newEmployee.surnames}
                            onChange={(e) => setNewEmployee({ ...newEmployee, surnames: e.target.value })}
                        />
                        <label htmlFor="employeeSurnames">Surnames</label>
                    </span>
                    <span className="p-float-label mt-2">
                        <InputText
                            id="employeeEmail"
                            value={newEmployee.email}
                            onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                        />
                        <label htmlFor="employeeEmail">Email</label>
                    </span>
                    <span className="p-float-label mt-2">
                        <InputText
                            id="employeeUsername"
                            value={newEmployee.username}
                            onChange={(e) => setNewEmployee({ ...newEmployee, username: e.target.value })}
                        />
                        <label htmlFor="employeeUsername">Username</label>
                    </span>
                    <span className="p-float-label mt-2">
                        <InputText
                            id="employeePassword"
                            type="password"
                            value={newEmployee.password}
                            onChange={(e) => setNewEmployee({ ...newEmployee, password: e.target.value })}
                        />
                        <label htmlFor="employeePassword">Password</label>
                    </span>
                    <Button
                        label="Create"
                        icon="pi pi-check"
                        onClick={handleAddEmployee}
                        className="p-button-primary mt-3"
                    />
                </div>
            </Dialog>
            <ConfirmDialog />
        </div>
    );
}
