import React from 'react';
import { Button } from 'primereact/button';

import './Home.scss';

const Home: React.FC = () => {
    return (
        <div className="home">
            <div className="home-div">
                <h1>Bienvenido a TalentControlHR</h1>
                <p>Gestión de Recursos Humanos sencilla para empresas</p>
                <Button label="Login" icon="pi pi-arrow-right" className="p-button-primary" />
            </div>
        </div>
    );
};

export default Home;
