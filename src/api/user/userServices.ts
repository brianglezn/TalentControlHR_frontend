const API_URL = import.meta.env.VITE_API_URL;

export const getAllUsers = async () => {
    const response = await fetch(`${API_URL}/api/users`, { credentials: 'include' });
    const result = await response.json();
    if (result.error) {
        throw new Error(result.message);
    }
    return result.data;
};

export const getUserById = async (id: string) => {
    const response = await fetch(`${API_URL}/api/users/${id}`, { credentials: 'include' });
    const result = await response.json();
    if (result.error) {
        throw new Error(result.message);
    }
    return result.data;
};

export const getCurrentUser = async () => {
    const response = await fetch(`${API_URL}/api/users/me`, { credentials: 'include' });
    const result = await response.json();
    if (result.error) {
        throw new Error(result.message);
    }
    return result.data;
};

export const createUser = async (user: {
    username: string;
    name: string;
    surnames: string;
    email: string;
    password: string;
}) => {
    const response = await fetch(`${API_URL}/api/users`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    });
    const result = await response.json();
    if (result.error) {
        throw new Error(result.message);
    }
    return result;
};

export const updateUserById = async (id: string, updates: object) => {
    const response = await fetch(`${API_URL}/api/users/${id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
    });
    const result = await response.json();
    if (result.error) {
        throw new Error(result.message);
    }
    return result;
};

export const deleteUserById = async (id: string) => {
    const response = await fetch(`${API_URL}/api/users/${id}`, { method: 'DELETE', credentials: 'include' });
    const result = await response.json();
    if (result.error) {
        throw new Error(result.message);
    }
    return result;
};

export const resetUserPassword = async (id: string, newPassword: string) => {
    const response = await fetch(`${API_URL}/api/users/${id}/reset-password`, {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword }),
    });
    const result = await response.json();
    if (result.error) {
        throw new Error(result.message);
    }
    return result;
};
