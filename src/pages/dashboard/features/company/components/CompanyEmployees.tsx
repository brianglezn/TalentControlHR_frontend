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
import { MultiSelect } from 'primereact/multiselect';
import { Dropdown } from 'primereact/dropdown';
import { Password } from 'primereact/password';

import './CompanyEmployees.scss';
import { User, Company, CompanyTeam } from '@utils/types';
import avatarImg from '@assets/images/avatar.png';
import { createUser } from '@api/user/userServices';
import { addUserToTeam, deleteUserFromCompany, deleteUserFromTeam, updateUserRolesInCompany } from '@api/companies/companiesServices';
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
    const [isEditEmployeeDialogVisible, setIsEditEmployeeDialogVisible] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState<
        Partial<User> & { roles?: string[]; team?: { name: string; teamId: string } | null } | null
    >(null);
    const { updateCompany } = useUserCompany();
    const [newEmployee, setNewEmployee] = useState({
        name: '',
        surnames: '',
        email: '',
        username: '',
        password: '',
    });

    const getEmployeeTeam = (employeeId: string) => {
        const team = teams.find((t) => t?.users?.includes(employeeId));
        return team
            ? { teamId: team.teamId || '', name: team.name || 'No Team', color: team.color || '#6b7280' }
            : { teamId: '', name: 'No Team', color: '#6b7280' };
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
    
        if (!companyUser || !companyUser.roles || companyUser.roles.length === 0) {
            return <Tag value="No role" style={{ backgroundColor: '#6b7280', color: '#ffffff' }} />;
        }
    
        const getRoleStyles = (role: string) => {
            switch (role) {
                case 'admin':
                    return { backgroundColor: '#6d28d9', color: '#ffffff' };
                case 'manager':
                    return { backgroundColor: '#8b5cf6', color: '#ffffff' };
                default:
                    return { backgroundColor: '#ddd6fe', color: '#333333' };
            }
        };
    
        return (
            <>
                {companyUser.roles.map((role, index) => (
                    <Tag
                        key={index}
                        value={role}
                        style={{
                            ...getRoleStyles(role),
                            marginRight: '5px',
                        }}
                    />
                ))}
            </>
        );
    };
    
    const actionTemplate = (employee: User) => (
        <div className="action-buttons">
            <i
                className="pi pi-pencil"
                onClick={() => {
                    const companyUser = company.users.find((user) => user.userId === employee._id);
                    setEditingEmployee({
                        _id: employee._id,
                        name: employee.name,
                        surnames: employee.surnames,
                        email: employee.email,
                        username: employee.username,
                        roles: companyUser?.roles || [],
                        team: getEmployeeTeam(employee._id) || null,
                    });
                    setIsEditEmployeeDialogVisible(true);
                }}
            ></i>
            <i className="pi pi-trash" onClick={() => handleDeleteEmployee(employee)}></i>
        </div>
    );

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

    const handleEditEmployee = async () => {
        if (!editingEmployee || !editingEmployee._id) return;
    
        try {
            const currentRoles = company.users.find((user) => user.userId === editingEmployee._id)?.roles || [];
            const isRemovingAdmin = currentRoles.includes('admin') && !editingEmployee.roles?.includes('admin');
    
            if (isRemovingAdmin) {
                const remainingAdmins = company.users.filter(
                    (user) => user.roles.includes('admin') && user.userId !== editingEmployee._id
                );
    
                if (remainingAdmins.length === 0) {
                    toast.error('There must be at least one admin in the company.');
                    return;
                }
            }
    
            const currentTeam = teams.find((team) => editingEmployee._id && team.users?.includes(editingEmployee._id));
            const newTeamId = editingEmployee.team?.teamId;
    
            if (currentTeam?.teamId !== newTeamId) {
                if (currentTeam) {
                    try {
                        await deleteUserFromTeam(company._id, currentTeam.teamId, editingEmployee._id);
                    } catch (error) {
                        console.error('Error removing user from team:', error);
                        toast.error('Failed to remove user from current team.');
                        return;
                    }
                }
    
                if (newTeamId) {
                    try {
                        await addUserToTeam(company._id, newTeamId, editingEmployee._id);
                    } catch (error) {
                        console.error('Error adding user to new team:', error);
                        toast.error('Failed to add user to new team.');
                        return;
                    }
                }
            }
    
            if (editingEmployee.roles) {
                try {
                    await updateUserRolesInCompany(company._id, editingEmployee._id, editingEmployee.roles);
                } catch (error) {
                    console.error('Error updating user roles:', error);
                    toast.error('Failed to update user roles.');
                    return;
                }
            }
    
            await updateCompany(company._id);
    
            setIsEditEmployeeDialogVisible(false);
            setEditingEmployee(null);
            toast.success('Employee updated successfully!');
        } catch (error) {
            console.error('Error updating employee:', error);
            toast.error('Failed to update employee.');
        }
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
                        <Password
                            id="employeePassword"
                            value={newEmployee.password}
                            onChange={(e) => setNewEmployee({ ...newEmployee, password: e.target.value })}
                            toggleMask
                            feedback={false}
                            placeholder="Enter password"
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

            <Dialog
                header="Edit Employee"
                visible={isEditEmployeeDialogVisible}
                onHide={() => {
                    setIsEditEmployeeDialogVisible(false);
                    setEditingEmployee(null);
                }}
            >
                <div className="edit-employee-form">
                    <span className="p-float-label">
                        <MultiSelect
                            value={editingEmployee?.roles || []}
                            options={[
                                { label: 'Admin', value: 'admin' },
                                { label: 'Manager', value: 'manager' },
                                { label: 'Employee', value: 'employee' },
                            ]}
                            onChange={(e) =>
                                setEditingEmployee({
                                    ...editingEmployee,
                                    roles: e.value,
                                })
                            }
                            placeholder="Select Roles"
                            display="chip"
                        />
                        <label htmlFor="editEmployeeRoles">Roles</label>
                    </span>
                    <span className="p-float-label">
                        <Dropdown
                            value={editingEmployee?.team?.teamId || ''}
                            options={teams.map((team) => ({ label: team.name, value: team.teamId }))}
                            onChange={(e) => {
                                const selectedTeamId = e.value;
                                const selectedTeam = teams.find((team) => team.teamId === selectedTeamId);
                                setEditingEmployee((prev) => ({
                                    ...prev,
                                    team: selectedTeam ? { name: selectedTeam.name, teamId: selectedTeam.teamId } : null,
                                }));
                            }}
                            placeholder="Select Team"
                        />
                        <label htmlFor="editEmployeeTeam">Team</label>

                    </span>
                    <Button
                        label="Save"
                        icon="pi pi-check"
                        onClick={handleEditEmployee}
                        className="p-button-primary mt-3"
                    />
                </div>
            </Dialog>

            <ConfirmDialog />
        </div>
    );
}
