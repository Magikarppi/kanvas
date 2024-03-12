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

### Testing

We have written some unit and end-to-end tests to test the functionality of Kanvas.

Unit tests were written with using [jest](https://jestjs.io/). To run Kanvas' unit tests, navigate to /front folder with `cd front`. After that, run tests with the command `npm run test`.

End-to-end tests (eight in total) were written using [cypress](https://www.cypress.io/). To run these tests from the command line, navigate to /front folder with the command `cd front`. After that, start cypress tests using the command `npx cypress run`.

Another way to run cypress tests is to run the command `npx cypress open` after navigating to /front folder. In the window that opens, choose E2E Testing. After configuration has finished, choose the browser that you want to use for testing. Finally, in the browser window that opens, you can run a single test by clicking it.

Note that in order to run Kanvas' cypress tests, you should:

1. Start the front end development server using the instructions above
2. Start both the database container and the server using the start up instructions in the README file of the back folder
