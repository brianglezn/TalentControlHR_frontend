// User types
export interface User {
    _id: string;
    username: string;
    name: string;
    surnames: string;
    email: string;
    password?: never;
}

// Company types
export interface Company {
    _id: string;
    name: string;
    description?: string;
    industry: string;
    image: string;
    users: CompanyUser[];
    teams: CompanyTeam[];
}

export type CompanyIndustry = 'Technology' | 'Finance' | 'Healthcare' | 'Education' | 'Retail' | 'Other';

export const INDUSTRIES: { label: string; value: CompanyIndustry }[] = [
    { label: 'Technology', value: 'Technology' },
    { label: 'Finance', value: 'Finance' },
    { label: 'Healthcare', value: 'Healthcare' },
    { label: 'Education', value: 'Education' },
    { label: 'Retail', value: 'Retail' },
    { label: 'Other', value: 'Other' },
];

export interface CompanyUser {
    userId: string;
    roles: UserRole[];
}

export type UserRole = 'admin' | 'manager' | 'employee';

export interface CompanyTeam {
    teamId: string;
    name: string;
    description?: string;
    color: string;
    users: string[];
}

// TimeOff types
export interface Attendance {
    _id: string;
    user: User;
    date: Date;
    endDate?: Date;
    type: AttendanceType;
    status: AttendanceStatus;
    reason?: string;
}

export type AttendanceType = 'Vacations' | 'Sickness' | 'Sickness of a family member' | 'Maternity / Paternity' | 'Other';
export type AttendanceStatus = 'Pending' | 'Approved' | 'Denied';

// Shifts types
export interface Shift {
    _id: string;
    name: string;
    user: User;
    team: CompanyTeam;
    startTime: Date;
    endTime: Date;
    notes?: string;
}
