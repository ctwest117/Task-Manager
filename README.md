# Task Manager

A simple task manager built with React, Vite, and CSS.

## Features

- Add tasks and click a task to toggle its completion.
- Filter by all, completed, or incomplete tasks.
- Delete individual tasks or clear the entire list.
- View total, completed, and incomplete task counts.
- Responsive layout with a blue gradient and a scrollable task list.

Tasks are stored in React state and reset when you refresh the page.

## Run locally

Install Node.js and npm, then run these commands from the project folder:

```sh
npm install
npm run dev
```

Open the local URL printed by Vite in your terminal.

## Other commands

| Command | Description |
| --- | --- |
| `npm run build` | Create a production build in `dist/`. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Check the code with ESLint. |

## Project files

- `src/App.jsx` — task state, components, and interactions.
- `src/index.css` — layout and styling.
- `src/main.jsx` — React entry point.
- `index.html` — HTML shell.
