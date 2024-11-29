import { createContext, useState, useEffect, ReactNode } from 'react';
import { getCurrentUser } from '@api/user/userServices';
import { getAllCompanies } from '@api/companies/companiesServices';
import type { User, Company } from '@utils/types';

interface UserCompanyContextProps {
    user: User | null;
    company: Company | null;
    setUser: (user: User | null) => void;
    setCompany: (company: Company | null) => void;
    isLoading: boolean;
}

const UserCompanyContext = createContext<UserCompanyContextProps | undefined>(undefined);

export const UserCompanyProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [company, setCompany] = useState<Company | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedUser = await getCurrentUser();
                setUser(fetchedUser);

                if (fetchedUser._id) {
                    const allCompanies: Company[] = await getAllCompanies();
                    const userCompany = allCompanies.find((company: Company) =>
                        company.users.some((user: { userId: string }) => user.userId === fetchedUser._id)
                    );

                    if (userCompany) {
                        setCompany(userCompany);
                    }
                }
            } catch (error) {
                console.error('Error fetching user or company data:', error);
                setUser(null);
                setCompany(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <UserCompanyContext.Provider value={{ user, company, setUser, setCompany, isLoading }}>
            {children}
        </UserCompanyContext.Provider>
    );
};

export default UserCompanyContext;