# TaskFlow

TaskFlow is a responsive task and project management dashboard built with **HTML, CSS, and JavaScript**.

It allows users to create, organize, filter, sort, edit, and delete tasks while tracking project progress and overall task statistics.

## Features

* Create and manage tasks
* Edit and delete existing tasks
* Assign tasks to projects
* Set task priority

  * High
  * Medium
  * Low
* Set task status

  * To Do
  * In Progress
  * Completed
* Set and validate due dates
* Automatic overdue task detection
* Task completion rate tracking
* Priority-wise task statistics
* Recent tasks section
* Project progress tracking
* Individual project cards
* Project-based task filtering
* Search tasks by title
* Sort tasks by:

  * Newest
  * Oldest
  * Due Soon
  * Due Late
  * Priority
* Multiple task filters
* Reset filters
* Dark mode
* Persistent data using Local Storage
* Responsive dashboard interface

## Technologies Used

* HTML5
* CSS3
* JavaScript
* Local Storage
* DOM Manipulation

## Project Structure

```text
TaskFlow/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

## Data Persistence

TaskFlow uses the browser's **Local Storage** to save tasks.

This means tasks remain available even after refreshing or reopening the browser on the same device and browser.

## Dashboard

The dashboard provides an overview of:

* Total tasks
* Completed tasks
* Pending tasks
* Overdue tasks
* Completion rate
* Priority distribution
* Recent tasks
* Project progress

## Projects

TaskFlow currently includes five predefined projects:

* Personal
* College
* Web Development
* Python
* DSA

Each project displays its completion percentage, progress bar, and completed-task count.

Users can also navigate directly from a project card to the Tasks view with that project automatically selected.

## Dark Mode

TaskFlow includes a built-in dark mode that can be toggled from the dashboard.

## Getting Started

Clone the repository:

```bash
git clone <your-repository-url>
```

Open the project folder and launch `index.html` in a browser.

No external dependencies or installation steps are required.

## Future Improvements

Possible future additions include:

* Custom project creation
* Task categories
* Subtasks
* Task dependencies
* Drag-and-drop task management
* Task notifications
* Cloud/database storage
* User authentication
* Backend integration

## Author

**Pratham Gupta**

Built as a frontend project to practice JavaScript, DOM manipulation, Local Storage, validation, filtering, sorting, and UI state management.
