import {
    getCyData,
} from "../cypress-functions";
import { userLoginSignUp } from "../cypress-consts";

beforeEach(() => {
    cy.visit("/sign-in");
});

describe("Sign in", () => {
    it("Sign in is possible with valid email and password", () => {
        //valid username or password
        cy.visit("/sign-up");
        cy.get("[data-cy='first-name-input']").type(userLoginSignUp.firstName);
        cy.get("[data-cy='last-name-input']").type(userLoginSignUp.lastName);
        cy.get("[data-cy='email-input']").type(userLoginSignUp.email);
        cy.get("[data-cy='password-input']").type(userLoginSignUp.password);
        cy.get("[data-cy='confirm-password-input']").type(
            userLoginSignUp.password
        );
        cy.get("[data-cy='signup-submit']").should("not.be.disabled");
        cy.get("[data-cy='signup-submit']").click();
        cy.url().should("contain", "/sign-in");
        cy.contains("User registered");
        getCyData("password-input").type(userLoginSignUp.password);
        getCyData("email-input").type(userLoginSignUp.email);
        getCyData("login-button").click();
        cy.contains("Invalid username or password").should("not.exist");
        cy.url().should("contain", "/dashboard");
        
    });

    it("Sign in is not possible with invalid email and password", () => {
        //Invalid username or password
        getCyData("password-input").type("invalidsalis1902%");
        getCyData("email-input").type("testisapo@gmail.com");
        getCyData("login-button").click();
        cy.contains("Invalid username or password");
    });
});
