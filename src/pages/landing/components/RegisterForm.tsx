import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { toast } from 'react-hot-toast';
import { register } from '@api/auth/authService';

interface RegisterFormProps {
    switchToLogin: () => void;
}

export default function RegisterForm({ switchToLogin }: RegisterFormProps) {
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        surnames: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            if (formData.password !== formData.confirmPassword) {
                toast.error('Passwords do not match');
                return;
            }
            await register({
                username: formData.username,
                name: formData.name,
                surnames: formData.surnames,
                email: formData.email,
                password: formData.password,
            });
            toast.success('Registration successful!');
            switchToLogin();
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message || 'An error occurred');
            } else {
                toast.error('An unexpected error occurred');
            }
        }
    };

    return (
        <div>
            <div className="input-group">
                <span className="p-float-label">
                    <InputText id="username" name="username" value={formData.username} onChange={handleInputChange} />
                    <label htmlFor="username">Username</label>
                </span>
            </div>
            <div className="input-group">
                <span className="p-float-label">
                    <InputText id="name" name="name" value={formData.name} onChange={handleInputChange} />
                    <label htmlFor="name">Name</label>
                </span>
            </div>
            <div className="input-group">
                <span className="p-float-label">
                    <InputText id="surnames" name="surnames" value={formData.surnames} onChange={handleInputChange} />
                    <label htmlFor="surnames">Surnames</label>
                </span>
            </div>
            <div className="input-group">
                <span className="p-float-label">
                    <InputText id="email" name="email" value={formData.email} onChange={handleInputChange} />
                    <label htmlFor="email">Email</label>
                </span>
            </div>
            <div className="input-group">
                <span className="p-float-label">
                    <Password
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        toggleMask
                        feedback={false}
                    />
                    <label htmlFor="password">Password</label>
                </span>
            </div>
            <div className="input-group">
                <span className="p-float-label">
                    <Password
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        toggleMask
                        feedback={false}
                    />
                    <label htmlFor="confirmPassword">Confirm Password</label>
                </span>
            </div>
            <Button label="Sign Up" className="sign-in-button" onClick={handleSubmit} />
            <p className="signup-text">
                Already have an account?{' '}
                <span onClick={switchToLogin} className="toggle-text">
                    Sign In
                </span>
            </p>
        </div>
    );
}
