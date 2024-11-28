const API_URL = import.meta.env.VITE_API_URL;

export const register = async (data: { username: string; name: string; surnames: string; email: string; password: string }) => {
    const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to register');
    }

    return response.json();
};

export const login = async (data: { identifier: string; password: string }) => {
    const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            ...(data.identifier.includes('@') ? { email: data.identifier } : { username: data.identifier }),
            password: data.password,
        }),
        credentials: 'include',
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to login');
    }

    return response.json();
};

export const logout = async () => {
    const response = await fetch(`${API_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to logout');
    }

    return response.json();
};

export const verify = async () => {
    const response = await fetch(`${API_URL}/api/auth/verify`, {
        method: 'GET',
        credentials: 'include',
    });

    if (!response.ok) {
        return { isAuthenticated: false };
    }

    return response.json();
};
