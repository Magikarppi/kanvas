import { userLoginSignUp } from "./cypress-consts";

export const getCyData = (selector: string) => {
    return cy.get(`[data-cy="${selector}"]`);
};

export const signUp = () => {
    cy.get("[data-cy='first-name-input']").type(userLoginSignUp.firstName);
    cy.get("[data-cy='last-name-input']").type(userLoginSignUp.lastName);
    cy.get("[data-cy='email-input']").type(userLoginSignUp.email);
    cy.get("[data-cy='password-input']").type(userLoginSignUp.password);
    cy.get("[data-cy='confirm-password-input']").type(userLoginSignUp.password);
    cy.get("[data-cy='signup-submit']").click();
};

export const login = () => {
    getCyData("email-login-input").type(userLoginSignUp.email);
    getCyData("password-login-input").type(userLoginSignUp.password);
    getCyData("login-button").click();
};
