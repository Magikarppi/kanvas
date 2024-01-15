import {
    emptyFieldHelperText,
    invalidEmailHelperText,
} from "../../src/utils/helperMessages";


const getData= (selector: string) => {
    return cy.get(`[data-cy="${selector}"]`);
};

const user = {
    firstName: "cypress",
    lastName: "test",
    email: `cypress${Math.floor(Math.random() * 10000000)}@tester.com`,
    phoneNumber:"0503180221",
    country:"Suomi",
    city: "Pori",
    picture: "",
    isOpenToWork: false,
    linkedinUsername: "linkkaria",
    jobPitch: "Ryömies",
    password: "cypresstest123!",
};

before(() => {
    cy.visit("sign-up");

    getData("first-name-input").type(user.firstName);
    getData("last-name-input").type(user.lastName);
    getData("email-input").type(user.email);
    getData("password-input").type(user.password);
    getData("confirm-password-input").type(user.password);
    getData("signup-submit").should("not.be.disabled");
    getData("signup-submit").click();

    cy.url().should("contain", "/sign-in");
    cy.contains("User registered");
});

beforeEach(() => {
    cy.visit("sign-in");

    getData("login-button").should("be.disabled");
    getData("email-login-input").type(user.email);
    getData("password-login-input").type(user.password);
    getData("login-button").should("not.be.disabled");
    getData("login-button").click();

    cy.window()
        .its("localStorage")
        .invoke("getItem", "token")
        .should("exist");
    cy.visit("profile");
    
});

describe("Profilepage shows firstname, lastname and email", () => {
    it("firstName, lastName and email correct values", () => {
        cy.wait(1500);
        cy.get("#firstName").should("have.value", user.firstName);
        cy.get("#lastName").should("have.value", user.lastName);
        cy.get("#email").should("have.value", user.email);
        cy.wait(1500);
        getData("update-button").should("not.be.disabled");
    });
});

describe("When user tries update with invalid email", () => {
    it("shows a message that email is invalid and button is disabled", () => {
        getData("email-input").type(" {selectall} {backspace}");
        getData("email-input").type("jotain@sadsdads.");
        getData("phone-input").type(" {selectall} {backspace}");
        getData("phone-input").type(user.phoneNumber);

        cy.contains(invalidEmailHelperText);
        getData("update-button").should("be.disabled");
    });
});

describe("When user update all values successfully", () => {
    it("empty all inputs ,fill and save", () => {
        getData("update-button").should("not.be.disabled");
        getData("firstName-input").type(" {selectall} {backspace}");
        getData("firstName-input").type(user.firstName);
        cy.wait(500);
        getData("lastName-input").type(" {selectall} {backspace}");
        getData("lastName-input").type(user.lastName);
        cy.wait(500);
        getData("email-input").type(" {selectall} {backspace}");
        getData("email-input").type(user.email);
        cy.wait(500);
        getData("phone-input").type(user.phoneNumber);
        getData("country-input").type(user.country);
        getData("city-input").type(user.city);
        getData("linkedin-input").type(user.linkedinUsername);
        getData("jobPitch-input").type(user.jobPitch);
        cy.get("#isOpenToWork").uncheck().should("not.be.checked");
        cy.get("#isOpenToWork").check().should("be.checked");
        
        cy.wait(1500);
        getData("update-button").click();
        getData("update-button").should("not.be.disabled");
        cy.contains("Profile successfully");
    });
});

describe("Visit another pages", () => {
    it("Inputs not be empty", () => {
        cy.visit("projects");
        cy.wait(1500);

        cy.visit("profile");
        getData("firstName-input").should("not.be.empty");
        getData("lastName-input").should("not.be.empty");
        getData("email-input").should("not.be.empty");
        getData("phone-input").should("not.be.empty");
        getData("country-input").should("not.be.empty");
        getData("city-input").should("not.be.empty");
        getData("linkedin-input").should("not.be.empty");
        getData("jobPitch-input").should("not.be.disabled");
        getData("update-button").should("not.be.disabled");
        cy.get("#isOpenToWork").should("be.checked");

        cy.visit("teams");
        cy.wait(1500);

        cy.visit("profile");
        cy.wait(1500);
        getData("firstName-input").should("not.be.empty");
        getData("lastName-input").should("not.be.empty");
        getData("email-input").should("not.be.empty");
        getData("phone-input").should("not.be.empty");
        getData("country-input").should("not.be.empty");
        getData("city-input").should("not.be.empty");
        getData("linkedin-input").should("not.be.empty");
        getData("jobPitch-input").should("not.be.disabled");
        getData("update-button").should("not.be.disabled");
        cy.get("#isOpenToWork").should("be.checked");
    });
});

describe("Show error messages", () => {
    it("shows a message that field needs to be filled out and update button is disabled", () => {
        cy.visit("profile");
        getData("firstName-input").type(" {selectall} {backspace}");
        getData("firstName-input").type(user.firstName);
        getData("firstName-input").type(" {selectall} {backspace}");
        getData("lastName-input").type(" {selectall} {backspace}");
        cy.contains(emptyFieldHelperText);

        getData("lastName-input").type(user.lastName);
        getData("lastName-input").type(" {selectall} {backspace}");
        getData("email-input").type(" {selectall} {backspace}");
        cy.contains(emptyFieldHelperText);

        getData("email-input").type(user.email);
        getData("email-input").type(" {selectall} {backspace}");
        getData("phone-input").type(" {selectall} {backspace}");
        cy.get("[data-cy='phone-input']").type(user.phoneNumber);
        cy.contains(emptyFieldHelperText);

        getData("update-button").should("be.disabled");
    });
});