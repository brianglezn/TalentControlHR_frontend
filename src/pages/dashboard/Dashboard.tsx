import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import DashboardMenu from '@pages/dashboard/components/DashboardMenu';
import CreateJoinCompanyModal from '@pages/dashboard/components/CreateJoinCompanyModal';
import { getCurrentUser } from '@api/user/userServices';
import { User } from '@utils/types';

import './Dashboard.scss';

export default function Dashboard() {
    const [user, setUser] = useState<User | null>(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const fetchedUser = await getCurrentUser();
                setUser(fetchedUser);

                if (!fetchedUser.company) {
                    setShowModal(true);
                }
            } catch (error) {
                console.error('Error fetching current user:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleCompanyAssociation = (updatedUser: User) => {
        setUser(updatedUser);
        setShowModal(false);
    };

    return (
        <div className="dashboard">
            <DashboardMenu />
            <div className="dashboard-content">
                <Outlet />
            </div>
            {showModal && user && ( // Verifica que `user` no sea null antes de pasar como prop
                <Dialog
                    header="Join or Create a Company"
                    visible={showModal}
                    onHide={() => {}}
                    closable={false}
                    modal
                    className="p-fluid"
                >
                    <CreateJoinCompanyModal user={user} onCompanyAssociated={handleCompanyAssociation} />
                </Dialog>
            )}
        </div>
    );
}
