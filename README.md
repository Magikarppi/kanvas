# Kanvas

Kanvas is a project management tool from individuals to small and medium-sized companies. With Kanvas, users can seamlessly organize, monitor and lead their projects using modern, visually appealing and easy to use UI. Kanvas helps you and your team to split complex projects into manageable pieces. Kanvas – complex made simple!

At the core of Kanvas is a handy Kanban board that enables users to easily create columns (or lists) and cards (or tasks) and drag and drop them smoothly on the board. In addition to the traditional Kanban-like board, projects can be managed in a list view that offers users a different way to access project tasks arranged in tables, for example in situations where there are dozens of cards in a project.

In addition to project management features, Kanvas offers several features that extend upon other available tools such as Trello. For example, Kanvas has features for truly public projects that can be viewed by every registered user, encouraging collaboration on for example open source software projects. In the future, Kanvas could support many other interesting features, such as job searching, messaging, visualization of project data and so forth.

## Initial project setup

To start the project, you should have the following software:

-   [Node.js](https://nodejs.org/en)
-   [Git](https://git-scm.com/)
-   [Docker (Desktop)](https://www.docker.com/products/docker-desktop/)
-   Code editor e.g., [VS Code](https://code.visualstudio.com/)

If you do not have the above software in you machine, install them first.

In addition, to be able to use the project functionality related to Microsoft Azure you need to have a Microsoft Azure account with an active subscription. Inside an Azure resource group, you need to create a [storage account](https://learn.microsoft.com/en-us/azure/storage/common/storage-account-create?toc=%2Fazure%2Fstorage%2Fblobs%2Ftoc.json&tabs=azure-portal), and inside the storage account, you need to create a container where the user and project images of Kanvas will eventually be stored.

After this set up, follow the startup instructions in the readme files inside the /front and /back folders of this project.

## Images

Front page for unlogged users

![Non-login frontpage of Kanvas](/kanvas-project-images/kanvas-front-page.png)

Dashboard showing user's favorites projects, all user's projects, user's teams and public projects

![User dashboard](/kanvas-project-images/kanvas-dashboard.png)

User profile page

![User profile page](/kanvas-project-images/kanvas-user-profile-page.png)

Modal for creating a project

![Modal for creating a new project](/kanvas-project-images/kanvas-create-project-modal.png)

Project page with Kanban board (columns and cards)

![Kanbard board showing columns and cards belonging to a single project](/kanvas-project-images/kanvas-kanban-board.png)

