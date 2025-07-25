# ProjectTrackingTool
A tool to manage projects

## Features Checklist:

- Project creation from - Done
- Listing all the projects in a table - Done
- Search/filter by status - Done
- View project details page - Done
- Edit project page - Done
- Basic validation - Done

Technologies:

- React project using Vite, typescript
- Used tailwindcss for responsive layout
- Fetch to call api endpoints

Api endpoint is in src/config.ts file with the key 'baseUrl'

## Instructions to run the application

### Confirm Prerequisites:

  Ensure NodeJs(latest) is installed and available in path `node -v`

### To start the application:

1. Run the backend project which exposes the api endpoints. Repository for backend project (https://github.com/srizan/ProjectTrackingApi)

2. Once the backend project is running, and replace the api endpoint in src/config.ts.

3. From the terminal, go to the project folder and run npm install

```
cd project-tracker
npm install
```

4. Run the application by running

```
npm run dev
```

**This will run our frontend in a url (e.g - http://localhost:5173)**

5. Note - Ensure the CORS configuration in backend ASP.NET Core API project is set to allow the frontend Url

## Frontend Features:

**Project List Page**:

- Implemented component ProjectList.tsx to display list of Projects
- Implemented search feature by name
- Added filter by Status

**Project Details Page**:

- Implemented ProjectDetails.tsx component to display the project details / edit project
- Added validation error message display sent from backend
- Formatted date to display in MM/DD/YYYY

**Create Project Page**:

- Added the component AddProject.tsx to create new project

Additional Notes:

- Statuses 'Planned', 'In Progress' and 'Completed' are hardcoded.
- The frontend assumes the backend runs on `https://localhost:7118` adjustable as needed.