import {
    emptyFieldHelperText,
    invalidEmailHelperText,
} from "../../src/utils/helperMessages";
import { userInfo } from "../cypress-consts";
import { getCyData } from "../cypress-functions";

before(() => {
    cy.visit("sign-up");

    getCyData("first-name-input").type(userInfo.firstName);
    getCyData("last-name-input").type(userInfo.lastName);
    getCyData("email-input").type(userInfo.email);
    getCyData("password-input").type(userInfo.password);
    getCyData("confirm-password-input").type(userInfo.password);
    getCyData("signup-submit").should("not.be.disabled");
    getCyData("signup-submit").click();

    cy.url().should("contain", "/sign-in");
    cy.contains("User registered");
});

beforeEach(() => {
    cy.visit("sign-in");

    getCyData("login-button").should("be.disabled");
    getCyData("email-login-input").type(userInfo.email);
    getCyData("password-login-input").type(userInfo.password);
    getCyData("login-button").should("not.be.disabled");
    getCyData("login-button").click();

    cy.window().its("localStorage").invoke("getItem", "token").should("exist");
    cy.visit("profile");
});

describe("Profilepage shows firstname, lastname and email", () => {
    it("firstName, lastName and email correct values", () => {
        cy.wait(1500);
        cy.get("#firstName").should("have.value", userInfo.firstName);
        cy.get("#lastName").should("have.value", userInfo.lastName);
        cy.get("#email").should("have.value", userInfo.email);
        cy.wait(1500);
        getCyData("update-button").should("not.be.disabled");
    });
});

describe("When user tries update with invalid email", () => {
    it("shows a message that email is invalid and button is disabled", () => {
        getCyData("email-input").type(" {selectall} {backspace}");
        getCyData("email-input").type("jotain@sadsdads.");
        getCyData("phone-input").type(" {selectall} {backspace}");
        getCyData("phone-input").type(userInfo.phoneNumber);

        cy.contains(invalidEmailHelperText);
        getCyData("update-button").should("be.disabled");
    });
});

describe("When user update all values successfully", () => {
    it("empty all inputs ,fill and save", () => {
        getCyData("update-button").should("not.be.disabled");
        getCyData("firstName-input").type(" {selectall} {backspace}");
        getCyData("firstName-input").type(userInfo.firstName);
        cy.wait(500);
        getCyData("lastName-input").type(" {selectall} {backspace}");
        getCyData("lastName-input").type(userInfo.lastName);
        cy.wait(500);
        getCyData("email-input").type(" {selectall} {backspace}");
        getCyData("email-input").type(userInfo.email);
        cy.wait(500);
        getCyData("phone-input").type(userInfo.phoneNumber);
        getCyData("country-input").type(userInfo.country);
        getCyData("city-input").type(userInfo.city);
        getCyData("linkedin-input").type(userInfo.linkedinUsername);
        getCyData("jobPitch-input").type(userInfo.jobPitch);
        cy.get("#isOpenToWork").uncheck().should("not.be.checked");
        cy.get("#isOpenToWork").check().should("be.checked");

        cy.wait(1500);
        getCyData("update-button").click();
        getCyData("update-button").should("not.be.disabled");
        cy.contains("Profile successfully");
    });
});

describe("Visit another pages", () => {
    it("Inputs not be empty", () => {
        cy.visit("projects");
        cy.wait(1500);

        cy.visit("profile");
        getCyData("firstName-input").should("not.be.empty");
        getCyData("lastName-input").should("not.be.empty");
        getCyData("email-input").should("not.be.empty");
        getCyData("phone-input").should("not.be.empty");
        getCyData("country-input").should("not.be.empty");
        getCyData("city-input").should("not.be.empty");
        getCyData("linkedin-input").should("not.be.empty");
        getCyData("jobPitch-input").should("not.be.disabled");
        getCyData("update-button").should("not.be.disabled");
        cy.get("#isOpenToWork").should("be.checked");

        cy.visit("teams");
        cy.wait(1500);

        cy.visit("profile");
        cy.wait(1500);
        getCyData("firstName-input").should("not.be.empty");
        getCyData("lastName-input").should("not.be.empty");
        getCyData("email-input").should("not.be.empty");
        getCyData("phone-input").should("not.be.empty");
        getCyData("country-input").should("not.be.empty");
        getCyData("city-input").should("not.be.empty");
        getCyData("linkedin-input").should("not.be.empty");
        getCyData("jobPitch-input").should("not.be.disabled");
        getCyData("update-button").should("not.be.disabled");
        cy.get("#isOpenToWork").should("be.checked");
    });
});

describe("Show error messages", () => {
    it("shows a message that field needs to be filled out and update button is disabled", () => {
        cy.visit("profile");
        getCyData("firstName-input").type(" {selectall} {backspace}");
        getCyData("firstName-input").type(userInfo.firstName);
        getCyData("firstName-input").type(" {selectall} {backspace}");
        getCyData("lastName-input").type(" {selectall} {backspace}");
        cy.contains(emptyFieldHelperText);

        getCyData("lastName-input").type(userInfo.lastName);
        getCyData("lastName-input").type(" {selectall} {backspace}");
        getCyData("email-input").type(" {selectall} {backspace}");
        cy.contains(emptyFieldHelperText);

        getCyData("email-input").type(userInfo.email);
        getCyData("email-input").type(" {selectall} {backspace}");
        getCyData("phone-input").type(" {selectall} {backspace}");
        cy.get("[data-cy='phone-input']").type(userInfo.phoneNumber);
        cy.contains(emptyFieldHelperText);

        getCyData("update-button").should("be.disabled");
    });
});
