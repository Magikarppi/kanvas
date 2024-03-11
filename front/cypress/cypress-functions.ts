import { projectInfo, userLoginSignUp } from "./cypress-consts";

export const getCyData = (selector: string) => {
    return cy.get(`[data-cy="${selector}"]`);
};

export const signUp = () => {
    cy.visit("/sign-up");
    cy.get("[data-cy='first-name-input']").type(userLoginSignUp.firstName);
    cy.get("[data-cy='last-name-input']").type(userLoginSignUp.lastName);
    cy.get("[data-cy='email-input']").type(userLoginSignUp.email);
    cy.get("[data-cy='password-input']").type(userLoginSignUp.password);
    cy.get("[data-cy='confirm-password-input']").type(userLoginSignUp.password);
    cy.get("[data-cy='signup-submit']").click();
    cy.url().should("include", "/sign-in");
};

export const login = () => {
    cy.visit("sign-in");
    getCyData("email-input").type(userLoginSignUp.email);
    getCyData("password-input").type(userLoginSignUp.password);
    getCyData("login-button").click();
};

export const openAddProjectModal = () => {
    getCyData("open-add-project-modal-button").click();
};

export const openEditProjectModal = () => {
    getCyData("open-edit-project-modal-button").click();
};

export const addProject = () => {
    getCyData("project-name-input").type(projectInfo.name);
    getCyData("project-description-input").type(projectInfo.description);
    getCyData("project-end-date-input").clear().type("24/12/2030");

    getCyData("project-theme-input").click();
    getCyData("select-option-red").click();

    getCyData("project-is-public-checkbox").click();
    getCyData("project-submit-button").click();
};

const prefix = "data-rbd";
const dragHandle = (() => {
    const base = `${prefix}-drag-handle`;

    return {
        base,
        draggableId: `${base}-draggable-id`,
        contextId: `${base}-context-id`,
    };
})();

const draggable = (() => {
    const base = `${prefix}-draggable`;
    return {
        base,
        contextId: `${base}-context-id`,
        id: `${base}-id`,
    };
})();

const droppable = (() => {
    const base = `${prefix}-droppable`;
    return {
        base,
        contextId: `${base}-context-id`,
        id: `${base}-id`,
    };
})();

export function getDroppableSelector(droppableId?: string) {
    if (droppableId) {
        return `[${droppable.id}="${droppableId}"]`;
    }
    return `[${droppable.id}]`;
}

export function getHandleSelector(draggableId?: string) {
    if (draggableId) {
        return `[${dragHandle.draggableId}="${draggableId}"]`;
    }
    return `[${dragHandle.draggableId}]`;
}

export function getDraggableSelector(draggableId?: string) {
    if (draggableId) {
        return `[${draggable.id}="${draggableId}"]`;
    }
    return `[${draggable.id}]`;
}
