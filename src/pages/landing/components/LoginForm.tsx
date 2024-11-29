import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { login } from '@api/auth/authService';
import { useAuth } from '@context/useAuth';

interface LoginFormProps {
    switchToRegister: () => void;
}

export default function LoginForm({ switchToRegister }: LoginFormProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login: setAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await login({ identifier: email, password });
            toast.success('Login successful!');
            setAuthenticated();
            navigate('/dashboard');
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message || 'An error occurred');
            } else {
                toast.error('An unexpected error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="input-group">
                <span className="p-float-label">
                    <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor="email">Email</label>
                </span>
            </div>
            <div className="input-group">
                <span className="p-float-label">
                    <Password
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        toggleMask
                        feedback={false}
                    />
                    <label htmlFor="password">Password</label>
                </span>
            </div>
            <Button
                label="Login"
                className="sign-in-button"
                onClick={handleSubmit}
                loading={loading}
            />
            <p className="signup-text">
                Don’t have an account?{' '}
                <span onClick={switchToRegister} className="toggle-text">
                    Sign up
                </span>
            </p>
        </div>
    );
}
