import { ProjectMember } from "./projectModels";

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
    orderIndex: number;
}

export interface IOnSaveAddCardModalObject  {
    title: string;
    desc: string;
    files: string[] | null;
    status: string;
    dueDate: Date;
    responsiblePersonId: string;
}
export interface IAddCardModal {
    onCloseAddCardModal:() => void;
    isAddCardModalOpen: boolean;
    onSaveAddCardModal:(object: IOnSaveAddCardModalObject) => void;
    members?:ProjectMember[];
}

export interface ICardResponsiblePerson {
    cardResponsibleId: string;
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    picture: string | ArrayBuffer | null;
}

export interface IResponsiblePerson {
    id: string;
    userId: string;
    cardId: string;
}
