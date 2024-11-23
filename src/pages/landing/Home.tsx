import { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

import './Home.scss';

export default function Home() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        fullName: '',
        confirmPassword: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
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
                                <InputText
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                />
                                <label htmlFor="password">Password</label>
                            </span>
                            <span className="forgot-password">Forgot password?</span>
                        </div>
                        <Button label="Sign In" className="sign-in-button" />
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
                                    id="fullName"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                />
                                <label htmlFor="fullName">Full Name</label>
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
                                <InputText
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                />
                                <label htmlFor="password">Password</label>
                            </span>
                        </div>
                        <div className="input-group">
                            <span className="p-float-label">
                                <InputText
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                />
                                <label htmlFor="confirmPassword">Confirm Password</label>
                            </span>
                        </div>
                        <Button label="Sign Up" className="sign-in-button" />
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
