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
