import { useState } from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

import './Home.scss';
import logoTextHWhite from '@assets/images/logo_text_h_white.png';

export default function Home() {
    const [isLogin, setIsLogin] = useState(true);

    const switchToLogin = () => setIsLogin(true);
    const switchToRegister = () => setIsLogin(false);

    return (
        <div className="home">
            <header>
                <img src={logoTextHWhite} alt="logo" />
            </header>

            <div className="glass-container">
                <h1>{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
                <p className="home-description">
                    {isLogin ? 'Please enter your details' : 'Join us to manage your HR tasks'}
                </p>

                {isLogin ? <LoginForm switchToRegister={switchToRegister} /> : <RegisterForm switchToLogin={switchToLogin} />}
            </div>

            <footer>
                <p>
                    © Copyright {new Date().getFullYear()} - <a href="https://brian-novoa.com/">Brian G. Novoa</a>
                </p>
            </footer>
        </div>
    );
}