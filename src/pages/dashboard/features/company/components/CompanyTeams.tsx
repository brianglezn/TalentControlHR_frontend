import { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { ColorPicker } from 'primereact/colorpicker';
import { Tag } from 'primereact/tag';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { toast } from 'react-hot-toast';

import './CompanyTeams.scss';
import { Company, CompanyTeam } from '@utils/types';
import {
    getCompanyTeams,
    createTeamInCompany,
    deleteTeamFromCompany,
    updateTeamInCompany,
} from '@api/companies/companiesServices';

interface CompanyTeamsProps {
    company: Company;
}

export default function CompanyTeams({ company }: CompanyTeamsProps) {
    const [teams, setTeams] = useState<CompanyTeam[]>([]);
    const [globalFilter, setGlobalFilter] = useState<string | null>(null);
    const [isAddTeamDialogVisible, setIsAddTeamDialogVisible] = useState(false);
    const [isEditTeamDialogVisible, setIsEditTeamDialogVisible] = useState(false);
    const [newTeam, setNewTeam] = useState<Required<Pick<CompanyTeam, 'name' | 'description' | 'color'>>>({
        name: '',
        description: '',
        color: '#8b5cf6',
    });
    const [editingTeam, setEditingTeam] = useState<CompanyTeam | null>(null);

    useEffect(() => {
        const fetchTeams = async () => {
            if (!company?._id) return;

            try {
                const fetchedTeams = await getCompanyTeams(company._id);
                setTeams(fetchedTeams);
            } catch (error) {
                console.error('Error fetching teams:', error);
                toast.error('Failed to load teams.');
            }
        };

        fetchTeams();
    }, [company]);

    const handleAddTeam = async () => {
        if (!newTeam.name || !newTeam.color) {
            toast.error('Team name and color are required.');
            return;
        }

        const formattedTeam = {
            ...newTeam,
            color: newTeam.color.startsWith('#') ? newTeam.color : `#${newTeam.color}`,
        };

        try {
            const createdTeam = await createTeamInCompany(company._id, formattedTeam);
            setTeams([...teams, createdTeam]);
            toast.success('Team added successfully!');
            setIsAddTeamDialogVisible(false);
            setNewTeam({ name: '', description: '', color: '#6b7280' });
        } catch (error) {
            console.error('Error adding team:', error);
            toast.error('Failed to add team.');
        }
    };

    const handleEditTeam = (team: CompanyTeam) => {
        setEditingTeam(team);
        setIsEditTeamDialogVisible(true);
    };

    const handleUpdateTeam = async () => {
        if (!editingTeam || !editingTeam.name || !editingTeam.color) {
            toast.error('Team name and color are required.');
            return;
        }

        const formattedTeam = {
            ...editingTeam,
            color: editingTeam.color.startsWith('#') ? editingTeam.color : `#${editingTeam.color}`,
        };

        try {
            const updatedTeam = await updateTeamInCompany(company._id, editingTeam.teamId, formattedTeam);
            setTeams(
                teams.map((team) => (team.teamId === updatedTeam.teamId ? updatedTeam : team))
            );
            toast.success('Team updated successfully!');
            setIsEditTeamDialogVisible(false);
            setEditingTeam(null);
        } catch (error) {
            console.error('Error updating team:', error);
            toast.error('Failed to update team.');
        }
    };

    const confirmDeleteTeam = (teamId: string) => {
        confirmDialog({
            message: 'Are you sure you want to delete this team?',
            header: 'Confirm Deletion',
            icon: 'pi pi-exclamation-triangle',
            accept: () => handleDeleteTeam(teamId),
        });
    };

    const handleDeleteTeam = async (teamId: string) => {
        try {
            await deleteTeamFromCompany(company._id, teamId);
            setTeams(teams.filter((team) => team.teamId !== teamId));
            toast.success('Team deleted successfully!');
        } catch (error) {
            console.error('Error deleting team:', error);
            toast.error('Failed to delete team.');
        }
    };

    const renderHeader = () => (
        <div className="teams-list-header">
            <div className="p-inputgroup">
                <InputText
                    value={globalFilter || ''}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    placeholder="Search teams"
                />
                <span className="p-inputgroup-addon">
                    <i className="pi pi-search" />
                </span>
            </div>
            <Button
                label="Add Team"
                icon="pi pi-plus"
                className="p-button"
                onClick={() => setIsAddTeamDialogVisible(true)}
            />
        </div>
    );

    const header = renderHeader();

    return (
        <div className="company-teams">
            <DataTable
                value={teams}
                className="teams-list"
                paginator
                rows={10}
                globalFilter={globalFilter}
                globalFilterFields={['name', 'description']}
                header={header}
                emptyMessage="No teams found."
            >
                <Column
                    style={{ width: '5%' }}
                    body={(team) => (
                        <Tag style={{ backgroundColor: team.color, padding: '0.8rem', display: 'flex' }}></Tag>
                    )}
                />
                <Column style={{ width: '40%' }} field="name" header="Name" />
                <Column style={{ width: '50%' }} field="description" header="Description" />
                <Column
                    style={{ width: '5%' }}
                    body={(team) => (
                        <div className="action-buttons">
                            <i className="pi pi-pencil" title="Edit" onClick={() => handleEditTeam(team)}></i>
                            <i
                                className="pi pi-trash"
                                title="Delete"
                                onClick={() => confirmDeleteTeam(team.teamId)}
                            ></i>
                        </div>
                    )}
                />
            </DataTable>

            <Dialog
                header="Add Team"
                visible={isAddTeamDialogVisible}
                onHide={() => {
                    setIsAddTeamDialogVisible(false);
                    setNewTeam({ name: '', description: '', color: '#6b7280' });
                }}

            >
                <div className="add-team-form">
                    <span className="p-float-label">
                        <InputText
                            id="teamName"
                            value={newTeam.name}
                            onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
                        />
                        <label htmlFor="teamName">Team Name</label>
                    </span>
                    <span className="p-float-label">
                        <InputText
                            id="teamDescription"
                            value={newTeam.description}
                            onChange={(e) => setNewTeam({ ...newTeam, description: e.target.value })}
                        />
                        <label htmlFor="teamDescription">Description</label>
                    </span>
                    <span className="p-float-label">
                        <ColorPicker
                            id="teamColor"
                            value={newTeam.color}
                            onChange={(e) => {
                                const value = e.value;

                                if (!value) {
                                    setNewTeam({ ...newTeam, color: '#8b5cf6' });
                                    return;
                                }

                                let colorString: string;

                                if (typeof value === 'string') {
                                    colorString = value;
                                } else if ('r' in value && 'g' in value && 'b' in value) {
                                    const { r, g, b } = value;
                                    colorString = `#${((1 << 24) + (r << 16) + (g << 8) + b)
                                        .toString(16)
                                        .slice(1)}`;
                                } else if ('h' in value && 's' in value && 'v' in value) {
                                    colorString = '#8b5cf6';
                                } else {
                                    colorString = '#8b5cf6';
                                }

                                setNewTeam({ ...newTeam, color: colorString });
                            }}
                            style={{ width: '100%' }}
                        />
                        <label htmlFor="teamColor">Color</label>
                    </span>

                    <Button label="Create" icon="pi pi-check" onClick={handleAddTeam} className="p-button-primary" />
                </div>
            </Dialog>

            <Dialog
                header="Edit Team"
                visible={isEditTeamDialogVisible}
                onHide={() => {
                    setIsEditTeamDialogVisible(false);
                    setEditingTeam(null);
                }}

            >
                <div className="edit-team-form">
                    <span className="p-float-label">
                        <InputText
                            id="editTeamName"
                            value={editingTeam?.name || ''}
                            onChange={(e) => setEditingTeam({ ...editingTeam, name: e.target.value } as CompanyTeam)}
                        />
                        <label htmlFor="editTeamName">Team Name</label>
                    </span>
                    <span className="p-float-label">
                        <InputText
                            id="editTeamDescription"
                            value={editingTeam?.description || ''}
                            onChange={(e) =>
                                setEditingTeam({ ...editingTeam, description: e.target.value } as CompanyTeam)
                            }
                        />
                        <label htmlFor="editTeamDescription">Description</label>
                    </span>
                    <span className="p-float-label">
                        <ColorPicker
                            id="editTeamColor"
                            value={editingTeam?.color || '#8b5cf6'}
                            onChange={(e) => {
                                const value = e.value;

                                if (!value) {
                                    setEditingTeam({ ...editingTeam, color: '#8b5cf6' } as CompanyTeam);
                                    return;
                                }

                                let colorString: string;
                                if (typeof value === 'string') {
                                    colorString = value.startsWith('#') ? value : `#${value}`;
                                } else if ('r' in value && 'g' in value && 'b' in value) {
                                    const { r, g, b } = value;
                                    colorString = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
                                } else {
                                    colorString = '#8b5cf6';
                                }

                                setEditingTeam({ ...editingTeam, color: colorString } as CompanyTeam);
                            }}
                            style={{ width: '100%' }}
                        />
                        <label htmlFor="editTeamColor">Color</label>
                    </span>

                    <Button
                        label="Save"
                        icon="pi pi-check"
                        onClick={handleUpdateTeam}
                        className="p-button-primary"
                    />
                </div>
            </Dialog>
            <ConfirmDialog />
        </div>
    );
}
