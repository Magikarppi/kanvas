import { v4 as uuid } from "uuid";
import { getCurrentTimestamp } from "../../utils/utilities";

export type IUser = {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    password_hash: string;
    phone_number: string | null;
    country: string | null;
    city: string | null;
    picture: string | null;
    account_creation_date: Date | null;
    is_online: boolean | null;
    last_online: Date | null;
    is_open_to_work: boolean | null;
    linkedin_username: string | null;
    job_pitch: string | null;
};

// password_hash created from "password"
export const dummyUsers: IUser[] = [
    {
        id: uuid(),
        first_name: "John",
        last_name: "Doe",
        email: "user1@example.com",
        password_hash:
            "$argon2id$v=19$m=65536,t=3,p=4$Rqlr5Mz56W+Uoe2a74WaVw$IJWV/bt/Ui/NSTCusopgUsFsjBjDfsTOE0t761N6pEU",
        phone_number: "+123456789",
        country: "USA",
        city: "New York",
        picture: "url_to_picture",
        account_creation_date: new Date("2023-01-01"),
        is_online: true,
        last_online: new Date("2023-11-15"),
        is_open_to_work: true,
        linkedin_username: "john_doe_linkedin",
        job_pitch: "Experienced professional seeking new opportunities.",
    },
    {
        id: uuid(),
        first_name: "Alice",
        last_name: "Smith",
        email: "user2@example.com",
        password_hash:
            "$argon2id$v=19$m=65536,t=3,p=4$Rqlr5Mz56W+Uoe2a74WaVw$IJWV/bt/Ui/NSTCusopgUsFsjBjDfsTOE0t761N6pEU",
        phone_number: null,
        country: "Canada",
        city: "Toronto",
        picture: null,
        account_creation_date: new Date("2023-02-15"),
        is_online: false,
        last_online: null,
        is_open_to_work: false,
        linkedin_username: "alice_smith_linkedin",
        job_pitch: "Passionate about technology and innovation.",
    },
    {
        id: uuid(),
        first_name: "Emily",
        last_name: "Johnson",
        email: "user3@example.com",
        password_hash:
            "$argon2id$v=19$m=65536,t=3,p=4$Rqlr5Mz56W+Uoe2a74WaVw$IJWV/bt/Ui/NSTCusopgUsFsjBjDfsTOE0t761N6pEU",
        phone_number: "+987654321",
        country: "UK",
        city: "London",
        picture: "url_to_picture_3",
        account_creation_date: new Date("2023-03-20"),
        is_online: true,
        last_online: new Date("2023-11-14"),
        is_open_to_work: true,
        linkedin_username: "emily_johnson_linkedin",
        job_pitch: "Dedicated and motivated professional seeking challenges.",
    },
    {
        id: uuid(),
        first_name: "Michael",
        last_name: "Brown",
        email: "user4@example.com",
        password_hash:
            "$argon2id$v=19$m=65536,t=3,p=4$Rqlr5Mz56W+Uoe2a74WaVw$IJWV/bt/Ui/NSTCusopgUsFsjBjDfsTOE0t761N6pEU",
        phone_number: null,
        country: "Australia",
        city: "Sydney",
        picture: "url_to_picture_4",
        account_creation_date: new Date("2023-04-10"),
        is_online: true,
        last_online: new Date("2023-11-15"),
        is_open_to_work: true,
        linkedin_username: null,
        job_pitch: "Aiming for excellence in every task.",
    },
    {
        id: uuid(),
        first_name: "Sophia",
        last_name: "Garcia",
        email: "user5@example.com",
        password_hash:
            "$argon2id$v=19$m=65536,t=3,p=4$Rqlr5Mz56W+Uoe2a74WaVw$IJWV/bt/Ui/NSTCusopgUsFsjBjDfsTOE0t761N6pEU",
        phone_number: "+1122334455",
        country: "Spain",
        city: "Madrid",
        picture: "url_to_picture_5",
        account_creation_date: new Date("2023-05-05"),
        is_online: false,
        last_online: null,
        is_open_to_work: true,
        linkedin_username: "sophia_garcia_linkedin",
        job_pitch: "Passionate about making a difference through technology.",
    },
];

export interface Project {
    id: string;
    projectName: string;
    description: string | null;
    isPublic: boolean;
    projectCreationDate: string;
    projectEndDate: string | null;
    theme: string | null;
    picture: string | null;
}

export const dummyProjects: Project[] = [
    {
        id: uuid(),
        projectName: "Project A",
        description: "This is Project A, a dummy project.",
        isPublic: true,
        projectCreationDate: "2023-01-01",
        projectEndDate: "2023-06-30",
        theme: "Technology",
        picture: "url_to_picture_project_a",
    },
    {
        id: uuid(),
        projectName: "Project B",
        description: null,
        isPublic: false,
        projectCreationDate: "2023-02-15",
        projectEndDate: null,
        theme: "Art",
        picture: null,
    },
    {
        id: uuid(),
        projectName: "Project C",
        description: "Project C is another sample project.",
        isPublic: true,
        projectCreationDate: "2023-03-20",
        projectEndDate: "2023-12-31",
        theme: null,
        picture: "url_to_picture_project_c",
    },
    {
        id: uuid(),
        projectName: "Project D",
        description: "Project D description goes here.",
        isPublic: true,
        projectCreationDate: "2023-04-10",
        projectEndDate: "2024-01-15",
        theme: "Science",
        picture: "url_to_picture_project_d",
    },
    {
        id: uuid(),
        projectName: "Project E",
        description: null,
        isPublic: false,
        projectCreationDate: "2023-05-05",
        projectEndDate: null,
        theme: "dark",
        picture: "url_to_picture_project_e",
    },
    {
        id: uuid(),
        projectName: "Project F",
        description: "Project F description goes here.",
        isPublic: true,
        projectCreationDate: "2023-06-20",
        projectEndDate: "2023-12-31",
        theme: "red",
        picture: null,
    },
];

export const dummyGetProjectData = {
    projectColumns: [
        {
            id: uuid(),
            projectId: uuid(),
            column_name: "Dummy Column",
            orderIndex: 1,
        },
    ],
    projectMembers: [
        {
            id: uuid(),
            userId: uuid(),
            projectId: uuid(),
        },
    ],
    cards: [
        {
            id: uuid(),
            projectId: uuid(),
            title: "Dummy Card Title",
            subTitle: "Dummy Card Subtitle",
            description: "Dummy Card Description",
            status: "Dummy Status in Progress",
            creationDate: getCurrentTimestamp(),
            dueDate: getCurrentTimestamp(),
            attachments: ["Dummy attachment"],
            inColumn: uuid(),
            cardResponsiblePersons: [
                { id: uuid(), userId: uuid(), cardId: uuid() },
            ],
            cardKeywords: [
                {
                    keywordId: uuid(),
                    cardId: uuid(),
                },
            ],
            cardComments: [
                {
                    id: uuid(),
                    cardId: uuid(),
                    author: uuid(),
                    commentText: "Dummy Comment Text",
                    timeAdded: getCurrentTimestamp(),
                    reactions: [
                        {
                            id: uuid(),
                            userId: uuid(),
                            cardComment: "Dummy Card Comment",
                            emoji: "U+1F600",
                        },
                    ],
                },
            ],
        },
    ],
};
