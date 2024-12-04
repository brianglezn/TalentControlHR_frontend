const API_URL = import.meta.env.VITE_API_URL;

export const getAllCompanies = async () => {
    try {
        const response = await fetch(`${API_URL}/api/companies`, { credentials: 'include' });
        return response.json();
    } catch (error) {
        console.error('Error fetching companies:', error);
        throw error;
    }
};

export const getCompanyById = async (id: string) => {
    try {
        const response = await fetch(`${API_URL}/api/companies/${id}`, { credentials: 'include' });
        return response.json();
    } catch (error) {
        console.error('Error fetching company by ID:', error);
        throw error;
    }
};

export const createCompany = async (company: { name: string; description: string; industry: string; image: string }) => {
    try {
        const response = await fetch(`${API_URL}/api/companies`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(company),
        });
        return response.json();
    } catch (error) {
        console.error('Error creating company:', error);
        throw error;
    }
};

export const updateCompanyById = async (id: string, updates: object) => {
    try {
        const response = await fetch(`${API_URL}/api/companies/${id}`, {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updates),
        });
        return response.json();
    } catch (error) {
        console.error('Error updating company:', error);
        throw error;
    }
};

export const deleteCompanyById = async (id: string) => {
    try {
        const response = await fetch(`${API_URL}/api/companies/${id}`, { method: 'DELETE', credentials: 'include' });
        return response.json();
    } catch (error) {
        console.error('Error deleting company:', error);
        throw error;
    }
};

export const getUsersFromCompany = async (id: string) => {
    try {
        const response = await fetch(`${API_URL}/api/companies/${id}/users`, { credentials: 'include' });
        return response.json();
    } catch (error) {
        console.error('Error fetching users from company:', error);
        throw error;
    }
};

export const addUserToCompany = async (companyId: string, userId: string, roles: string[]) => {
    try {
        const response = await fetch(`${API_URL}/api/companies/${companyId}/users/${userId}`, {
            method: 'PATCH',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ roles }),
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to add user to company: ${errorMessage}`);
        }

        return response.json();
    } catch (error) {
        console.error('Error adding user to company:', error);
        throw error;
    }
};

export const updateUserRolesInCompany = async (companyId: string, userId: string, roles: string[]) => {
    try {
        const response = await fetch(`${API_URL}/api/companies/${companyId}/users/${userId}/roles`, {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ roles }),
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to update user roles: ${errorMessage}`);
        }

        return response.json();
    } catch (error) {
        console.error('Error updating user roles:', error);
        throw error;
    }
};

export const deleteUserFromCompany = async (id: string, userId: string) => {
    try {
        const response = await fetch(`${API_URL}/api/companies/${id}/users/${userId}`, {
            method: 'DELETE',
            credentials: 'include',
        });
        return response.json();
    } catch (error) {
        console.error('Error deleting user from company:', error);
        throw error;
    }
};

export const getCompanyTeams = async (id: string) => {
    try {
        const response = await fetch(`${API_URL}/api/companies/${id}/teams`, { credentials: 'include' });
        return response.json();
    } catch (error) {
        console.error('Error fetching teams from company:', error);
        throw error;
    }
};

export const getCompanyTeamById = async (id: string, teamId: string) => {
    try {
        const response = await fetch(`${API_URL}/api/companies/${id}/teams/${teamId}`, { credentials: 'include' });
        return response.json();
    } catch (error) {
        console.error('Error fetching team by ID:', error);
        throw error;
    }
};

export const createTeamInCompany = async (id: string, team: { name: string; description: string; color: string }) => {
    try {
        const response = await fetch(`${API_URL}/api/companies/${id}/teams`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(team),
        });
        return response.json();
    } catch (error) {
        console.error('Error creating team in company:', error);
        throw error;
    }
};

export const updateTeamInCompany = async (id: string, teamId: string, updates: object) => {
    try {
        const response = await fetch(`${API_URL}/api/companies/${id}/teams/${teamId}`, {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updates),
        });
        return response.json();
    } catch (error) {
        console.error('Error updating team in company:', error);
        throw error;
    }
};

export const deleteTeamFromCompany = async (id: string, teamId: string) => {
    try {
        const response = await fetch(`${API_URL}/api/companies/${id}/teams/${teamId}`, {
            method: 'DELETE',
            credentials: 'include',
        });
        return response.json();
    } catch (error) {
        console.error('Error deleting team from company:', error);
        throw error;
    }
};

export const deleteUserFromTeam = async (companyId: string, teamId: string, userId: string) => {
    try {
        const response = await fetch(`${API_URL}/api/companies/${companyId}/teams/${teamId}/${userId}`, {
            method: 'DELETE',
            credentials: 'include',
        });
        if (!response.ok) throw new Error('Failed to delete user from team');
        return response.json();
    } catch (error) {
        console.error('Error deleting user from team:', error);
        throw error;
    }
};

export const addUserToTeam = async (companyId: string, teamId: string, userId: string) => {
    try {
        const response = await fetch(`${API_URL}/api/companies/${companyId}/teams/${teamId}/${userId}`, {
            method: 'PATCH',
            credentials: 'include',
        });
        if (!response.ok) throw new Error('Failed to add user to team');
        return response.json();
    } catch (error) {
        console.error('Error adding user to team:', error);
        throw error;
    }
};