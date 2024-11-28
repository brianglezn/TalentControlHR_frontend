const API_URL = import.meta.env.VITE_API_URL;

export const getAllUsers = async () => {
    try {
        const response = await fetch(`${API_URL}/api/users`, { credentials: 'include' });
        return response.json();
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const getUserById = async (id: string) => {
    try {
        const response = await fetch(`${API_URL}/api/users/${id}`, { credentials: 'include' });
        return response.json();
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw error;
    }
};

export const getCurrentUser = async () => {
    try {
        const response = await fetch(`${API_URL}/api/users/me`, { credentials: 'include' });
        if (!response.ok) {
            throw new Error('Failed to fetch current user');
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching current user:', error);
        throw error;
    }
};

export const createUser = async (user: { username: string; name: string; surnames: string; email: string; password: string }) => {
    try {
        const response = await fetch(`${API_URL}/api/users`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        });
        return response.json();
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

export const updateUserById = async (id: string, updates: object) => {
    try {
        const response = await fetch(`${API_URL}/api/users/${id}`, {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updates),
        });
        return response.json();
    } catch (error) {
        console.error('Error updating user by ID:', error);
        throw error;
    }
};

export const deleteUserById = async (id: string) => {
    try {
        const response = await fetch(`${API_URL}/api/users/${id}`, { method: 'DELETE', credentials: 'include' });
        return response.json();
    } catch (error) {
        console.error('Error deleting user by ID:', error);
        throw error;
    }
};

export const resetUserPassword = async (id: string, newPassword: string) => {
    try {
        const response = await fetch(`${API_URL}/api/users/${id}/reset-password`, {
            method: 'PATCH',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ newPassword }),
        });
        return response.json();
    } catch (error) {
        console.error('Error resetting user password:', error);
        throw error;
    }
};
