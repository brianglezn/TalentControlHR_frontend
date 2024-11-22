import { useNavigate } from 'react-router-dom';

import { Button } from 'primereact/button';

import './Home.scss';

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="home">
            <div className="home-div">
                <h1>Welcome to TalentControlHR</h1>
                <p>Simple HR management for businesses</p>
                <Button
                    label="Login"
                    icon="pi pi-arrow-right"
                    className="p-button-primary"
                    onClick={() => navigate('/dashboard')}
                />
            </div>
        </div>
    );
}
