import { cardInfo, projectInfo } from "../cypress-consts";
import {
    addProject,
    getCyData,
    getDroppableSelector,
    getHandleSelector,
    login,
    openAddProjectModal,
    signUp,
} from "../cypress-functions";

before(() => {
    signUp();
});
beforeEach(() => {
    login();
    openAddProjectModal();
    addProject();
    cy.contains(projectInfo.name).click();
});

describe("cards and columns", () => {
    it("a new card can be added, moved and deleted", () => {
        // add card
        getCyData("add-card-modal").should("not.exist");

        getCyData("show-grid-button").click();

        getCyData("column-menu-button").first().click();
        getCyData("open-add-card-modal-button").click();
        getCyData("add-card-modal").should("exist");

        getCyData("add-card-modal-title-input").type(cardInfo.title);
        getCyData("add-card-modal-submit-button").click();
        getCyData("add-card-modal").should("not.exist");
        cy.contains(cardInfo.title);

        // move card from the first column to the second
        cy.get(getDroppableSelector())
            .eq(1)
            .as("first-list")
            .should("contain", cardInfo.title);

        cy.get(getDroppableSelector())
            .eq(2)
            .as("second-list")
            .should("not.contain", cardInfo.title);

        cy.get("@first-list")
            .find(getHandleSelector())
            .first()
            .should("contain", cardInfo.title)
            .focus()
            .trigger("keydown", { keyCode: 32 })
            .trigger("keydown", { keyCode: 39, force: true })
            .trigger("keydown", { keyCode: 32, force: true });

        cy.get("@first-list").should("not.contain", cardInfo.title);

        cy.get("@second-list").should("contain", cardInfo.title);

        // delete card
        cy.contains(cardInfo.title).click();
        getCyData("edit-card-modal").should("exist");

        getCyData("edit-card-delete-card-button").click();
        getCyData("card-delete-modal").should("exist");
        getCyData("card-delete-modal-delete-button").click();
        getCyData("edit-card-modal").should("not.exist");

        cy.contains(cardInfo.title).should("not.exist");
    });

    it("a new column can be added, renamed and deleted", () => {
        // add column
        const columnName = "testikolumni";
        getCyData("add-new-column-button").click();
        getCyData("add-new-column-input").type(columnName);
        getCyData("add-new-column-button").click();
        cy.contains(columnName);

        // rename column
        const newColumnName = "testikolumni2";
        getCyData("column-menu-button").last().click();
        getCyData("rename-column-button").click();
        getCyData("rename-column-input").clear().type(newColumnName);
        getCyData("rename-column-input-submit-button").click();
        cy.contains(columnName).should("not.exist");
        cy.contains(newColumnName);

        // delete column
        getCyData("column-menu-button").last().click();
        getCyData("delete-column-button").click();
        getCyData("delete-column-confirmation-input").type(newColumnName);
        getCyData("delete-column-confirmation-delete-button").click();
        cy.contains(newColumnName).should("not.exist");
    });
});
