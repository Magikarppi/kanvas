export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
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
    is_public: boolean;
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
    project_id: string;
    title: string;
    sub_title?: string | null;
    description?: string | null;
    status?: string | null;
    creation_date: Date;
    due_date?: Date | null;
    attachments?: string | null;
    in_column: string;
}
