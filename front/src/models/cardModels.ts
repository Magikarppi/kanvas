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
}
