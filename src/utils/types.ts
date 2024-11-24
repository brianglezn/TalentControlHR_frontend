export interface User {
    username: string;
    name: string;
    team: string;
    surnames: string;
    email: string;
    role: string;
}

export interface Company {
    name: string;
    description: string;
    industry: string;
    image: string;
    teams: CompanyTeam[];
}

export interface CompanyTeam {
    name: string;
    description: string;
    color: string;
}
