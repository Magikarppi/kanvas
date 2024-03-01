import {
    emptyFieldHelperText,
    maxLengthProjectDescriptionHelperText,
    maxLengthProjectNameHelperText,
} from "../../src/utils/helperMessages";
import { projectInfo } from "../cypress-consts";
import {
    getCyData,
    login,
    openAddProjectModal,
    signUp,
} from "../cypress-functions";

before(() => {
    signUp();
});
beforeEach(() => {
    login();
});

describe("Add project modal", () => {
    it("renders correctly", () => {
        // initially closed
        getCyData("add-project-modal").should("not.exist");

        openAddProjectModal();

        getCyData("add-project-modal").should("exist");
        getCyData("project-name-input").should("exist");
        getCyData("project-description-input").should("exist");
        getCyData("project-end-date-input").should("exist");
        getCyData("project-theme-input").should("exist");
        getCyData("project-is-public-checkbox").should("exist");
        getCyData("add-project-member-input").should("exist");
        getCyData("project-submit-button").should("exist");
        getCyData("project-submit-button").should("be.disabled");
        getCyData("project-close-button").should("not.be.disabled");
    });

    it("can be closed and inputs are cleared", () => {
        openAddProjectModal();

        getCyData("project-name-input").type(projectInfo.name);
        getCyData("project-description-input").type(projectInfo.description);
        getCyData("project-close-button").click();
        getCyData("add-project-modal").should("not.exist");
        openAddProjectModal();

        getCyData("project-name-input").should("have.value", "");
        getCyData("project-description-input").should("have.value", "");
    });

    it("shows a error message for too long project name", () => {
        openAddProjectModal();
        getCyData("project-name-input").type(
            Array.from({ length: 51 }, () => "o").join("")
        );
        getCyData("project-description-input").type("D");
        cy.contains(maxLengthProjectNameHelperText);
        getCyData("project-submit-button").should("be.disabled");
    });

    it("shows a error message for too long project description", () => {
        openAddProjectModal();

        getCyData("project-description-input").type(
            Array.from({ length: 501 }, () => "o").join("")
        );
        getCyData("project-name-input").type("D");
        cy.contains(maxLengthProjectDescriptionHelperText);
        getCyData("project-submit-button").should("be.disabled");
    });

    it("add button is disabled if project name is empty", () => {
        openAddProjectModal();

        getCyData("project-submit-button").should("be.disabled");
        getCyData("project-name-input").type(" ");
        getCyData("project-description-input").type("D");
        cy.contains(emptyFieldHelperText);
        getCyData("project-submit-button").should("be.disabled");
    });

    it("allows user to add a project with valid info", () => {
        const projectMemberEmail = "projectmember@test.com";
        openAddProjectModal();

        getCyData("project-name-input").type(projectInfo.name);
        getCyData("project-description-input").type(projectInfo.description);
        cy.wait(1500);
        cy.get("#endDate").click();
        cy.wait(1500);
        cy.get(".react-datepicker__navigation--next").click().click().click().click();
        cy.wait(1500);
        cy.contains("15").click();
        cy.wait(1500);  
        getCyData("project-theme-input").click();
        getCyData("select-option-red").click();
        getCyData("project-is-public-checkbox").click();
        getCyData("add-project-member-input").type(projectMemberEmail);
        getCyData("add-project-member-button").click();
        cy.contains(projectMemberEmail);


        getCyData("project-submit-button").click();

        getCyData("add-project-modal").should("not.exist");
        cy.contains(projectInfo.name);
    });
});
