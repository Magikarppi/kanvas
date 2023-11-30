import { v4 as uuid } from "uuid";
import { getCurrentTimestamp } from "../../server/utils/utilities";
import { IUser } from "./interfaces";

// passwordHash created from "password"
export const dummyUsers: IUser[] = [
    {
        id: uuid(),
        firstName: "John",
        lastName: "Doe",
        email: "user1@example.com",
        passwordHash:
            "$argon2id$v=19$m=65536,t=3,p=4$Rqlr5Mz56W+Uoe2a74WaVw$IJWV/bt/Ui/NSTCusopgUsFsjBjDfsTOE0t761N6pEU",
        phoneNumber: "+123456789",
        country: "USA",
        city: "New York",
        picture: "url_to_picture",
        accountCreationDate: new Date("2023-01-01"),
        isOnline: true,
        lastOnline: new Date("2023-11-15"),
        isOpenToWork: true,
        linkedinUsername: "john_doe_linkedin",
        jobPitch: "Experienced professional seeking new opportunities.",
    },
    {
        id: uuid(),
        firstName: "Alice",
        lastName: "Smith",
        email: "user2@example.com",
        passwordHash:
            "$argon2id$v=19$m=65536,t=3,p=4$Rqlr5Mz56W+Uoe2a74WaVw$IJWV/bt/Ui/NSTCusopgUsFsjBjDfsTOE0t761N6pEU",
        phoneNumber: null,
        country: "Canada",
        city: "Toronto",
        picture: null,
        accountCreationDate: new Date("2023-02-15"),
        isOnline: false,
        lastOnline: null,
        isOpenToWork: false,
        linkedinUsername: "alice_smith_linkedin",
        jobPitch: "Passionate about technology and innovation.",
    },
    {
        id: uuid(),
        firstName: "Emily",
        lastName: "Johnson",
        email: "user3@example.com",
        passwordHash:
            "$argon2id$v=19$m=65536,t=3,p=4$Rqlr5Mz56W+Uoe2a74WaVw$IJWV/bt/Ui/NSTCusopgUsFsjBjDfsTOE0t761N6pEU",
        phoneNumber: "+987654321",
        country: "UK",
        city: "London",
        picture: "url_to_picture_3",
        accountCreationDate: new Date("2023-03-20"),
        isOnline: true,
        lastOnline: new Date("2023-11-14"),
        isOpenToWork: true,
        linkedinUsername: "emily_johnson_linkedin",
        jobPitch: "Dedicated and motivated professional seeking challenges.",
    },
    {
        id: uuid(),
        firstName: "Michael",
        lastName: "Brown",
        email: "user4@example.com",
        passwordHash:
            "$argon2id$v=19$m=65536,t=3,p=4$Rqlr5Mz56W+Uoe2a74WaVw$IJWV/bt/Ui/NSTCusopgUsFsjBjDfsTOE0t761N6pEU",
        phoneNumber: null,
        country: "Australia",
        city: "Sydney",
        picture: "url_to_picture_4",
        accountCreationDate: new Date("2023-04-10"),
        isOnline: true,
        lastOnline: new Date("2023-11-15"),
        isOpenToWork: true,
        linkedinUsername: null,
        jobPitch: "Aiming for excellence in every task.",
    },
    {
        id: uuid(),
        firstName: "Sophia",
        lastName: "Garcia",
        email: "user5@example.com",
        passwordHash:
            "$argon2id$v=19$m=65536,t=3,p=4$Rqlr5Mz56W+Uoe2a74WaVw$IJWV/bt/Ui/NSTCusopgUsFsjBjDfsTOE0t761N6pEU",
        phoneNumber: "+1122334455",
        country: "Spain",
        city: "Madrid",
        picture: "url_to_picture_5",
        accountCreationDate: new Date("2023-05-05"),
        isOnline: false,
        lastOnline: null,
        isOpenToWork: true,
        linkedinUsername: "sophia_garcia_linkedin",
        jobPitch: "Passionate about making a difference through technology.",
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
