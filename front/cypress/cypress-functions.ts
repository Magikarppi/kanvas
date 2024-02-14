import { userLoginSignUp } from "./cypress-consts";

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
