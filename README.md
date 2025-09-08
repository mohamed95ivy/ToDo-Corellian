# Realtime TODO (ASP.NET Core + GraphQL + React + Relay + Docker)

## Overview
- **Backend:** ASP.NET 9, Hot Chocolate GraphQL, EF Core, SQLite
- **Frontend:** React (Vite), Relay, React Spectrum UI
- **Realtime:** GraphQL Subscriptions (websockets)
- **Containerization:** Dockerfiles + Docker Compose (api, web, db volume)

## GraphQL Schema (SDL)
```graphql
schema { query: Query, mutation: Mutation, subscription: Subscription }
enum Status { Pending Completed }
type TaskItem { id: ID!, title: String!, description: String!, status: Status! }
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
