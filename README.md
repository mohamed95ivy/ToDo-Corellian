# Realtime TODO App

Full-stack TODO application with **ASP.NET Core + GraphQL + React + Relay + Docker**.  
Supports **create, update, and realtime sync** via GraphQL Subscriptions.

---

## 🚀 Tech Stack
- **Backend:** ASP.NET Core 8, Hot Chocolate GraphQL, EF Core, SQLite
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