export interface IProject extends IProjectSubmitNew {
    id: string;
    creationDate: Date;
}

export interface IProjectSubmitNew {
    name: string;
    description: string | null;
    isPublic: boolean;
    endDate: Date | null;
    theme: string;
    picture: string | null;
}

export interface IFavoriteProject extends IProject {
    favoriteProjectId: string;
}
