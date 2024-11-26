const API_URL = import.meta.env.VITE_API_URL;

export const getAllCompanies = async () => {
    const response = await fetch(`${API_URL}/api/companies`, { credentials: 'include' });
    return response.json();
};

export const getCompanyById = async (id: string) => {
    const response = await fetch(`${API_URL}/api/companies/${id}`, { credentials: 'include' });
    return response.json();
};

export const createCompany = async (company: { name: string; description: string; industry: string; image: string }) => {
    const response = await fetch(`${API_URL}/api/companies`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(company),
    });
    return response.json();
};

export const updateCompanyById = async (id: string, updates: object) => {
    const response = await fetch(`${API_URL}/api/companies/${id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
    });
    return response.json();
};

export const deleteCompanyById = async (id: string) => {
    const response = await fetch(`${API_URL}/api/companies/${id}`, { method: 'DELETE', credentials: 'include' });
    return response.json();
};

export const getUsersFromCompany = async (id: string) => {
    const response = await fetch(`${API_URL}/api/companies/${id}/users`, { credentials: 'include' });
    return response.json();
};

export const addUserToCompany = async (id: string, userId: string) => {
    const response = await fetch(`${API_URL}/api/companies/${id}/users/${userId}`, {
        method: 'PATCH',
        credentials: 'include',
    });
    return response.json();
};

export const deleteUserFromCompany = async (id: string, userId: string) => {
    const response = await fetch(`${API_URL}/api/companies/${id}/users/${userId}`, {
        method: 'DELETE',
        credentials: 'include',
    });
    return response.json();
};

export const getCompanyTeams = async (id: string) => {
    const response = await fetch(`${API_URL}/api/companies/${id}/teams`, { credentials: 'include' });
    return response.json();
};

export const getCompanyTeamById = async (id: string, teamId: string) => {
    const response = await fetch(`${API_URL}/api/companies/${id}/teams/${teamId}`, { credentials: 'include' });
    return response.json();
};

export const createTeamInCompany = async (id: string, team: { name: string; description: string; color: string }) => {
    const response = await fetch(`${API_URL}/api/companies/${id}/teams`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(team),
    });
    return response.json();
};

export const updateTeamInCompany = async (id: string, teamId: string, updates: object) => {
    const response = await fetch(`${API_URL}/api/companies/${id}/teams/${teamId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
    });
    return response.json();
};

export const deleteTeamFromCompany = async (id: string, teamId: string) => {
    const response = await fetch(`${API_URL}/api/companies/${id}/teams/${teamId}`, {
        method: 'DELETE',
        credentials: 'include',
    });
    return response.json();
};
