import { createContext } from 'react';
import type { User, Company } from '@utils/types';

interface UserCompanyContextProps {
    user: User | null;
    company: Company | null;
    setUser: (user: User | null) => void;
    setCompany: (company: Company | null) => void;
    isLoading: boolean;
}

const UserCompanyContext = createContext<UserCompanyContextProps | undefined>(undefined);

export default UserCompanyContext;
