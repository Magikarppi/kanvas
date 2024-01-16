import {
    emptyFieldHelperText,
    invalidEmailHelperText,
    passwordsNoMatchHelperText,
    validPasswordHelperText,
} from "../../src/utils/helperMessages";
import { userLoginSignUp } from "../cypress-consts";

beforeEach(() => {
    cy.visit("/sign-up");
});

describe("When user signs up successfully", () => {
    it("shows success message and redirects to /sign-in", () => {
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
    });
});

describe("When user tries to sign up with email that is already in use", () => {
    it("shows message that email already exists", () => {
        cy.get("[data-cy='first-name-input']").type(userLoginSignUp.firstName);
        cy.get("[data-cy='last-name-input']").type(userLoginSignUp.lastName);
        cy.get("[data-cy='email-input']").type(userLoginSignUp.email);
        cy.get("[data-cy='password-input']").type(userLoginSignUp.password);
        cy.get("[data-cy='confirm-password-input']").type(
            userLoginSignUp.password
        );
        cy.get("[data-cy='signup-submit']").should("not.be.disabled");
        cy.get("[data-cy='signup-submit']").click();

        cy.visit("/sign-up");
        cy.get("[data-cy='first-name-input']").type(userLoginSignUp.firstName);
        cy.get("[data-cy='last-name-input']").type(userLoginSignUp.lastName);
        cy.get("[data-cy='email-input']").type(userLoginSignUp.email);
        cy.get("[data-cy='password-input']").type(userLoginSignUp.password);
        cy.get("[data-cy='confirm-password-input']").type(
            userLoginSignUp.password
        );
        cy.get("[data-cy='signup-submit']").click();

        cy.url().should("contain", "/sign-up");
        cy.contains("email already exists");
    });
});

describe("When user tries to sign up with invalid email", () => {
    it("shows a message that email is invalid and submit button is disabled", () => {
        cy.get("[data-cy='email-input']").type("invalidemail@invalid.");
        cy.get("[data-cy='first-name-input']").type(userLoginSignUp.firstName);

        cy.contains(invalidEmailHelperText);
        cy.get("[data-cy='signup-submit']").should("be.disabled");
    });
});

describe("When user tries to sign up without first name", () => {
    it("shows a message that field needs to be filled out and submit button is disabled", () => {
        cy.get("[data-cy='first-name-input']").type("   ");
        cy.get("[data-cy='email-input']").type(userLoginSignUp.email);

        cy.contains(emptyFieldHelperText);
        cy.get("[data-cy='signup-submit']").should("be.disabled");
    });
});

describe("When user tries to sign up without last name", () => {
    it("shows a message that field needs to be filled out and submit button is disabled", () => {
        cy.get("[data-cy='last-name-input']").type("   ");
        cy.get("[data-cy='email-input']").type(userLoginSignUp.email);

        cy.contains(emptyFieldHelperText);
        cy.get("[data-cy='signup-submit']").should("be.disabled");
    });
});

describe("When user inputs password that is missing special characters", () => {
    it("password input shows helper text and submit button is disabled", () => {
        cy.get("[data-cy='first-name-input']").type(userLoginSignUp.firstName);
        cy.get("[data-cy='last-name-input']").type(userLoginSignUp.lastName);
        cy.get("[data-cy='email-input']").type(userLoginSignUp.email);
        cy.get("[data-cy='password-input']").type("invalidpassword");
        cy.get("[data-cy='confirm-password-input']").type("invalidpassword");
        cy.get("[data-cy='last-name-input']").type(userLoginSignUp.lastName);

        cy.contains(validPasswordHelperText);
        cy.get("[data-cy='signup-submit']").should("be.disabled");
    });
});

describe("When user inputs password that is missing alphabetical characters", () => {
    it("password input shows helper text and submit button is disabled", () => {
        cy.get("[data-cy='first-name-input']").type(userLoginSignUp.firstName);
        cy.get("[data-cy='last-name-input']").type(userLoginSignUp.lastName);
        cy.get("[data-cy='email-input']").type(userLoginSignUp.email);
        cy.get("[data-cy='password-input']").type("12345678!");
        cy.get("[data-cy='confirm-password-input']").type("12345678!");
        cy.get("[data-cy='last-name-input']").type(userLoginSignUp.lastName);

        cy.contains(validPasswordHelperText);
        cy.get("[data-cy='signup-submit']").should("be.disabled");
    });
});

describe("When user inputs password that is too short (less than 8)", () => {
    it("password input shows helper text and submit button is disabled", () => {
        cy.get("[data-cy='first-name-input']").type(userLoginSignUp.firstName);
        cy.get("[data-cy='last-name-input']").type(userLoginSignUp.lastName);
        cy.get("[data-cy='email-input']").type(userLoginSignUp.email);
        cy.get("[data-cy='password-input']").type("1234YR!");
        cy.get("[data-cy='confirm-password-input']").type("1234YR!");
        cy.get("[data-cy='last-name-input']").type(userLoginSignUp.lastName);

        cy.contains(validPasswordHelperText);
        cy.get("[data-cy='signup-submit']").should("be.disabled");
    });
});

describe("When user inputs password that is too long (more than 50)", () => {
    it("password input shows helper text and submit button is disabled", () => {
        cy.get("[data-cy='first-name-input']").type(userLoginSignUp.firstName);
        cy.get("[data-cy='last-name-input']").type(userLoginSignUp.lastName);
        cy.get("[data-cy='email-input']").type(userLoginSignUp.email);
        cy.get("[data-cy='password-input']").type(
            "This is a string that is 51 chars long!!!!!!!-----!"
        );
        cy.get("[data-cy='last-name-input']").type(userLoginSignUp.lastName);

        cy.contains(validPasswordHelperText);
        cy.get("[data-cy='signup-submit']").should("be.disabled");
    });
});

describe("When user inputs passwords that don't match", () => {
    it("password input shows helper text and submit button is disabled", () => {
        cy.get("[data-cy='first-name-input']").type(userLoginSignUp.firstName);
        cy.get("[data-cy='last-name-input']").type(userLoginSignUp.lastName);
        cy.get("[data-cy='email-input']").type(userLoginSignUp.email);
        cy.get("[data-cy='password-input']").type(userLoginSignUp.password);
        cy.get("[data-cy='confirm-password-input']").type("invalidpassword");
        cy.get("[data-cy='last-name-input']").type(userLoginSignUp.lastName);

        cy.contains(passwordsNoMatchHelperText);
        cy.get("[data-cy='signup-submit']").should("be.disabled");
    });
});
