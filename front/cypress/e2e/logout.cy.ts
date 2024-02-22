import { userLoginSignUp } from "../cypress-consts";
import { getCyData } from "../cypress-functions";

describe("Sign up + login", () => {
    it("Shows success toast on successful signup and redirects to /sign-in", () => {
        cy.visit("sign-up");

        getCyData("first-name-input").type(userLoginSignUp.firstName);
        getCyData("last-name-input").type(userLoginSignUp.lastName);
        getCyData("email-input").type(userLoginSignUp.email);
        getCyData("password-input").type(userLoginSignUp.password);
        getCyData("confirm-password-input").type(userLoginSignUp.password);
        getCyData("signup-submit").should("not.be.disabled");
        getCyData("signup-submit").click();

        cy.url().should("contain", "/sign-in");
        cy.contains("User registered");
    });

    it("Should login user and return to home page after logout", () => {
        cy.visit("sign-in");

        getCyData("login-button").should("be.disabled");
        getCyData("email-input").type(userLoginSignUp.email);
        getCyData("password-input").type(userLoginSignUp.password);
        getCyData("login-button").should("not.be.disabled");
        getCyData("login-button").click();

        cy.window()
            .its("localStorage")
            .invoke("getItem", "token")
            .should("exist");

        cy.contains(/My projects/i);
        cy.get("[data-testid='MenuIcon']").click();
        cy.wait(500);
        getCyData("sign-out-drawer").click();

        cy.contains(/The ultimate project management tool/i);
        cy.url().should("contain", "/");

        cy.window()
            .its("localStorage")
            .invoke("getItem", "token")
            .should("not.exist");
    });
});
