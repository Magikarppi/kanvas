import { userInfo } from "../cypress-consts";
import { getCyData } from "../cypress-functions";
import { emptyFieldHelperText } from "../../src/utils/helperMessages";

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
    getCyData("email-input").type(userInfo.email);
    getCyData("password-input").type(userInfo.password);
    getCyData("login-button").should("not.be.disabled");
    getCyData("login-button").click();

    cy.window().its("localStorage").invoke("getItem", "token").should("exist");
    cy.visit("profile");
});

describe("Open team modal", () => {
    it("open modal,correct values and show test team in dashboard", () => {
        cy.visit("/dashboard");
        cy.get("#openTeam").click();
        cy.contains("Create a New Team");
        cy.contains("Team name *");
        cy.get("[name=createTeam]").should("be.disabled");
        cy.get("input[name=\"teamName\"]").type("Test team name");
        cy.get("input[name=\"publicValue\"]").should("not.be.checked");
        cy.get("input[name=\"publicValue\"]").check().should("be.checked");
        cy.get("input[name=\"newEmailState\"]").type("test@test.com");
        cy.get("[name=createTeam]").should("not.be.disabled");
        cy.get("[name=iconButton]").click();
        cy.contains("test@test.com");
        cy.get("input[name=\"newEmailState\"]").type("test2@test2.com");
        cy.get("[name=iconButton]").click();
        cy.contains("test2@test2.com");
        cy.get("[name=createTeam]").click();
        cy.wait(1500);
        cy.contains("Test team name");
        cy.wait(1500);
    });

    it("open modal,error checks, delete email, close modal, show before created team", () => {
        cy.visit("/dashboard");
        cy.get("#openTeam").click();
        cy.contains("Create a New Team");
        cy.get("[name=iconButton]").should("not.exist");
        cy.get("input[name=\"teamName\"]").type(" {selectall} {backspace}");
        cy.get("input[name=\"publicValue\"]").should("not.be.checked");
        cy.get("input[name=\"publicValue\"]").check().should("be.checked");
        cy.contains(emptyFieldHelperText);
        cy.get("[name=createTeam]").should("be.disabled");
        cy.get("input[name=\"newEmailState\"]").type("Jotain@");
        cy.get("input[name=\"teamName\"]").type(" {selectall} {backspace}");
        cy.get("[name=iconButton]").should("not.exist");
        cy.get("input[name=\"newEmailState\"]").type("{selectall} {backspace}");
        cy.get("input[name=\"newEmailState\"]").type("Jotain@jotain.com");
        cy.get("[name=iconButton]").click();
        cy.contains("Jotain@jotain.com");
        cy.get("[name=iconDeleteButton]").click();
        cy.contains("Jotain@jotain.com").should("not.exist");
        cy.wait(1500);
        cy.get("[name=closeTeamModal]").click();
        cy.wait(1500);
        cy.visit("/dashboard");
        cy.contains("Test team name");
        cy.wait(1500);


    });
});