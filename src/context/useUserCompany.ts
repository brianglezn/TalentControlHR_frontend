import { useContext } from 'react';
import UserCompanyContext from './UserCompanyContext';

export const useUserCompany = () => {
    const context = useContext(UserCompanyContext);
    if (!context) {
        throw new Error('useUserCompany must be used within a UserCompanyProvider');
    }
    return context;
};

export default useUserCompany;