const API_URL = import.meta.env.VITE_API_URL;

export const getAllUsers = async () => {
    const response = await fetch(`${API_URL}/api/users`, { credentials: 'include' });
    return response.json();
};

export const getUserById = async (id: string) => {
    const response = await fetch(`${API_URL}/api/users/${id}`, { credentials: 'include' });
    return response.json();
};

export const getCurrentUser = async () => {
    const response = await fetch(`${API_URL}/api/users/me`, {
        credentials: 'include',
    });
    if (!response.ok) {
        throw new Error('Failed to fetch current user');
    }
    return response.json();
};

export const createUser = async (user: { username: string; name: string; surnames: string; email: string; password: string }) => {
    const response = await fetch(`${API_URL}/api/users`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    });
    return response.json();
};

export const updateUserById = async (id: string, updates: object) => {
    const response = await fetch(`${API_URL}/api/users/${id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
    });
    return response.json();
};

export const deleteUserById = async (id: string) => {
    const response = await fetch(`${API_URL}/api/users/${id}`, { method: 'DELETE', credentials: 'include' });
    return response.json();
};

export const resetUserPassword = async (id: string, newPassword: string) => {
    const response = await fetch(`${API_URL}/api/users/${id}/reset-password`, {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword }),
    });
    return response.json();
};
