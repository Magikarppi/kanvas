const getCyData = (selector: string) => {
    return cy.get(`[data-cy="${selector}"]`);
};

const testUser = {
    firstName: "Teppo",
    lastName: "Tester",
    email: `teppo${Math.floor(Math.random() * 10000000)}@tester.com`,
    password: "testitesti99%",
};

describe("Sign up + login", () => {
    it("Shows success toast on successful signup and redirects to /sign-in", () => {
        cy.visit("sign-up");

        getCyData("first-name-input").type(testUser.firstName);
        getCyData("last-name-input").type(testUser.lastName);
        getCyData("email-input").type(testUser.email);
        getCyData("password-input").type(testUser.password);
        getCyData("confirm-password-input").type(testUser.password);
        getCyData("signup-submit").should("not.be.disabled");
        getCyData("signup-submit").click();

        cy.url().should("contain", "/sign-in");
        cy.contains("User registered");
    });

    it("Should login user and return to home page after logout", () => {
        cy.visit("sign-in");

        getCyData("login-button").should("be.disabled");
        getCyData("email-login-input").type(testUser.email);
        getCyData("password-login-input").type(testUser.password);
        getCyData("login-button").should("not.be.disabled");
        getCyData("login-button").click();

        cy.window()
            .its("localStorage")
            .invoke("getItem", "token")
            .should("exist");

        cy.contains(/Welcome/i);
        cy.wait(6700);
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