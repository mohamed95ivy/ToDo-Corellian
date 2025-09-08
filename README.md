# Realtime TODO App

Full-stack TODO application with **ASP.NET Core + GraphQL + React + Relay + Docker**.  
Supports **create, update, and realtime sync** via GraphQL Subscriptions.

---

## 🚀 Tech Stack
- **Backend:** ASP.NET Core 9, Hot Chocolate GraphQL, EF Core, SQLite
- **Frontend:** React (Vite + TypeScript), Relay, React Spectrum UI
- **Realtime:** GraphQL Subscriptions (WebSockets)
- **Deployment:** Dockerfiles + Docker Compose

---

## 📦 How to Run

### 1) Docker (recommended)
```bash
docker compose up --build
# Web: http://localhost:5173
# API: http://localhost:5292/graphql
```
### 2) Local Dev

Backend
```bash
cd ToDo.Api
dotnet run
# API at http://localhost:5292/graphql
```
Frontend
```bash
cd todo-web
# .env file:
# VITE_GRAPHQL_HTTP=http://localhost:5292/graphql
# VITE_GRAPHQL_WS=ws://localhost:5292/graphql
npx relay-compiler --watchman false
npm run dev
# Web at http://localhost:5173
```

📜 GraphQL Schema (SDL)

```bash
enum Status { Pending Completed }

type TaskItem {
  id: ID!
  title: String!
  description: String!
  status: Status!
}

type Query { getAllTasks: [TaskItem!]! }

input CreateTaskInput { title: String!, description: String }

type TaskPayload { task: TaskItem! }

type Mutation {
  createTask(input: CreateTaskInput!): TaskPayload!
  updateTaskStatus(id: ID!, status: Status!): TaskPayload!
}

type Subscription {
  taskCreated: TaskItem!
  taskUpdated: TaskItem!
}
```
### 2) 🧪 Quick Test in GraphQL UI

```bash
# Get all tasks
query { getAllTasks { id title status } }

# Create
mutation {
  createTask(input: { title: "New Task", description: "Test" }) {
    task { id title status }
  }
}

# Update
mutation($id: ID!) {
  updateTaskStatus(id: $id, status: Completed) { task { id status } }
}

# Subscribe
subscription { taskCreated { id title status } }
```

### 3) ⚡ Features
- Create + toggle task status
- Realtime updates across browser tabs
- SQLite persistence (volume-mounted in Docker)
- Works locally & in containers

### 4) 🧠 AI Tools Used
- ChatGPT (GPT-5) for scaffolding GraphQL schema, Relay config, CORS/WS setup, and Dockerfiles.
- Used AI to speed up boilerplate and debugging → Focused on core logic & realtime integration.

### 5) Approach
🧠 My Approach to Problem-Solving

I approached this assessment in incremental phases:

Backend API & Data Model

Created TaskItem entity (ID, Title, Description, Status).

Added GraphQL schema with getAllTasks, createTask, updateTaskStatus, and real-time taskCreated/taskUpdated subscriptions.

Used SQLite for persistence (works locally + in Docker).

Frontend with Relay

Configured Relay with Vite (vite-plugin-relay) for GraphQL queries/mutations/subscriptions.

Built UI with Adobe React Spectrum: form for new tasks + task list with toggle buttons.

Used refetch on create for reliability and subscriptions for cross-tab updates.

Dockerization

Separate Dockerfiles for API and frontend.

Docker Compose orchestrates API + frontend + SQLite volume for persistence.

Real-time Sync

Used Hot Chocolate’s AddInMemorySubscriptions() and UseWebSockets() for subscriptions.

Client uses Relay requestSubscription for real-time updates.

Final Polish

Added CORS config for local + Docker environments.

Added README with setup, schema, and testing instructions.