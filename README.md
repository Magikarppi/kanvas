# Kanvas

Kanvas is a project management tool from individuals to small and medium-sized companies. With Kanvas, users can seamlessly organize, monitor and lead their projects using modern, visually appealing and easy to use UI. Kanvas helps you and your team to split complex projects into manageable pieces. Kanvas – complex made simple!

At the core of Kanvas is a handy Kanban board that enables users to easily create columns (or lists) and cards (or tasks) and drag and drop them smoothly on the board. In addition to the traditional Kanban-like board, projects can be managed in a list view that offers users a different way to access project tasks arranged in tables, for example in situations where there are dozens of cards in a project.

In addition to project management features, Kanvas offers several features that extend upon other available tools such as Trello. For example, Kanvas has features for truly public projects that can be viewed by every registered user, encouraging collaboration on for example open source software projects. In the future, Kanvas will support many other interesting features, such as job searching, messaging, visualization of project data and so forth.

## 1. Starting the project

To start the project, you should install the following software

-   [Node.js](https://nodejs.org/en)
-   [Git](https://git-scm.com/)
-   [Docker (Desktop)](https://www.docker.com/products/docker-desktop/)
-   Code editor e.g., [VS Code](https://code.visualstudio.com/)



## 2. Frontend

### 2.1 Frontend technologies and their applications

**React with TypeScript**

Kanvas’ user interface was implemented using React’s version 18.2. To ensure type safety and code reliability, we used TypeScript.

When implementing front end code few notable libraries should be mentioned:

-   [Material UI](https://mui.com/) was used to implement most of the UI’s elements
-   [React Router](https://reactrouter.com/en/main) was used in page routing
-   [axios](https://axios-http.com/) was used to send HTTP requests to server
-   [Redux](https://redux.js.org/) was used for global state management
-   [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd) was used to implement Kanban board with drag and drop features

### 2.2 Frontend environment variables

The following variable should be added to .env file at the root level of the /front folder:

| Environment variable | Description                           | Example value           |
| -------------------- | ------------------------------------- | ----------------------- |
| `REACT_APP_BASE_URL` | Base server url and port for the site | `http://localhost:3000` |

### 2.3 Frontend startup instructions

1. Navigate to frontend with `cd front`.

2. Run `npm install` to install frontend dependencies.

3. Run `npm start` to start the development server.

## 3. Backend

### 3.1 Backend technologies and their applications

**TypeScript**

Our server code is implemented using node.js and TypeScript. Project’s endpoints with RESTful APIs are implemented using the [express framework](https://expressjs.com/). Various other packages are used in the server logic, such as [uuid](https://www.npmjs.com/package/uuid) for creating unique identifiers for users and projects, [nodemailer](https://www.nodemailer.com/) for sending reset password links via email and [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) for creating tokens.

**PostgreSQL**

Kanvas’ database is implemented in PostgreSQL. The database consists of total 17 tables, two of which are base tables (in this case, tables with no foreign key constraints) and 15 of which are dependent tables (i.e., tables with foreign key constraints).

Base tables:

| Table name | Description  | Columns (NN = not null)                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ---------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `projects` | project data | id (uuid) NN <br> name (varchar 50) NN <br> description (varchar 500) <br> is_public (boolean) NN <br> project_creation_date (timestamp) NN <br> project_end_date (timestamp)<br> theme (varchar 50) <br> picture (text)                                                                                                                                                                                                                   |
| `users`    | user data    | id (uuid) NN <br> first_name (varchar) NN <br> last_name (varchar) NN <br> email (varchar) NN <br> password_hash (varchar 255) NN <br> phone_number (varchar 20) <br> country (varchar 100) <br> city (varchar 100) <br> picture (text) <br> account_creation_date (timestamp) NN <br> is_online (boolean) NN <br> last_online (timestamp) <br> is_open_to_work (boolean) <br> linkedin_username (varchar 29) <br> job_pitch (varchar 500) |

Dependent tables:
| Table name | Description | Columns (NN = not null) |
|-|-|-|
| `card_comments` | comment data in kanban cards | id (uuid) NN <br>card_id (uuid) NN <br>author (uuid) NN <br>comment_text (varchar) NN <br>time_added (timestamp) NN |
| `card_keywords` | keywords assigned to a card | keyword_id (uuid) NN <br> card_id (uuid) NN |
| `card_responsible_persons` | responsible persons assigned to a card | id (uuid) NN <br> user_id (uuid) NN <br> card_id (uuid) NN |
| `cards` | cards (tasks) that belong to column in Kanban board | id (uuid) NN <br>project_id (uuid) NN <br>title (varchar 50) NN <br>sub_title (varchar) <br>description (text) <br>status (varchar) <br>creation_date (timestamp) NN <br>due_date (timestamp) <br>attachments (text) <br>in_column (uuid) NN <br>order_index (integer) NN <br> |
|`favorite_projects`| favorite projects of a user | id (uuid) NN <br> project_id (uuid) NN <br> user_id (uuid) NN |
|`keywords`| keywords (labels) used in cards and projects | id (uuid) NN <br> keyword (varchar 100) NN <br> color (varchar 10) |
|`project_columns`| columns (lists) that belong to project in Kanban board | id (uuid) NN <br> project_id (uuid) NN <br> column_name (varchar 50) NN <br> order_index (integer) NN |
|`project_keywords`| keywords (labels) assigned to a project | keyword_id (uuid) NN <br> project_id (uuid) NN |
|`project_members`| members participating in a project | id (uuid) NN <br> user_id (uuid) NN <br> project_id (uuid) NN |
|`reactions`| emoji reactions in a card comment | id (uuid) NN user_id (uuid) NN <br> card_comment (uuid) NN <br> emoji (varchar 255) NN <br> |
|`reset_password_requests`| password reset requests of a user who want to change password | user_id (uuid) NN <br> token (varchar 1000) NN |
|`roles`| roles of a user in a project | project_id (uuid) NN <br> user_id (uuid) NN <br> role (varchar 25) NN |
|`team_projects`| projects of a team | id (uuid) NN <br> team_id (uuid) NN <br> project_id (uuid) NN |
|`teams`| team data | id (uuid) NN <br> name (varchar 100) NN <br> admin (uuid) NN <br> is_public (boolean) NN |
|`user_teams`| teams of a certain user | id (uuid) NN <br> user_id (uuid) NN <br> team_id (uuid) NN |

Diagram of the tables and their relations can be found in the diagram below:

![Diagram of the Kanvas' database tables and their relations](/kanvas-database-diagram.png)

Backend’s endpoints communicate with the PostgreSQL database using the [pg](https://node-postgres.com/) package. Endpoints use functions declared in the files of the /database/DAOs folder, and the functions use queries in the files of the /database/queries folder. DAO functions and queries use consistent naming in a way that a certain DAO function (insertUserDAO) has the same name as the related Request (insertUser) but with “DAO” suffix. In order to prevent SQL injections, parameterized queries are used.

In certain endpoints there are situations where multiple dependent database operations are needed. For example, when the user creates a project, project members and team admin is added and placeholder project columns are created in addition to creating the project itself. In these kinds of situations, transactions are used to ensure the ACID principle.

**Docker**

Docker was used to create containers for the project’s PostgreSQL local database and the pgAdmin administration platform. Developers can interact with the database using either Docker’s interactive mode in terminal or the pgAdmin website.

**Microsoft Azure**

Currently, users’ profile pictures and projects’ pictures are stored in [Azure Blob Storage](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-nodejs?tabs=managed-identity%2Croles-azure-portal%2Csign-in-azure-cli). Using the functions provided by Azure’s npm packages (azure/identity, azure/storage-blob), endpoints store SAS (Shared Access Signature) urls in the database, granting limited access to image resources. When a user’s profile picture or project’s picture is deleted, these same packages are utilized in deleting images from the Azure container.

### 3.2 Backend environment variables

The following variables should be added to .env file at the root of the /back folder:

| Environment variable      | Description                            | Example value           |
| ------------------------- | -------------------------------------- | ----------------------- |
| `PG_PORT`                 | Port number for PostgreSQL database | `5432` |
| `PG_USERNAME`             | Desired name for database’s admin user | `pguser` |
| `PG_PASSWORD`             | Password for database’s admin user | Strong, randomly generated password |
| `PG_DATABASE`             | Name of the PostgreSQL database | `postgres` |
| `SECRET`                  | Secret key to be used when making web tokens | Strong, randomly generated secret |
| `EMAIL_ADDRESS`           | Email address used when sending emails via nodemailer |  |
| `emailPassword`           | Password of the email address used to send emails via nodemailer |  |
| `appPath`                 | Token for resetting password is concatenated to url declared in this variable when sending reset password link to user’s email address| Path used in the project: <br> `http://localhost:3000/reset-password/ `|
| `AZURE_CONNECTION_STRING` | This variable includes the authorization information required for your app to access data in an Azure Storage account. <br> More information about setting up connection string can be found in Azure’s documentation: [Configure Azure Storage connection strings](https://learn.microsoft.com/en-us/azure/storage/common/storage-configure-connection-string) | In Kanvas, the value followed this format:<br> `DefaultEndpointsProtocol=https;AccountName=<account-name>;AccountKey=<account-key>;EndpointSuffix=<endpoint-suffix>`|
| `AZURE_CONTAINER_NAME`    | Name of the Azure container where files (e.g., images) will be stored | `container-name-created-to-azure` |


### 3.3 Backend startup instructions

1. Start your Postgres database instance

2. Navigate to backend folder with `cd back`

3. Install backend dependencies by running `npm install`

4. Start the development server by running `npm run dev`

### 3.4 API documentation

Backend uses the following endpoints divided into different routers.


#### 3.4.1 /cards

| Endpoint | Headers | Request Body | Request Parameters | Status Codes | Response Body |
| ------------------------- | -------------------------------------- | ----------------------- | :-------------------------: | -------------------------------------- | ----------------------- |
| `/ POST` | Authorization (Bearer token) | id (string) <br> projectId (string) <br> title (string) <br> subtitle (string or null) <br> description (string or null) <br> status (string or null) <br> creationDate (Date) <br> dueDate (Date or null) <br> attachments (string or null) <br> orderIndex (number) | - | **201** (Card created successfully) <br> **403** (User is not project member) <br> **500** (General server error) | Success: <br> card:<br> id (string) <br> projectId (string) <br> title (string) <br> subtitle (string or null) <br> description (string or null) <br> status (string or null) <br> creationDate (Date) <br> dueDate (Date or null) <br> attachments (string) <br> orderIndex (number) <br><br> Error: <br> Error message |
| `/:id DELETE` | Authorization (Bearer token) | - | id | **200** (Card deleted successfully) <br> **404** (Card with id not found) <br> **500** (General server error) | <br><br> Error: <br> Error message |
| `/:id GET` | Authorization (Bearer token) | - | id | **200** (Card with id found) <br> **404** (Card with id not found) <br> **500** (General server error) | Success: <br> card:<br> id (string) <br> projectId (string) <br> title (string) <br> subtitle (string or null) <br> description (string or null) <br> status (string or null) <br> creationDate (Date) <br> dueDate (Date or null) <br> attachments (string) <br> orderIndex (number) <br><br> Error: <br> Error message |
| `/:id PUT` | Authorization (Bearer token) | id (string) <br> projectId (string) <br> title (string) <br> subtitle (string or null) <br> description (string or null) <br> status (string or null) <br> creationDate (Date) <br> dueDate (Date or null) <br> attachments (string or null) <br> orderIndex (number) | id | **201** (Card updated successfully) <br> **404** (Card with id not found) <br> **500** (General server error) | Success: <br> card:<br> id (string) <br> projectId (string) <br> title (string) <br> subtitle (string or null) <br> description (string or null) <br> status (string or null) <br> creationDate (Date) <br> dueDate (Date or null) <br> attachments (string) <br> orderIndex (number) <br><br> Error: <br> Error message |

#### 3.4.2 /columns
| Endpoint | Headers | Request Body | Request Parameters | Status Codes | Response Body |
| ------------------------- | -------------------------------------- | ----------------------- | :-------------------------: | -------------------------------------- | ----------------------- |
| `/ POST` | Authorization (Bearer token) | projectId (string) <br> columnName (string) <br> orderIndex (number) | - | **201** (Column created successfully) <br> **500** (General server error) | Success: <br> id (string) <br> projectId (string) <br> columnName (string) <br> orderIndex (number) <br><br> Error: <br> Error message |
| `/:columnId DELETE` | Authorization (Bearer token) | projectId (string) <br> orderIndex (number) | columnId | **200** (Column deleted successfully) <br> **500** (General server error) | Success: <br> Status code 200 <br><br> Error: <br> Error message |
| `/:columnId PUT` | Authorization (Bearer token) | projectId (string) <br> columnName (string) <br> orderIndex (number) | columnId | **200** (Column updated successfully) <br> **500** (General server error) | Success: <br> id (string) <br> projectId (string) <br> columnName (string) <br> orderIndex (number) <br><br> Error: <br> Error message |

#### 3.4.3 /comments

| Endpoint | Headers | Request Body | Request Parameters | Status Codes | Response Body |
| ------------------------- | -------------------------------------- | ----------------------- | :-------------------------: | -------------------------------------- | ----------------------- |
| `/ POST` | Authorization (Bearer token) | commentText (string) <br> cardId (string) | - | **200** (Comment added successfully) <br> **400** (One or more properties missing from request body) <br> **403** (commentText is empty) <br> **500** (General server error) | Success: <br> id (string) <br> cardId (string) <br> author (string) <br> commentText (string) <br> timeAdded (string) <br><br> Error: <br> Error message |
| `/:id DELETE` | Authorization (Bearer token) | - | id | **200** (Comment deleted successfully) <br> **403** (Wrong id or user is not the comment author) <br> **500** (General server error) | Error: <br> Error message |
| `/:projectId GET` | Authorization (Bearer token) | - | projectId | **200** (Comments with id found) <br> **403** (User is not a project member) <br> **500** (General server error) | Success: <br> Array: <br> id (string) <br> cardId (string) <br> author (string) <br> commentText (string) <br> timeAdded (string) <br><br> Error: <br> Error message |
| `/:id PUT` | Authorization (Bearer token) | commentText (string) | id | **200** (Comment updated successfully) <br> **400** (One or more properties missing from request body) <br> **403** (commentText is empty) <br> **500** (General server error) | Success: <br> id (string) <br> cardId (string) <br> author (string) <br> commentText (string) <br> timeAdded (string) <br><br> Error: <br> Error message |

#### 3.4.4 /projects

| Endpoint | Headers | Request Body | Request Parameters | Status Codes | Response Body |
| ------------------------- | -------------------------------------- | ----------------------- | :-------------------------: | -------------------------------------- | ----------------------- |
| `/ POST` | Authorization (Bearer token) | name (string) <br> description (string) <br> endDate (Date or null) <br> theme (string) <br> isPublic (boolean) <br> members (array) <br> picture (string or null) | - | **201** (Project added successfully) <br> **400** (name or isPublic missing, name length > 50, description length > 500, adding project fails) <br> **500** (General server error) | Success: <br> id (string) <br> name (string) <br> description (string) <br> creationDate (Date) <br> endDate (Date or null) <br> theme (string) <br> picture (string or null) <br> isPublic (boolean) <br><br> Error: <br> Error message |
| `/:id DELETE` | Authorization (Bearer token) | - | id | **200** (Project deleted successfully) <br> **403** (User is not the project admin) <br> **500** (General server error) | Success: <br> "Project deleted" <br><br> Error: <br> Error message |
| `/:id GET` | Authorization (Bearer token) | - | id | **200** (User is a project member or the project is public, the project is retrieved successfully) <br> **404** (Project or user not found) <br> **500** (General server error) | Success: <br><br> project:<br> id (string) <br> name (string) <br> description (string) <br> creationDate (Date) <br> endDate (Date or null) <br> theme (string) <br> picture (string or null) <br> isPublic (boolean) <br><br> projectColumns (array): <br> id (string) <br> projectId (string) <br> columnName (string) <br> orderIndex (number) <br> <br><br> projectMembers (array): <br> lastName (string) <br> email (string) <br> picture (string or null) <br><br> cards (array): <br> id (string) <br> projectId (string) <br> title (string) <br> subTitle (string or null) <br> description (string or null) <br> status (string or null) <br> creationDate (Date) <br> dueDate (Date or null) <br> attachments (string or null) <br> inColumn (string) <br> orderIndex (number) <br><br> Error: <br> Error message |
| `/dashboard/:id GET` | Authorization (Bearer token) | - | id (user id) | **201** (Data retrieved successfully) <br> **404** (User with id not found) <br> **500** (General server error) | Success: <br><br> allProjects (array): <br> id (string) <br> name (string) <br> description (string) <br> creationDate (Date) <br> endDate (Date or null) <br> theme (string) <br> picture (string or null) <br> isPublic (boolean) <br><br> favoriteProjects (array): <br> favoriteProjectId (string) <br> id (string) <br> name (string) <br> description (string) <br> creationDate (Date) <br> endDate (Date or null) <br> theme (string) <br> picture (string or null) <br> isPublic (boolean) <br><br> teams (array): <br> admin (string) <br> id (string) <br> isPublic (boolean) <br> name (string) <br><br> publicProjects (array): <br> id (string) <br> name (string) <br> description (string) <br> creationDate (Date) <br> endDate (Date or null) <br> theme (string) <br> picture (string or null) <br> isPublic (boolean) <br><br> Error: <br> Error message |
| `/:id PUT` | Authorization (Bearer token) | name (string) <br> description (string) <br> creationDate (Date or null) <br> endDate (Date or null) <br> theme (string) <br> isPublic (boolean) <br> members (array) <br> picture (string or null) | id | **200** (Project updated successfully) <br> **403** (User is not the project admin) <br> **404** (Project not found) <br> **500** (General server error) | Success: <br> "Project updated" <br><br> Error: <br> Error message |
| `/favorite-projects/:id DELETE` | Authorization (Bearer token) | - | id | **200** (Favorite project deleted successfully) <br> **500** (General server error) | Success: <br> "Favorite project deleted" <br><br> Error: <br> Error message |
| `/favorite-projects/:id POST` | Authorization (Bearer token) | projectId (string) | - | **200** (Favorite project added successfully) <br> **500** (General server error) | Success:<br> id (string) <br> name (string) <br> description (string) <br> creationDate (Date) <br> endDate (Date or null) <br> theme (string) <br> picture (string or null) <br> isPublic (boolean) <br> favoriteProjectId (string) <br><br> Error: <br> Error message |

#### 3.4.5 /reactions
| Endpoint | Headers | Request Body | Request Parameters | Status Codes | Response Body |
| ------------------------- | -------------------------------------- | ----------------------- | :-------------------------: | -------------------------------------- | ----------------------- |
| `/ POST` | Authorization (Bearer token) | cardComment (string) <br> emoji (string) | - | **200** (Reaction added successfully) <br> **400** (One or more properties missing from the request body) <br> **403** (User is no project member) <br> **500** (General server error) | Success: <br> id (string) <br> userId (string) <br> cardComment (string) <br> emoji (string) <br> endDate (Date or null) <br> theme (string) <br><br> Error: <br> Error message |
| `/:id DELETE ` | Authorization (Bearer token) | cardComment (string) <br> emoji (string) | id (card comment id) | **200** (Reaction deleted successfully) <br> **403** (Reaction with id not found or user is not the reaction author) <br> **500** (General server error) | Success: <br> "Ok" <br><br> Error: <br> Error message |

#### 3.4.6 /teams
| Endpoint | Headers | Request Body | Request Parameters | Status Codes | Response Body |
| ------------------------- | -------------------------------------- | ----------------------- | :-------------------------: | -------------------------------------- | ----------------------- |
| `/newteams POST` | Authorization (Bearer token) | name (string) <br> isPublic (boolean) <br> emails (string []) | - | **200** (Team created successfully) <br> **500** (General server error) | Success: <br> admin (string) <br> id (string) <br> isPublic (boolean) <br> name (string) <br><br> Error: <br> Error message |
| `/delete/:id DELETE` | Authorization (Bearer token) | - | id | **200** (Team deleted successfully) <br> **403** (User is not the team admin) <br> **404** (Team with id not found) <br> **500** (General server error) | Success: <br> "Ok" <br><br> Error: <br> Error message |
| `/:id GET` | Authorization (Bearer token) | - | id | **200** (Team with id found) <br> **404** (Team with id not found) <br> **500** (General server error) | Success: <br> admin (string) <br> id (string) <br> is_public (boolean) <br> name (string) <br><br> Error: <br> Error message |
| `/update/:id PUT` | Authorization (Bearer token) | name (string) <br> admin (string) <br> isPublic (boolean)  | id | **200** (Team updated successfully) <br> **403** (User is not the team admin) <br> **404** (Team with id not found) <br> **500** (General server error) | Success: <br> admin (string) <br> id (string) <br> isPublic (boolean) <br> name (string) <br><br> Error: <br> Error message |

#### 3.4.7 /users
| Endpoint | Headers | Request Body | Request Parameters | Status Codes | Response Body |
| - | - | - | :-: | - | - |
| `/signup POST` | - | email (string) <br> firstName (string) <br> lastName (string) <br> password (string) <br> passwordConfirmation (string) | - | **200** (New user created successfully) <br> **400** (The password is not valid or password and passwordConfirmation do not match) <br> **409** (User with email already exists) <br> **500** (General server error) | Success: <br> "New user created" <br> <br>Error: <br> Error message |
| `/:id DELETE` | Authorization (Bearer token) | - | id | **200** (User deleted successfully) <br> **401** (Token is invalid or the user being deleted is not the same user requesting the deletion) <br>**500** (General server error) | Error: <br> Error message |
| `/login POST` | - | email (string) <br> password (string) | - | **200** (User with email exists and the password is correct) <br> **400** (Email or password missing from the request body) <br> **401** (user with email is not found or password is not valid for the user) <br> **500** (General server error) | Success: <br> token (string) <br><br> user (object): <br> id (string) <br> firstName (string) <br> lastName (string) <br> email (string) <br> phoneNumber (string or null)  <br> country (string or null) <br> city (string or null) <br> picture (string or null) <br> accountCreationDate (Date) <br> isOnline (boolean) <br> lastOnline (date) <br> isOpenToWork (boolean or null) <br> linkedinUsername (string or null) <br> jobPitch (string or null) <br> <br>Error: <br> Error message |
| `/:id PUT` | Authorization (Bearer token) | id (string) <br> firstName (string) <br> lastName (string) <br> city (string or null) <br> country (string or null) <br> email (string) <br> phoneNumber (string or null) <br> isOpenToWork (boolean or null) <br> jobPitch (string or null) <br> linkedinUsername (string or null)  <br> picture (string or null) | id | **200** (User updated successfully) <br> **400** (firstName, lastName, email fields is missing or their length is more than 255 characters) <br> **401** (Token is invalid) <br> **403** (User requesting the update is not the same than the user being updated) <br> **409** (Email is trying to be updated with an email that already exists with a different user) <br> **500** (General server error) | Success: <br><br> user (object): id (string) <br> firstName (string) <br> lastName (string) <br> email (string) <br> phoneNumber (string or null)  <br> country (string or null) <br> city (string or null) <br> picture (string or null) <br> accountCreationDate (Date) <br> isOnline (boolean) <br> lastOnline (date) <br> isOpenToWork (boolean or null) <br> linkedinUsername (string or null) <br> jobPitch (string or null) <br>Error: <br> Error message |
| `/:id/password PUT` | Authorization (Bearer token) | oldPassword (string) <br> newPassword (string) <br> newPasswordConfirmation (string) | id | **204** (Password updated successfully) <br> **400** (Property missing from request body or oldPassword is incorrect or newPassword and newPasswordConfirmation do not match) **401** (Token is invalid) <br> **403** (Id in token does not match the id in request parameter) <br> **500** (General server error) | Success: <br> "No content" <br> <br>Error: <br> Error message |
| `/forgot-password POST` | - | email (string) | - | **200** (Sent regardless of whether a user with that email is found or not found) <br> **500** (General server error) | Success: <br> "Password reset link sent! Check your email for instructions." <br> <br>Error: <br> Error message |
| `/reset-password:token PUT` | - | newPassword (string) <br> newPasswordConfirmation (string) | token | **200** (User's password updated with a new password successfully) <br> **400** (Password is not strong enough or the passwords do not match) <br> **404** (Password reset link has already been used or user not found) <br> **500** (General server error) | Success: <br> "New password created! Please log in using new password." <br> <br>Error: <br> Error message |
| `/:id GET` | Authorization (Bearer token) | - | id | **200** (User with id found) <br> **401** (Invalid token or id in token does not match the id in request parameter) <br> **403** (User requesting the update is not the same than the user being updated) <br> **500** (General server error) | Success: <br><br> id (string) <br> firstName (string) <br> lastName (string) <br> email (string) <br> phoneNumber (string or null)  <br> country (string or null) <br> city (string or null) <br> picture (string or null) <br> accountCreationDate (Date) <br> isOnline (boolean) <br> lastOnline (date) <br> isOpenToWork (boolean or null) <br> linkedinUsername (string or null) <br> jobPitch (string or null) <br> <br>Error: <br> Error message |





