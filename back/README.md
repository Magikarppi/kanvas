# Backend

## Backend technologies and their applications

**TypeScript**

Our server code is implemented using node.js and TypeScript. Project’s endpoints with RESTful APIs are implemented using the [express framework](https://expressjs.com/). Various other packages are used in the server logic, such as [uuid](https://www.npmjs.com/package/uuid) for creating unique identifiers for users and projects, [nodemailer](https://www.nodemailer.com/) for sending reset password links via email and [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) for creating tokens.

**PostgreSQL**

Kanvas’ database is implemented in PostgreSQL. The database consists of total 17 tables, two of which are base tables (in this case, tables with no foreign key constraints) and 15 of which are dependent tables (i.e., tables with foreign key constraints).

Base tables:

| Table name | Description  | Columns (NN = not null) |
| ---------- | ------------ | ----------------------- |
| `projects` | project data | id (uuid) NN <br> name (varchar 50) NN <br> description (varchar 500) <br> is_public (boolean) NN <br> project_creation_date (timestamp) NN <br> project_end_date (timestamp)<br> theme (varchar 50) <br> picture (text) |
| `users`    | user data    | id (uuid) NN <br> first_name (varchar) NN <br> last_name (varchar) NN <br> email (varchar) NN <br> password_hash (varchar 255) NN <br> phone_number (varchar 20) <br> country (varchar 100) <br> city (varchar 100) <br> picture (text) <br> account_creation_date (timestamp) NN <br> is_online (boolean) NN <br> last_online (timestamp) <br> is_open_to_work (boolean) <br> linkedin_username (varchar 29) <br> job_pitch (varchar 500) |

Dependent tables:
| Table name | Description | Columns (NN = not null) |
|---|---|---|
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
|`reset_password_requests`| password reset requests of users who want to change passwords | user_id (uuid) NN <br> token (varchar 1000) NN |
|`roles`| roles of a user in a project | project_id (uuid) NN <br> user_id (uuid) NN <br> role (varchar 25) NN |
|`team_projects`| projects of a team | id (uuid) NN <br> team_id (uuid) NN <br> project_id (uuid) NN |
|`teams`| team data | id (uuid) NN <br> name (varchar 100) NN <br> admin (uuid) NN <br> is_public (boolean) NN |
|`user_teams`| teams of a certain user | id (uuid) NN <br> user_id (uuid) NN <br> team_id (uuid) NN |

Diagram of the tables and their relations can be found in the diagram below:

![Diagram of the Kanvas' database tables and their relations](../kanvas-project-images/kanvas-database-diagram.png)

Backend’s endpoints communicate with the PostgreSQL database using the [pg](https://node-postgres.com/) package. Endpoints use functions declared in the files of the /database/DAOs folder, and the functions use queries in the files of the /database/queries folder. DAO functions and queries use consistent naming in a way that a certain DAO function (insertUserDAO) has the same name as the related Request (insertUser) but with “DAO” suffix. In order to prevent SQL injections, parameterized queries are used.

In certain endpoints there are situations where multiple dependent database operations are needed. For example, when the user creates a project, project members and team admin is added and placeholder project columns are created in addition to creating the project itself. In these kinds of situations, transactions are used to ensure the ACID principle.

**Docker**

Docker was used to create containers for the project’s PostgreSQL local database and the pgAdmin administration platform. Developers can interact with the database using either Docker’s interactive mode in terminal or the pgAdmin website.

**Microsoft Azure**

Currently, users’ profile pictures and projects’ pictures are stored in [Azure Blob Storage](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-nodejs?tabs=managed-identity%2Croles-azure-portal%2Csign-in-azure-cli). Using the functions provided by Azure’s npm package (azure/storage-blob), endpoints store SAS (Shared Access Signature) urls in the database, granting limited access to image resources. When a user’s profile picture or project’s picture is deleted, these same packages are utilized in deleting images from the Azure container.

To set up your Azure blob storage follow these instructions: [Azure Blob Storage setup](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-portal)

## Backend environment variables

The following variables should be added to .env file at the root of the /back folder:

| Environment variable      | Description | Example value |
| ------------------------- | ---------------------------------- | --------------------------------------- |
| `PG_PORT` | Port number for PostgreSQL database | `5432` |
| `PG_USERNAME` | Desired name for database’s admin user | `pguser`|
| `PG_PASSWORD` | Password for database’s admin user | Strong, randomly generated password|
| `PG_DATABASE` | Name of the PostgreSQL database | `postgres`|
| `SECRET` | Secret key to be used when making web tokens | Strong, randomly generated secret |
| `EMAIL_ADDRESS`| Email address used when sending emails via nodemailer | | 
| `emailPassword`| Password of the email address used to send emails via nodemailer| |
| `appPath`| Token for resetting password is concatenated to url declared in this variable when sending reset password link to user’s email address | Path used in the project: <br> `http://localhost:3000/reset-password/ `|
| `AZURE_CONNECTION_STRING` | This variable includes the authorization information required for your app to access data in an Azure Storage account. <br> More information about setting up connection string can be found in Azure’s documentation: [Configure Azure Storage connection strings](https://learn.microsoft.com/en-us/azure/storage/common/storage-configure-connection-string) | In Kanvas, the value followed this format:<br> `DefaultEndpointsProtocol=https;AccountName=<account-name>;AccountKey=<account-key>;EndpointSuffix=<endpoint-suffix>` |
| `AZURE_CONTAINER_NAME`    | Name of the Azure container where files (e.g., images) will be stored | `container-name-created-to-azure` |

## Backend startup instructions

1. Make sure you have added the needed environment variables to .env file

2. Open Docker Desktop and start a Postgres database instance in Docker container by running `docker run --name kanvas_local_postgres -e POSTGRES_PASSWORD=<PG_PASSWORD> -e POSTGRES_USER=<PG_USERNAME> -e POSTGRES_DB=<PG_DATABASE> -p 5432:5432 -d postgres` in a terminal. Make sure the values match the ones set as your environment variables.

You can interact with this database from the command line by running `docker exec -it kanvas_local_postgres psql -U pguser`. Make sure the container name and user match the ones set when starting the container. Navigate to the database with `\c YOUR_PG_DATABASE_NAME`.

You can also interact with the database in pgAdmin which can be started in Docker container with `docker run --name pgadmin_container -p 8080:80 -e PGADMIN_DEFAULT_EMAIL=user@domain.com -e PGADMIN_DEFAULT_PASSWORD=password -d dpage/pgadmin4`. Replace the values for email and password with whatever you wish. Go to localhost:8080 in a browser and log in. Click "Add New Server" and provide the values used when starting the Postgres database container.

3. Navigate to backend folder with `cd back`

4. Install backend dependencies by running `npm install`

5. Start the development server by running `npm run dev`. If you encounter a database error about invalid password, you might have locally installed PostgreSQL process running and it interferes with the one running in Docker. Stop the locally installed PostgreSQL process and run the one in the container.

## API documentation

Backend uses the following endpoints divided into different routers. Above each router, relevant interfaces needed by each router are introduced.

### /cards

```ts
interface ICard {
    id: string;
    projectId: string;
    title: string;
    subTitle: string | null;
    description: string | null;
    status: string | null;
    creationDate: Date;
    dueDate: Date | null;
    attachments: string | null;
    inColumn: string;
    orderIndex: string;
}
```

| Endpoint | Headers | Request Body | Status Codes | Response Body |
| ------------------------- | -------------------------------------- | ----------------------- |-------------------------------------- | ----------------------- |
| `/ POST` | Authorization (Bearer token) | id (string) <br> projectId (string) <br> title (string) <br> subtitle (string or null) <br> description (string or null) <br> status (string or null) <br> creationDate (Date) <br> dueDate (Date or null) <br> attachments (string or null) <br> orderIndex (number) | **201** (Card created successfully) <br> **400** (Invalid request body) <br> **403** (User is not project member) <br> **500** (General server error) | Success: <br> card: ICard <br><br> Error: <br> Error message |
| `/:id DELETE` | Authorization (Bearer token) | - | **200** (Card deleted successfully) <br> **404** (Card with id not found) <br> **500** (General server error) | <br><br> Error: <br> Error message |
| `/:id GET` | Authorization (Bearer token) | - | **200** (Card with id found) <br> **404** (Card with id not found) <br> **500** (General server error) | Success: <br> card: ICard <br><br> Error: <br> Error message |
| `/:id PUT` | Authorization (Bearer token) | id (string) <br> projectId (string) <br> title (string) <br> subtitle (string or null) <br> description (string or null) <br> status (string or null) <br> creationDate (Date) <br> dueDate (Date or null) <br> attachments (string or null) <br> orderIndex (number) | **201** (Card updated successfully) <br> **400** (Invalid request body) <br> **404** (Card with id not found) <br> **500** (General server error) | Success: <br> card: ICard <br><br> Error: <br> Error message |

### /columns

```ts
interface IProjectColumn {
    id: string;
    projectId: string;
    columnName: string;
    orderIndex: number;
}
```

| Endpoint | Headers | Request Body | Status Codes | Response Body |
| ------------------------- | -------------------------------------- | ----------------------- | -------------------------------------- | ----------------------- |
| `/ POST` | Authorization (Bearer token) | projectId (string) <br> columnName (string) <br> orderIndex (number) | **201** (Column created successfully) <br> **400** (Invalid request body) <br> **500** (General server error) | Success: <br >object: IProjectColumn <br><br> Error: <br> Error message |
| `/:projectId/:columnId/:orderIndex DELETE` | Authorization (Bearer token) |  | **200** (Column deleted successfully) <br> **400** (Invalid request params) <br> **500** (General server error) | Success: <br> IProjectColumn[] <br><br> Error: <br> Error message |
| `/:columnId PUT` | Authorization (Bearer token) | projectId (string) <br> columnName (string) <br> orderIndex (number) | **200** (Column updated successfully) <br> **400** (Invalid request body) <br> **500** (General server error) | Success: <br> object: IProjectColumn[] <br><br> Error: <br> Error message |

### /comments
```ts
interface ICardComment {
    id: string;
    cardId: string;
    author: string;
    commentText: string;
    timeAdded: Date;
}
```
| Endpoint | Headers | Request Body | Status Codes | Response Body |
| ------------------------- | -------------------------------------- | ----------------------- | -------------------------------------- | ----------------------- |
| `/ POST` | Authorization (Bearer token) | commentText (string) <br> cardId (string) | **200** (Comment added successfully) <br> **400** (One or more properties missing from request body) <br> **403** (commentText is empty) <br> **500** (General server error) | Success: <br> object: ICardComment <br><br> Error: <br> Error message |
| `/:id DELETE` | Authorization (Bearer token) | - | **200** (Comment deleted successfully) <br> **403** (Wrong id or user is not the comment author) <br> **500** (General server error) | Error: <br> Error message |
| `/:projectId GET` | Authorization (Bearer token) | - | **200** (Comments with id found) <br> **403** (User is not a project member) <br> **500** (General server error) | Success: <br> ICardComment [] <br><br> Error: <br> Error message |
| `/:id PUT` | Authorization (Bearer token) | commentText (string) | **200** (Comment updated successfully) <br> **400** (One or more properties missing from request body) <br> **403** (commentText is empty) <br> **500** (General server error) | Success: <br> object: ICardComment <br><br> Error: <br> Error message |

### /projects
```ts
type IProject = {
    id: string;
    name: string;
    description: string;
    isPublic: boolean;
    creationDate: Date;
    endDate: Date | null;
    theme: string;
    picture: string | null;
};

type ProjectMember = Pick<IUser,"id" | "firstName" | "lastName" | "email" | "picture">;

interface IFavoriteProject extends IProject {
    favoriteProjectId: string;
}
```

| Endpoint | Headers | Request Body | Status Codes | Response Body |
| ------------------------- | -------------------------------------- | ----------------------- | -------------------------------------- | ----------------------- |
| `/ POST` | Authorization (Bearer token) | name (string) <br> description (string) <br> endDate (Date or null) <br> theme (string) <br> isPublic (boolean) <br> members (array) <br> picture (string or null) | **201** (Project added successfully) <br> **400** (name or isPublic missing, name length > 50, description length > 500, adding project fails) <br> **500** (General server error) | Success: <br> object: IProject <br><br> Error: <br> Error message |
| `/:id DELETE` | Authorization (Bearer token) | - | **200** (Project deleted successfully) <br> **403** (User is not the project admin) <br> **500** (General server error) | Success: <br> "Project deleted" <br><br> Error: <br> Error message |
| `/:id GET` | Authorization (Bearer token) | - | **200** (User is a project member or the project is public, the project is retrieved successfully) <br> **404** (Project or user not found) <br> **500** (General server error) | Success: <br>project: IProject <br><br> projectColumns: IProjectColumn [] <br><br> projectMembers: ProjectMember [] <br><br> cards: ICard [] <br><br> Error: <br> Error message |
| `/dashboard/:id GET` | Authorization (Bearer token) | - | **201** (Data retrieved successfully) <br> **404** (User with id not found) <br> **500** (General server error) | Success: <br><br> allProjects:<br> IProject [] <br><br> favoriteProjects: IFavoriteProject [] <br><br> publicProjects:<br> IProject [] <br><br> Error: <br> Error message |
| `/:id PUT` | Authorization (Bearer token) | name (string) <br> description (string) <br> creationDate (Date or null) <br> endDate (Date or null) <br> theme (string) <br> isPublic (boolean) <br> members (array) <br> picture (string or null) | **200** (Project updated successfully) <br> **403** (User is not the project admin) <br> **404** (Project not found) <br> **500** (General server error) | Success: <br> "Project updated" <br><br> Error: <br> Error message |
| `/favorite-projects/:id DELETE` | Authorization (Bearer token) | - | **200** (Favorite project deleted successfully) <br> **500** (General server error) | Success: <br> "Favorite project deleted" <br><br> Error: <br> Error message |
| `/favorite-projects/:id POST` | Authorization (Bearer token) | projectId (string) | **200** (Favorite project added successfully) <br> **400** (Invalid request body or project not found) <br> **500** (General server error) | Success:<br> object: IFavoriteProject <br><br> Error: <br> Error message |

### /reactions

```ts
interface IReaction {
    id: string;
    userId: string;
    cardComment: string;
    emoji: string;
}
```

| Endpoint | Headers | Request Body | Status Codes | Response Body |
| ------------------------- | -------------------------------------- | ----------------------- | -------------------------------------- | ----------------------- |
| `/ POST` | Authorization (Bearer token) | cardComment (string) <br> emoji (string) | **200** (Reaction added successfully) <br> **400** (One or more properties missing from the request body) <br> **403** (User is no project member) <br> **500** (General server error) | Success: <br> object: IReaction <br><br> Error: <br> Error message |
| `/:id DELETE ` | Authorization (Bearer token) | cardComment (string) <br> emoji (string) | **200** (Reaction deleted successfully) <br> **403** (Reaction with id not found or user is not the reaction author) <br> **500** (General server error) | Success: <br> "Ok" <br><br> Error: <br> Error message |

### /teams

```ts
interface ITeam {
    id: string;
    name: string;
    admin: string;
    isPublic: boolean;
}
```

| Endpoint | Headers | Request Body | Status Codes | Response Body |
| --------------------------- | -------------------------------------- | ------------------------- | -------------------------------------- | ------------------------- |
| `/newteams POST` | Authorization (Bearer token) | name (string) <br> isPublic (boolean) <br> emails (string []) | **200** (Team created successfully) <br> **400** (Invalid request body) <br> **500** (General server error) | Success:<br> object: ITeam <br><br> Error: <br> Error message |
| `/delete/:id DELETE` | Authorization (Bearer token) | - | **200** (Team deleted successfully) <br> **403** (User is not the team admin) <br> **404** (Team with id not found) <br> **500** (General server error) | Success: <br> "Ok" <br><br> Error: <br> Error message |
| `/:id GET` | Authorization (Bearer token) | - | **200** (Team with id found) <br> **404** (Team with id not found) <br> **500** (General server error) | Success:<br> object: ITeam <br><br> Error: <br> Error message |
| `/update/:id PUT` | Authorization (Bearer token) | name (string) <br> admin (string) <br> isPublic (boolean)  | **200** (Team updated successfully) <br> **400** (Invalid request body) <br> **403** (User is not the team admin) <br> **404** (Team with id not found) <br> **500** (General server error) | Success:<br> object: ITeam <br><br> Error: <br> Error message |

### /users

```ts
interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    passwordHash?: string;
    phoneNumber: string | null;
    country: string | null;
    city: string | null;
    picture: string | null;
    accountCreationDate: Date | null;
    isOnline: boolean | null;
    lastOnline: Date | null;
    isOpenToWork: boolean | null;
    linkedinUsername: string | null;
    jobPitch: string | null;
}
```

| Endpoint | Headers | Request Body | Status Codes | Response Body |
| --- | --- | --- | --- | --- |
| `/signup POST` | - | email (string) <br> firstName (string) <br> lastName (string) <br> password (string) <br> passwordConfirmation (string) | **200** (New user created successfully) <br> **400** (The password is not valid or password and passwordConfirmation do not match) <br> **409** (User with email already exists) <br> **500** (General server error) | Success: <br> "New user created" <br> <br>Error: <br> Error message |
| `/:id DELETE` | Authorization (Bearer token) | - | **200** (User deleted successfully) <br> **401** (Token is invalid or the user being deleted is not the same user requesting the deletion) <br>**500** (General server error) | Error: <br> Error message |
| `/login POST` | - | email (string) <br> password (string) |**200** (User with email exists and the password is correct) <br> **400** (Email or password missing from the request body) <br> **401** (user with email is not found or password is not valid for the user) <br> **500** (General server error) | Success: <br> token (string) <br><br> user: IUser <br>(w/o passwordHash) <br> <br>Error: <br> Error message |
| `/:id PUT` | Authorization (Bearer token) | id (string) <br> firstName (string) <br> lastName (string) <br> city (string or null) <br> country (string or null) <br> email (string) <br> phoneNumber (string or null) <br> isOpenToWork (boolean or null) <br> jobPitch (string or null) <br> linkedinUsername (string or null)  <br> picture (string or null) | **200** (User updated successfully) <br> **400** (firstName, lastName, email fields is missing or their length is more than 255 characters) <br> **401** (Token is invalid) <br> **403** (User requesting the update is not the same than the user being updated) <br> **409** (Email is trying to be updated with an email that already exists with a different user) <br> **500** (General server error) | Success: <br><br> user: IUser <br>(w/o passwordHash) <br> <br>Error: <br> Error message |
| `/:id/password PUT` | Authorization (Bearer token) | oldPassword (string) <br> newPassword (string) <br> newPasswordConfirmation (string) | **204** (Password updated successfully) <br> **400** (Property missing from request body or oldPassword is incorrect or newPassword and newPasswordConfirmation do not match) **401** (Token is invalid) <br> **403** (Id in token does not match the id in request parameter) <br> **500** (General server error) | Success: <br> "No content" <br> <br>Error: <br> Error message |
| `/forgot-password POST` | - | email (string) |**200** (Sent regardless of whether a user with that email is found or not found) <br> **500** (General server error) | Success: <br> "Password reset link sent! Check your email for instructions." <br> <br>Error: <br> Error message |
| `/reset-password:token PUT` | - | newPassword (string) <br> newPasswordConfirmation (string) | **200** (User's password updated with a new password successfully) <br> **400** (Password is not strong enough or the passwords do not match) <br> **404** (Password reset link has already been used or user not found) <br> **500** (General server error) | Success: <br> "New password created! Please log in using new password." <br> <br>Error: <br> Error message |
| `/:id GET` | Authorization (Bearer token) | - | **200** (User with id found) <br> **401** (Invalid token or id in token does not match the id in request parameter) <br> **403** (User requesting the update is not the same than the user being updated) <br> **500** (General server error) | Success: <br><br> user: IUser <br>(w/o passwordHash) <br> <br>Error: <br> Error message |