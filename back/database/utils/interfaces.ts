export interface IParametrizedQuery {
    query: string;
    parameters?: (string | boolean | Date | null | number | undefined)[];
}

export interface IResetPasswordRequest {
    token: string;
    userID: string;
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

export interface ITeamDB {
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

export type IProjectDB = {
    id: string;
    name: string;
    description: string;
    is_public: boolean;
    project_creation_date: Date;
    project_end_date: Date | null;
    theme: string;
    picture: string | null;
};

export interface ICard {
    id: string;
    projectId: string;
    title: string;
    subTitle: string | null;
    description: string | null;
    status: string | null;
    creationDate: Date;
    dueDate: Date | null;
    attachments: string | null;
    inColumn: string;
    orderIndex: string;
}

export interface ICardDB {
    id: string;
    project_id: string;
    title: string;
    sub_title: string;
    description: string;
    status: string | null;
    creation_date: Date;
    due_date: Date | null;
    attachments: string | null;
    in_column: string;
    order_index: string;
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

export type ProjectMember = Pick<
    IUser,
    "id" | "firstName" | "lastName" | "email" | "picture"
>;

export interface IProjectMemberDB {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    picture: string;
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

export interface IProjectColumnDB {
    id: string;
    project_id: string;
    column_name: string;
    order_index: number;
}

export interface IFavoriteProject extends IProject {
    favoriteProjectId: string;
}

export interface IFavoriteProjectDB extends IProjectDB {
    favorite_project_id: string;
}
