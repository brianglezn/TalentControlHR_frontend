import { Outlet } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';

import './Dashboard.scss';
import DashboardMenu from '@pages/dashboard/components/DashboardMenu';
import CreateJoinCompanyModal from '@pages/dashboard/components/CreateJoinCompanyModal';
import useUserCompany from '@context/useUserCompany';
import { User, Company } from '@utils/types';

export default function Dashboard() {
    const { user, company, setUser, setCompany, isLoading } = useUserCompany();

    if (isLoading) {
        return null;
    }

    const handleCompanyAssociation = (updatedUser: User, updatedCompany: Company) => {
        setUser(updatedUser);
        setCompany(updatedCompany);
    };

    return (
        <div className="dashboard">
            <DashboardMenu />
            <div className="dashboard-content">
                <Outlet />
            </div>
            {!company && user && (
                <Dialog
                    header="Join or Create a Company"
                    visible={!company}
                    onHide={() => {}}
                    closable={false}
                    modal
                    className="p-fluid"
                >
                    <CreateJoinCompanyModal
                        user={user}
                        onCompanyAssociated={handleCompanyAssociation}
                    />
                </Dialog>
            )}
        </div>
    );
}
