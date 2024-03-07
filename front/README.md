## Frontend

### Frontend technologies and their applications

**React with TypeScript**

Kanvas’ user interface was implemented using React’s version 18.2. To ensure type safety and code reliability, we used TypeScript.

When implementing front end code few notable libraries should be mentioned:

-   [Material UI](https://mui.com/) was used to implement most of the UI’s elements
-   [React Router](https://reactrouter.com/en/main) was used in page routing
-   [axios](https://axios-http.com/) was used to send HTTP requests to server
-   [Redux](https://redux.js.org/) was used for global state management
-   [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd) was used to implement Kanban board with drag and drop features

### Frontend environment variables

The following variable should be added to .env file at the root level of the /front folder:

| Environment variable | Description                           | Example value           |
| -------------------- | ------------------------------------- | ----------------------- |
| `REACT_APP_BASE_URL` | Base server url and port for the site | `http://localhost:3000` |

### Frontend startup instructions

1. Navigate to frontend with `cd front`.

2. Run `npm install` to install frontend dependencies.

3. Run `npm start` to start the development server.