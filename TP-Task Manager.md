## 1. Objective

Create a simple online application called **Task Manager** and collaborate with another student using GitHub Pull Requests.

The assignment consists of two parts:

- **Part A – Individual Application:** Create and deploy your own Task Manager with a database and REST API.
- **Part B – Team Collaboration:** Work with another student. Each of you must contribute a small additional feature to the other's repository through a Pull Request.

Each student must have their own GitHub repository and deployed application.
Both parts are required to complete the assignment.

## 2. Required Technologies

Use the following technologies:

- **Frontend:** HTML, CSS and JavaScript.
- **Version control:** Git and GitHub.
- **Hosting:** GitHub Pages (free).
- **Database:** Supabase (PostgreSQL, free tier).
- **REST API:** Supabase automatically generated REST API.

You do not need to create a separate backend server.
Frameworks are optional. Plain HTML and JavaScript are sufficient.
The application must be publicly accessible without requiring installation or login.

## 3. GitHub Account and Repository

Use your dedicated GitHub account for this course.

**GitHub username format:**

`vistula-team-project-STUDENT_ID`

Replace `STUDENT_ID` with your Vistula student ID.

Create a **public repository** named exactly:
`vistula-task-manager`

Your repository must be available at:
`https://github.com/USERNAME/vistula-task-manager`

Your deployed application must be available at:
`https://USERNAME.github.io/vistula-task-manager/`

Replace `USERNAME` with your GitHub username.
Enable GitHub Pages and publish the website from the root directory of the `main` branch.

### Required project files

- `index.html` – main Task Manager page.
- `app.js` – application logic.
- `config.json` – public Supabase configuration.
- `README.md` – project description, student ID and links.
- `contribution.html` – additional page created by another student.
- `contribution.json` – contributor information created by another student.

The last two files must be added through a Pull Request from your partner, not created directly by you.

Additional files, such as `style.css`, are optional.

---

# Part A – Task Manager Application

## 4. Application Functionality

Your Task Manager must allow users to:

1. Display all tasks.
2. Add a new task.
3. Edit an existing task.
4. Mark a task as completed or incomplete.
5. Delete a task.

Each task must contain a title, description and completion status.

All changes must be saved in the database and remain available after refreshing the page.

## 5. Database Requirements

Create a Supabase project containing a table named exactly:

`tasks`

Required columns:

| Column        | Type    | Requirements                         |
| ------------- | ------- | ------------------------------------ |
| `id`          | BIGINT  | Primary key, automatically generated |
| `title`       | TEXT    | Required                             |
| `description` | TEXT    | Optional                             |
| `completed`   | BOOLEAN | Default `false`                      |

Example record:

`{"id":1,"title":"Learn Git","description":"Practice Git commands","completed":false}`

The database must support creating, reading, updating and deleting tasks.

For this introductory exercise, user authentication is not required.

Configure Supabase Row Level Security (RLS) policies to allow the necessary public operations on the demonstration `tasks` table.

Use a separate demonstration database containing only test data.

**Important:** Never publish secret API keys, service role keys or database passwords. Only a public Supabase publishable API key may be included in frontend code.

## 6. REST API Requirements

Your application must use the Supabase REST API.

Base URL:

`https://PROJECT_ID.supabase.co/rest/v1`

Required operations:

|Method|Endpoint|Description|
|---|---|---|
|GET|`/tasks?select=*`|Get all tasks|
|GET|`/tasks?id=eq.1&select=*`|Get a task by ID|
|POST|`/tasks`|Create a task|
|PUT|`/tasks?id=eq.1`|Save a complete task|
|DELETE|`/tasks?id=eq.1`|Delete a task|

You may also use `PATCH` instead of `PUT` to update an existing task.

For `PUT`, send the complete record with the matching primary key. Supabase/PostgREST uses upsert semantics for this operation, so it may create a record if that ID does not exist.

Your frontend may communicate with the API using JavaScript `fetch()` or the Supabase JavaScript library.

### Public configuration

Create a `config.json` file with the following fields:

- `supabaseUrl` – your Supabase project URL.
- `supabasePublishableKey` – your public API key.
- `tableName` – must be `tasks`.

These fields will be used for automated testing.

## 7. Main HTML Page Requirements

The application must contain the following HTML elements with the specified IDs and classes.

### A. Page heading

- Heading displaying `Task Manager`.
- Your Vistula student ID displayed inside an element with `id="student-id"`.

### B. Task form

Form with:
`id="task-form"`

Inside the form:

- Task title input: `id="task-title"` (required).
- Task description input: `id="task-description"`.
- Submit button: `id="task-submit"`.

The form must support creating and editing tasks.

### C. Task list

Container with:
`id="task-list"`

All tasks retrieved from the database must be displayed inside this container.
Each task must have an element with:
`class="task-item"`
and a `data-id` attribute containing its database ID.

Each task must contain:

|Element|CSS class|
|---|---|
|Title|`task-title`|
|Description|`task-description`|
|Completion status|`task-status`|
|Edit button|`edit-task`|
|Delete button|`delete-task`|
|Complete/incomplete button|`toggle-task`|

### D. Additional elements

- Status/error message: `id="status-message"`.
- Link to the contribution page: `id="contribution-link"`, pointing to `contribution.html`.

The exact appearance and styling are up to you.

## 8. Functional Requirements

The following scenarios must work:

1. Open the application and display tasks from the database.
2. Add a new task and see it appear in the list.
3. Refresh the page and verify that the task still exists.
4. Edit the task title or description.
5. Change the task completion status.
6. Delete the task and verify that it disappears.
7. Display a useful error message if an operation fails.

All operations must work on the deployed GitHub Pages website, not only on your local computer.

---

# Part B – Team Collaboration (Pull Requests)

## 9. Working in Pairs

Find another student from the course and work together.

**Each student must maintain their own repository.**

For example:

- Student A has repository A.
- Student B has repository B.
- Student A creates a Pull Request adding a feature to repository B.
- Student B reviews and merges this Pull Request.
- Student B creates a Pull Request adding the same type of feature to repository A.
- Student A reviews and merges this Pull Request.

Both students must therefore:

1. Create one Pull Request in another student's repository.
2. Review and merge one Pull Request received from another student.

The collaboration must be visible in the GitHub Pull Request history.

## 10. Additional Feature – Contributor Page

Your contribution to your partner's repository must consist of two files.

### File 1: `contribution.json`

Create a JSON file in the root directory of your partner's repository.

Example:

`{"contributorStudentId":"12345678"}`

Replace `12345678` with **your own Vistula student ID**.

This ID belongs to the student creating the Pull Request, **NOT to the repository owner**.

The JSON file must be accessible at:
`https://USERNAME.github.io/vistula-task-manager/contribution.json`

Here, `USERNAME` is the repository owner's GitHub username.

This file is a static JSON resource accessible through HTTP GET. No additional backend or database is required.

### File 2: `contribution.html`

Create a simple HTML page titled:

`Team Contribution`

The page must contain:

- An heading displaying `Team Contribution`.
- A button with `id="load-contributor"` and the text `Show Contributor`.
- An element with `id="contributor-student-id"`.
- A link back to the main Task Manager page (`index.html`).

### Required JavaScript functionality

When the user clicks the `Show Contributor` button:

1. The page must fetch `contribution.json` using JavaScript.
2. Read the `contributorStudentId` field.
3. Display this ID inside the `contributor-student-id` element.

For example, after clicking the button:

`Contributor Student ID: 12345678`

The student ID must come from the JSON file, not from a hardcoded JavaScript value.
No database is required for this additional feature.

The page must be accessible at:
`https://USERNAME.github.io/vistula-task-manager/contribution.html`

## 11. Pull Request Procedure

Follow these steps:

1. Choose your partner.
2. Open your partner's public GitHub repository.
3. Fork the repository to your GitHub account.
4. Create a new branch in your fork, for example `feature/team-contribution`.
5. Add `contribution.html` and `contribution.json`.
6. Commit and push your changes.
7. Create a Pull Request targeting your partner's repository and its `main` branch.
8. Give the Pull Request a meaningful title, for example `Add contributor page – STUDENT_ID`.
9. Ask your partner to review and merge it.
10. Verify that both new URLs work on GitHub Pages.

Your partner must repeat the same process in your repository.

### Important rules

- The Pull Request must be created from your own dedicated GitHub account.
- Use your own student ID in `contribution.json`.
- Do not modify your partner's Task Manager functionality unnecessarily.
- Do not create your own `contribution.html` and `contribution.json` directly in your repository. Your partner must provide them through a Pull Request.
- The Pull Request must be merged by the receiving repository owner.
- Both contributions must be completed and merged.

A Pull Request that remains open without being merged does not complete the collaboration requirement.

## 12. Expected Result

Each student should have three working public resources.

### Main application

`https://USERNAME.github.io/vistula-task-manager/`

A working Task Manager connected to Supabase.

### Contributor page

`https://USERNAME.github.io/vistula-task-manager/contribution.html`

A page created by another student that displays the contributor's student ID after clicking the button.

### Contributor JSON

`https://USERNAME.github.io/vistula-task-manager/contribution.json`

A JSON file containing the ID of the student who created the incoming Pull Request.

The contributor ID must match the Vistula student ID associated with the GitHub account that authored the Pull Request.

The repository owner and contributor must be two different students.

---

# Evaluation

## 13. Minimum Requirements for Grade 3.0

This assignment defines the minimum practical requirements for grade 3.0.

### Individual application

- Working HTML/JavaScript frontend.
- Public GitHub Pages deployment.
- Supabase database integration.
- Working CRUD operations.
- Persistent task storage.
- Required HTML elements and file structure.

### Team collaboration

- Your own Pull Request merged into another student's repository.
- Another student's Pull Request merged into your repository.
- Working `contribution.html` page.
- Working `contribution.json` file.
- Correct contributor student ID.
- Publicly verifiable GitHub Pull Request history.

Both parts are required to complete the assignment.

The application does not need advanced styling, authentication or additional features.

**Correct functionality and successful collaboration are more important than visual appearance.**

Projects may be checked automatically, including their deployed pages, REST endpoints, GitHub repositories and Pull Request history.

Your `README.md` should include the links to both merged Pull Requests, making the collaboration easy to verify.

## 14. Suggested Deadline

**Sunday, 8 November 2026, 23:59**

This is a suggested deadline for students who would like to complete the assignment early.

**It is not the final submission deadline.** The final deadline will be announced separately.

You may continue improving your application after the suggested date.

You are encouraged to start working on the project and coordinate with a partner as soon as possible.

If you encounter technical difficulties, please report them by email or discuss them during the next laboratory session.

---

# Final Submission in Platon

## 15. How to Submit Your Solution

To submit your assignment, provide **one link to your working application** hosted on GitHub Pages.

The URL must follow this exact format:

`https://USERNAME.github.io/vistula-task-manager/`

Replace `USERNAME` with your GitHub username.

**The link must open your own main Task Manager page (**`**index.html**`**).**

Before submitting, make sure that:

1. Your Task Manager application works correctly.
2. Your database connection and CRUD operations work.
3. Your main page contains a working link to `contribution.html`.
4. Your contribution page and JSON file are publicly accessible.
5. Your GitHub repository contains the source code.
6. Both required Pull Requests have been merged.
7. Your `README.md` includes the links to both Pull Requests.

The repository and other required resources will be identified using your GitHub username and the fixed repository structure.

**Submit ONLY the URL of your working application in Platon.**
No ZIP files, screenshots or additional links are required.
