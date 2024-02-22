import {
    emptyFieldHelperText,
    maxLengthProjectDescriptionHelperText,
    maxLengthProjectNameHelperText,
} from "../../src/utils/helperMessages";
import { projectInfo } from "../cypress-consts";
import {
    addProject,
    getCyData,
    login,
    openAddProjectModal,
    openEditProjectModal,
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
    cy.url().should("contain", "/projects/");
});

describe("Edit project modal", () => {
    it("renders correctly and can be closed", () => {
        getCyData("edit-project-modal").should("not.exist");

        openEditProjectModal();

        getCyData("edit-project-modal").should("exist");
        getCyData("project-name-input")
            .find("input")
            .should("have.value", projectInfo.name);
        getCyData("project-description-input")
            .find("textarea")
            .should("have.value", projectInfo.description);
        getCyData("project-theme-input")
            .find("input")
            .should("have.value", projectInfo.theme);
        getCyData("project-is-public-checkbox")
            .find("input")
            .should("have.value", "on");
        getCyData("project-submit-button").should("exist");
        getCyData("project-close-button").should("not.be.disabled");

        getCyData("project-close-button").click();
        getCyData("add-project-modal").should("not.exist");
    });

    it("shows a error message for too long project name", () => {
        openEditProjectModal();
        getCyData("project-name-input")
            .clear()
            .type(Array.from({ length: 51 }, () => "o").join(""));
        getCyData("project-description-input").clear().type("D");
        cy.contains(maxLengthProjectNameHelperText);
        getCyData("project-submit-button").should("be.disabled");
    });

    it("shows a error message for too long project description", () => {
        openEditProjectModal();

        getCyData("project-description-input")
            .clear()
            .type(Array.from({ length: 501 }, () => "o").join(""));
        getCyData("project-name-input").type("D");
        cy.contains(maxLengthProjectDescriptionHelperText);
        getCyData("project-submit-button").should("be.disabled");
    });

    it("add button is disabled if project name is empty", () => {
        openEditProjectModal();

        getCyData("project-name-input").clear().type(" ");
        getCyData("project-description-input").type("D");
        cy.contains(emptyFieldHelperText);
        getCyData("project-submit-button").should("be.disabled");
    });

    it("allows user to edit a project name and members", () => {
        const newProjectName = `${projectInfo.name} 2`;
        const projectMemberEmail = "somemember@test.com";
        openEditProjectModal();

        getCyData("project-name-input").clear().type(newProjectName);
        getCyData("project-description-input").type(projectInfo.description);
        getCyData("project-end-date-input").clear().type("24/12/2030");
        getCyData("project-theme-input").click();
        getCyData("select-option-red").click();
        getCyData("project-is-public-checkbox").click();
        getCyData("add-project-member-input").type(projectMemberEmail);
        getCyData("add-project-member-button").click();
        cy.contains(projectMemberEmail);

        getCyData("project-submit-button").click();

        getCyData("edit-project-modal").should("not.exist");
        cy.contains(newProjectName);

        openEditProjectModal();
        getCyData("project-name-input")
            .find("input")
            .should("have.value", newProjectName);

        cy.contains(projectMemberEmail);
        getCyData(
            `project-member-email-${projectMemberEmail}-delete-button`
        ).click();
        cy.contains(projectMemberEmail).should("not.exist");
        getCyData("project-submit-button").click();
        openEditProjectModal();
        cy.contains(projectMemberEmail).should("not.exist");
    });
});
