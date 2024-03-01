import {
    ICard,
    ICardCommentDB,
    ICardDB,
    IFavoriteProject,
    IFavoriteProjectDB,
    IProject,
    IProjectColumn,
    IProjectColumnDB,
    IProjectDB,
    IProjectMemberDB,
    IReaction,
    IReactionDB,
    ITeam,
    ITeamDB,
    IUser,
    IUserFromDB,
    ICardResponsiblePersonDB,
} from "../../database/utils/interfaces";

export const getCurrentTimestamp = (): Date => {
    const date = new Date();

    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    const timestamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return new Date(timestamp);
};

export const validateEmail = (email: string): boolean => {
    const validateEmailRegEx = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return validateEmailRegEx.test(email);
};

export const validatePasswordFormat = (password: string): boolean => {
    // 8-50 characters long, at least one number and one special character listed inside square brackets
    const passwordRegEx =
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/\\-\\=-]).{8,50}$/;
    return passwordRegEx.test(password);
};

export const HTTP_RESPONSE_CODES = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    SERVER_ERROR: 500,
};

export const RESPONSE_MESSAGES = {
    CARD_NOT_FOUND: "Card with that id was not found",
    COMMENT_TEXT_EMPTY: "Comment text cannot be empty",
    FNAME_LNAME_EMPTY: "First name or last name cannot be empty",
    FORBIDDEN: "You have no authorization to do this",
    INVALID_EMAIL_FORMAT: "Invalid Email address format",
    INVALID_PWORD_FORMAT:
        "Password should be 8-50 characters long and contain at least one special character and one number",
    INVALID_REQ_BODY: "One or more properties missing from the request body",
    INVALID_UNAME_PWORD: "Invalid username or password",
    PASSWORDS_NO_MATCH: "The provided passwords do not match",
    PROJECT_NOT_FOUND: "Project with that id was not found",
    SERVER_ERROR: "An unexpected error occurred while processing your request",
    TEAM_NOT_FOUND: "Team with that id was not found",
    USER_NOT_FOUND: "User with that id was not found",
    INVALID_TEAM_NAME:
        "name should be a non empty string with max length of 100 characters",
    INVALID_ADMIN: "admin should be a non empty string",
    INVALID_IS_PUBLIC: "isPublic should be a boolean",
    INVALID_EMAILS_ARRAY: "emails should be an array of strings",
    INVALID_CARD_TITLE:
        "title should be a non empty string with max length of 50 characters",
    INVALID_CREATION_DATE: "creationDate should a non empty string",
    INVALID_IN_COLUMN: "inColumn should a non empty string",
    INVALID_PROJECT_ID: "projectId should a non empty string",
    INVALID_ORDER_INDEX: "orderIndex should be a number",
};

export const formatUser = (userFromDB: IUserFromDB): IUser => ({
    id: userFromDB.id,
    firstName: userFromDB.first_name,
    lastName: userFromDB.last_name,
    accountCreationDate: userFromDB.account_creation_date,
    city: userFromDB.city,
    country: userFromDB.country,
    email: userFromDB.email,
    isOnline: userFromDB.is_online,
    isOpenToWork: userFromDB.is_open_to_work,
    jobPitch: userFromDB.job_pitch,
    lastOnline: userFromDB.last_online,
    linkedinUsername: userFromDB.linkedin_username,
    phoneNumber: userFromDB.phone_number,
    picture: userFromDB.picture,
});

export const formatProject = (projectFromDB: IProjectDB): IProject => ({
    id: projectFromDB.id,
    name: projectFromDB.name,
    description: projectFromDB.description,
    isPublic: projectFromDB.is_public,
    creationDate: projectFromDB.project_creation_date,
    endDate: projectFromDB.project_end_date,
    theme: projectFromDB.theme,
    picture: projectFromDB.picture,
});

export const formatFavoriteProject = (
    favProjectFromDB: IFavoriteProjectDB
): IFavoriteProject => ({
    favoriteProjectId: favProjectFromDB.favorite_project_id,
    id: favProjectFromDB.id,
    name: favProjectFromDB.name,
    description: favProjectFromDB.description,
    isPublic: favProjectFromDB.is_public,
    creationDate: favProjectFromDB.project_creation_date,
    endDate: favProjectFromDB.project_end_date,
    theme: favProjectFromDB.theme,
    picture: favProjectFromDB.picture,
});

export const formatProjectColumns = (
    columnsFromDB: IProjectColumnDB[] | undefined
) => {
    if (columnsFromDB) {
        const formattedColumns: IProjectColumn[] = columnsFromDB.map(
            (projectColumn) => {
                const formattedColumn = {
                    id: projectColumn.id,
                    projectId: projectColumn.project_id,
                    columnName: projectColumn.column_name,
                    orderIndex: projectColumn.order_index,
                };
                return formattedColumn;
            }
        );
        return formattedColumns;
    } else {
        return [];
    }
};

export const formatProjectCards = (cardsFromDB: ICardDB[] | undefined) => {
    if (cardsFromDB) {
        const formattedCards: ICard[] = cardsFromDB.map((card) => {
            const formattedCard = {
                id: card.id,
                projectId: card.project_id,
                title: card.title,
                subTitle: card.sub_title,
                description: card.description,
                status: card.status,
                creationDate: card.creation_date,
                dueDate: card.due_date,
                attachments: card.attachments,
                inColumn: card.in_column,
                orderIndex: card.order_index,
            };
            return formattedCard;
        });
        return formattedCards;
    } else {
        return [];
    }
};

export const formatProjectMembers = (
    membersFromDB: IProjectMemberDB[] | undefined
) => {
    if (membersFromDB) {
        const formattedProjectMembers = membersFromDB.map((member) => {
            const formattedMember = {
                id: member.id,
                firstName: member.first_name,
                lastName: member.last_name,
                email: member.email,
                picture: member.picture,
            };
            return formattedMember;
        });
        return formattedProjectMembers;
    } else {
        return [];
    }
};

export const formatTeam = (teamFromDB: ITeamDB): ITeam => ({
    admin: teamFromDB.admin,
    id: teamFromDB.id,
    isPublic: teamFromDB.is_public,
    name: teamFromDB.name,
});

export const formatProjectColumn = (
    projectColumnFromDB: IProjectColumnDB
): IProjectColumn => ({
    columnName: projectColumnFromDB.column_name,
    id: projectColumnFromDB.id,
    orderIndex: projectColumnFromDB.order_index,
    projectId: projectColumnFromDB.project_id,
});

export const formatCardComments = (
    cardComments: ICardCommentDB[] | ICardCommentDB
) => {
    const parameterIsArray = Array.isArray(cardComments);
    if (parameterIsArray) {
        const formattedCardComments = cardComments.map((cardComment) => ({
            id: cardComment.id,
            cardId: cardComment.card_id,
            author: cardComment.author,
            commentText: cardComment.comment_text,
            timeAdded: cardComment.time_added,
        }));
        return formattedCardComments;
    } else
        return {
            id: cardComments.id,
            cardId: cardComments.card_id,
            author: cardComments.author,
            commentText: cardComments.comment_text,
            timeAdded: cardComments.time_added,
        };
};

export const formatReaction = (reaction: IReactionDB): IReaction => ({
    id: reaction.id,
    userId: reaction.user_id,
    cardComment: reaction.card_comment,
    emoji: reaction.emoji,
});

export const formatCardResponsiblePersons = (
    membersFromDB: ICardResponsiblePersonDB[] | undefined
) => {
    if (membersFromDB) {
        const formattedCardResponsiblePersons = membersFromDB.map((member) => {
            const formattedMember = {
                cardResponsibleId: member.card_responsible_id,
                userId: member.user_id,
                firstName: member.first_name,
                lastName: member.last_name,
                email: member.email,
                picture: member.picture,
            };
            return formattedMember;
        });
        return formattedCardResponsiblePersons;
    } else {
        return [];
    }
};
