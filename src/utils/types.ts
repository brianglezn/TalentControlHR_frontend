// User types
export interface User {
    userId: string;
    username: string;
    name: string;
    surnames: string;
    email: string;
    password: string;
    role: string;
    company?: string
}

// Company types
export interface Company {
    companyId: string;
    name: string;
    description?: string;
    industry: string;
    image: string;
    teams: CompanyTeam[];
    users: User[];
}

export interface CompanyTeam {
    teamId: string;
    name: string;
    description?: string;
    color: string;
    users: string[];
}

// TimeOff types
export interface Attendance {
    attendanceId: string;
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
    shiftId: string;
    name: string;
    user: User;
    team: CompanyTeam;
    startTime: Date;
    endTime: Date;
    notes?: string;
}
