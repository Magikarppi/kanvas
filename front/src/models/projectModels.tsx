import { IUser } from "./userModels";

export interface IProjectSubmitNew {
    name: string;
    description: string | null;
    isPublic: boolean;
    endDate: Date | null;
    theme: string;
    picture: string | null;
}
export interface IProject extends IProjectSubmitNew {
    id: string;
    creationDate: Date;
}

export interface IProjectImage {
    picture: string | ArrayBuffer | null;
}

export interface IFavoriteProject extends IProject {
    favoriteProjectId: string;
}

export interface IProjectColumn {
    id: string;
    projectId: string;
    columnName: string;
    orderIndex: number;
}

export type ProjectMember = Pick<
    IUser,
    "id" | "firstName" | "lastName" | "email" | "picture"
>;
