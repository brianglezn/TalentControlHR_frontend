import { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { register, login } from '@api/auth/authService';
import { useAuth } from '@context/useAuth';

import './Home.scss';

export default function Home() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        username: '',
        surnames: '',
        confirmPassword: '',
    });
    const { login: setAuthenticated } = useAuth();
    const navigate = useNavigate();

    const resetForm = () => {
        setFormData({
            email: '',
            password: '',
            name: '',
            username: '',
            surnames: '',
            confirmPassword: '',
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            if (isLogin) {
                await login({ email: formData.email, password: formData.password });
                toast.success('Login successful!');
                setAuthenticated();
                navigate('/dashboard');
            } else {
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
                setIsLogin(true);
            }
            resetForm();
        } catch (err: unknown) {
            if (err instanceof Error) {
                toast.error(err.message || 'An error occurred');
            } else {
                toast.error('An unexpected error occurred');
            }
        }
    };

    return (
        <div className="home">
            <div className="glass-container">
                <h1>{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
                <p className="home-description">{isLogin ? 'Please enter your details' : 'Join us to manage your HR tasks'}</p>

                {isLogin ? (
                    <>
                        <div className="input-group">
                            <span className="p-float-label">
                                <InputText
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
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
                        <Button label="Login" className="sign-in-button" onClick={handleSubmit} />
                        <p className="signup-text">
                            Don’t have an account?{' '}
                            <span onClick={() => setIsLogin(false)} className="toggle-text">
                                Sign up
                            </span>
                        </p>
                    </>
                ) : (
                    <>
                        <div className="input-group">
                            <span className="p-float-label">
                                <InputText
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                />
                                <label htmlFor="username">Username</label>
                            </span>
                        </div>
                        <div className="input-group">
                            <span className="p-float-label">
                                <InputText
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                                <label htmlFor="name">Name</label>
                            </span>
                        </div>
                        <div className="input-group">
                            <span className="p-float-label">
                                <InputText
                                    id="surnames"
                                    name="surnames"
                                    value={formData.surnames}
                                    onChange={handleInputChange}
                                />
                                <label htmlFor="surnames">Surnames</label>
                            </span>
                        </div>
                        <div className="input-group">
                            <span className="p-float-label">
                                <InputText
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
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
                            <span onClick={() => setIsLogin(true)} className="toggle-text">
                                Sign In
                            </span>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}
