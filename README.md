# TeamFlow

TeamFlow is a full-stack project management application being developed as a personal software engineering project.

The project is designed to provide a practical environment for building and demonstrating modern backend, frontend, database, authentication, authorization, and software engineering concepts.

TeamFlow is currently in active development. Features, architecture, database structure, and implementation details may change as development progresses.

## Project Overview

TeamFlow is centered around collaborative workspace-based project management.

The application is being designed around the following core concepts:

- Users can authenticate and manage their accounts.
- Users can belong to multiple workspaces.
- Workspaces provide the multi-tenant boundary for application data.
- Workspace members have different roles and permissions.
- Workspaces contain projects.
- Projects contain tasks.
- Tasks can be assigned to workspace members and organized using status, priority, due dates, and labels.
- Users can collaborate through task comments.
- Important task changes can be recorded through activity logs.
- Task updates can use optimistic concurrency to reduce conflicting modifications.
- Tasks can be searched, filtered, sorted, and paginated.

## Goals

The main goals of TeamFlow are:

- Build a realistic full-stack application rather than isolated practice projects.
- Develop practical experience with backend API design.
- Develop practical experience with relational database modeling.
- Apply authentication and authorization concepts in a real application.
- Practice multi-tenant application design.
- Build and query relational data using Prisma.
- Develop a typed frontend using modern React and Next.js patterns.
- Practice Git-based feature development and pull-request workflows.
- Apply testing, validation, error handling, logging, and CI practices.
- Produce a project that can demonstrate software engineering concepts through its implementation and architecture.

## Planned Technology Stack

### Backend

- NestJS
- TypeScript
- Prisma ORM
- MySQL / MariaDB
- JWT-based authentication
- Passport
- bcrypt
- class-validator
- class-transformer

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### Development and Quality

- Git
- GitHub
- Jest
- Playwright
- GitHub Actions

## Architecture

TeamFlow is planned as a monorepo containing separate backend and frontend applications.

The backend is responsible for:

- Authentication
- Authorization
- Business rules
- API endpoints
- Database access
- Data validation
- Workspace isolation
- Task management
- Collaboration features

The frontend is responsible for:

- Authentication interfaces
- Workspace interfaces
- Project interfaces
- Task management interfaces
- Search and filtering interfaces
- User interaction and presentation

The backend remains the source of truth for authentication, authorization, validation, and business rules.

## Multi-Tenancy

TeamFlow is designed around workspace-based multi-tenancy.

A workspace represents an isolated area containing its own projects, tasks, members, labels, and related data.

Users gain access to workspace data through workspace membership.

Workspace membership includes a role that determines the user's permissions within that workspace.

The planned roles are:

- OWNER
- ADMIN
- MEMBER

Workspace-aware authorization is intended to ensure that users cannot access or modify data belonging to workspaces where they do not have membership.

## Core Domain Model

The planned database structure is centered around the following entities:

### User

Represents an individual TeamFlow account.

A user contains account information and participates in workspace membership, task assignment, comments, and activity records.

### Workspace

Represents a collaborative organization or working area.

A workspace acts as the primary tenant boundary for projects and other workspace-owned resources.

### WorkspaceMember

Represents the relationship between a user and a workspace.

This entity stores workspace membership and the member's role.

### Project

Represents a project within a workspace.

Projects organize related tasks and provide an additional structure inside a workspace.

### Task

Represents an individual unit of work.

Tasks are associated with projects and can contain:

- Title
- Description
- Status
- Priority
- Assignee
- Due date
- Version information
- Creation and update timestamps

### ActivityLog

Represents historical activity associated with important actions in the system.

Activity records are intended to provide an audit trail for relevant task changes and other significant actions.

### Label

Represents a reusable workspace-level classification for tasks.

Labels can be used to organize and categorize tasks.

### TaskLabel

Represents the many-to-many relationship between tasks and labels.

A task can have multiple labels, and a label can be associated with multiple tasks.

### Comment

Represents user-generated discussion associated with a task.

Comments are associated with both the task and the user who created them.

## Planned Features

### Authentication and User Management

The authentication system is planned to support:

- User registration
- Password hashing
- User login
- JWT authentication
- Protected routes
- Authentication-aware requests
- Logout handling
- Request validation

### Workspaces and Multi-Tenancy

The workspace system is planned to support:

- Workspace creation
- Workspace listing
- Workspace access control
- Workspace membership
- Workspace roles
- Membership validation
- Tenant isolation

### Projects

The project management system is planned to support:

- Project creation
- Project listing
- Project retrieval
- Project updates
- Project deletion
- Workspace-based project access
- Membership and role-based authorization

### Tasks

The task system is planned to support:

- Task creation
- Task retrieval
- Task updates
- Task deletion
- Project association
- User assignment
- Status management
- Priority management
- Due dates
- Task filtering
- Task sorting
- Pagination

### Task Business Rules

Task management is planned to include business rules beyond basic CRUD operations.

These include:

- Controlled status transitions
- Optimistic concurrency
- Version-based update protection
- Activity logging
- Transactional task updates
- Authorization checks during task operations

### Member Management

Workspace member management is planned to support:

- Adding members
- Changing member roles
- Removing members
- Permission checks
- Protection against removing the last workspace owner

### Labels and Comments

Collaboration features are planned to include:

- Workspace labels
- Task-label associations
- Label management
- Task comments
- Comment retrieval
- Comment creation
- Workspace-aware authorization

### Search, Filtering, Sorting, and Pagination

Task retrieval is planned to support dynamic querying using parameters such as:

- Status
- Priority
- Assignee
- Search text
- Page
- Limit
- Sorting

The database structure will also be optimized with indexes where appropriate to support common query patterns.

## Database Design

Prisma is being used as the ORM and database access layer.

The database design emphasizes:

- Relational integrity
- Foreign-key relationships
- Unique constraints
- Enumerated values
- Optional and required fields
- Indexes
- Timestamps
- Explicit many-to-many relationships
- Workspace-level data isolation

Database changes are intended to be managed through Prisma migrations as the project develops.

## API Design

The backend is being developed as a REST-style API organized around domain-specific modules.

Planned API areas include:

- `/auth`
- `/users`
- `/workspaces`
- `/projects`
- `/tasks`
- `/members`
- `/labels`
- `/comments`

The API is being designed around:

- DTO-based request contracts
- Runtime validation
- Authentication guards
- Authorization checks
- Consistent HTTP status codes
- Structured error handling
- Resource-oriented endpoints

## Security

Security is an important part of the project design.

Planned security-related considerations include:

- Password hashing
- JWT authentication
- Protected API routes
- Role-based authorization
- Workspace isolation
- Input validation
- Protection against unauthorized resource access
- Safe handling of environment secrets
- Consistent error handling without exposing internal database details

## Testing

Testing is planned across multiple levels.

### Unit Testing

Unit tests are intended to cover important business logic and services such as:

- Authentication
- Task management
- Membership management
- Authorization logic

### Integration Testing

Integration tests are intended to verify interactions between:

- Controllers
- Services
- Prisma
- The database

### End-to-End Testing

A complete application flow is planned to cover the main user journey from authentication through workspace, project, task, assignment, and collaboration features.

## Development Workflow

TeamFlow is being developed using short-lived feature branches.

The planned branch structure follows the major application features:

- `feature/auth`
- `feature/workspaces`
- `feature/projects`
- `feature/tasks-core`
- `feature/tasks-rules`
- `feature/members`
- `feature/labels-comments`
- `feature/search-filter`
- `feature/frontend-core`
- `feature/quality`

The intended workflow is:

`feature branch → implementation → testing/self-review → pull request → merge to main`

Each branch represents a focused feature or development area rather than one large long-running development branch.

## Current Development Status

TeamFlow is still under development.

The initial Prisma and NestJS learning work has covered:

- Prisma schema modeling
- Prisma Client
- Prisma service integration with NestJS
- User modeling
- Task modeling
- User-to-task relationships
- Task creation
- Task retrieval
- Prisma `select`
- Prisma `include`
- Filtering
- Sorting
- Pagination
- Record counting
- Combined filtering and pagination

The remaining application functionality is being developed incrementally through the planned feature branches.

The database schema, API structure, frontend structure, and feature set may evolve during development as implementation and testing reveal areas that need refinement.

## Project Structure

The planned project structure separates backend and frontend concerns.

```text
teamflow/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   └── src/
│       ├── auth/
│       ├── users/
│       ├── workspaces/
│       ├── projects/
│       ├── tasks/
│       ├── members/
│       ├── labels/
│       ├── comments/
│       ├── activity/
│       ├── common/
│       └── prisma/
│
├── frontend/
│   └── src/
│       ├── app/
│       ├── components/
│       ├── lib/
│       └── types/
│
├── test/
├── .github/
├── docker-compose.yml
└── README.md
```

## Project Status

**Status: In Development**

TeamFlow is currently being built incrementally, with the database and backend serving as the primary learning and development focus before the frontend and final quality-hardening stages.

The architecture described in this document represents the current planned direction of the project and is subject to change during development.