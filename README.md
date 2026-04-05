# FinTrack – Finance Dashboard UI

FinTrack is a Zorvyn assigned task with clean and interactive finance dashboard designed to help users quickly understand their financial activity. The focus of this project is on building an intuitive UI, organizing components well, and managing state effectively.

While building this project, my main focus was to keep things clean, intuitive, and scalable rather than overcomplicating the solution.

I chose React because it allowed me to break the UI into small, reusable components like cards, charts, and transaction lists. This made the app easier to structure and extend as I kept building features step by step.

For styling, I went with Tailwind CSS and experimented with a glassy UI feel to make the dashboard visually appealing without adding unnecessary complexity. It helped me move fast and maintain consistency across the UI.

State management is handled using Redux Toolkit, mainly because multiple parts of the app depend on shared data (transactions, filters, and role). Instead of passing props everywhere, Redux helped keep things organized and predictable.

I also tried to keep logic separate from UI by using custom hooks for filtering and derived data, so components stay clean and focused only on rendering.

One conscious decision was to not integrate a backend and rely on mock data. This let me spend more time improving the frontend experience interactions, structure, and usability which was the core goal of the assignment. I also kept charts and insights simple to avoid overengineering.

---

## Live Demo

https://zorvyn-fin-task.vercel.app/

---

## Features

### Dashboard Overview
Gives a quick snapshot of finances through summary cards like balance, income, and expenses. Visual charts help users understand trends over time and how their spending is distributed across categories.

### Transactions
Displays all transactions in a structured list with key details. Users can search, filter, and sort data easily, making it simple to explore financial activity without feeling overwhelmed.

### Role-Based UI (Simulated)
The UI changes based on the selected role. A viewer can only see data, while an admin gets additional controls to add or edit transactions. This is implemented purely on the frontend for demonstration.

### Insights
Provides simple but meaningful observations from the data, such as where most money is spent or how spending changes over time. Helps users quickly understand patterns without deep analysis.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React | Building reusable and modular UI components |
| Redux Toolkit | Managing application state in a clean and predictable way |
| Tailwind CSS | Fast and consistent styling |
| Mock Data | Simulating real financial data without backend dependency |

---

## Getting Started

### Prerequisites

Make sure you have **Node.js** and **npm** installed on your machine.

### Installation

```bash
# Clone the repository
git clone https://github.com/jeevan10017/Zorvyn-task

# Navigate into the project directory
cd fintrack

# Install dependencies
npm install

# Start the development server
npm start
```

Open your browser and go to:

```
http://localhost:5173
```

---



## Role-Based Access

| Role | Permissions |
|---|---|
| Viewer | Read-only access to all dashboard data |
| Admin | Full access including add and edit transaction controls |

Role switching is handled entirely on the frontend for demonstration purposes.

