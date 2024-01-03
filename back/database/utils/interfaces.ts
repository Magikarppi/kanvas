export interface IParametrizedQuery {
    query: string;
    parameters?: (string | boolean | Date | null | number | undefined)[];
}

export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    passwordHash?: string;
    phoneNumber: string | null;
    country: string | null;
    city: string | null;
    picture: string | null;
    accountCreationDate: Date | null;
    isOnline: boolean | null;
    lastOnline: Date | null;
    isOpenToWork: boolean | null;
    linkedinUsername: string | null;
    jobPitch: string | null;
}

export interface IUpdateUser {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string | null;
    country: string | null;
    city: string | null;
    picture: string | null;
    isOnline: boolean | null;
    lastOnline: Date | null;
    isOpenToWork: boolean | null;
    linkedinUsername: string | null;
    jobPitch: string | null;
}

export interface ITeam {
    id: string;
    name: string;
    admin: string;
    isPublic: boolean;
}

export type IProject = {
    id: string;
    name: string;
    description: string;
    isPublic: boolean;
    creationDate: Date;
    endDate: Date | null;
    theme: string;
    picture: string | null;
};

export interface ICard {
    id: string;
    projectId: string;
    title: string;
    subTitle?: string | null;
    description?: string | null;
    status?: string | null;
    creationDate: Date;
    dueDate?: Date | null;
    attachments?: string | null;
    inColumn: string;
}

export interface IUsersTeam {
    id: string;
    userId: string;
    teamId: string;
}

export interface IProjectMember {
    id: string;
    userId: string;
    projectId: string;
}

export interface IUserRole {
    projectId: string;
    userId: string;
    role: string;
}

export interface IProjectColumn {
    id: string;
    projectId: string;
    columnName: string;
    orderIndex: number;
}
