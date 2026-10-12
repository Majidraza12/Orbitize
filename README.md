# Orbitize

A full-stack project management app for small teams. Create projects, invite teammates, assign tasks, and keep a running commit-style log of how each project evolves.

Built with Next.js 15 (App Router), TypeScript, Supabase, Tailwind CSS, and shadcn/ui.

## Features

- **Authentication**: email and password sign up, login, logout, and forgot/reset password flows via Supabase Auth. Middleware protects `/dashboard` routes and redirects signed-in users away from auth pages.
- **Projects**: create projects with a name, description, start and end dates, and status. Project names are unique. The creator is automatically added as the project `owner`.
- **Members**: add any registered user to a project by email. Members are listed alongside their roles (`owner` or `member`).
- **Tasks**: create, view, update, and delete tasks with a name, description, status, priority, category, due date, and assignee. Assignees must be members of the project.
- **Role-based actions**: only the project owner can create, update, or delete tasks and edit project details.
- **Commit log**: a lightweight, Git-inspired history per project. Members post commit messages, the latest commit is shown on the project page, and the full history lives at `/dashboard/[projectId]/commits`.
- **UI**: responsive landing page, skeleton loaders, toast notifications, and light/dark theme support.

## Tech Stack

| Layer | Tools |
| --- | --- |
| Framework | Next.js 15 (App Router, Server Actions, Turbopack dev server) |
| Language | TypeScript, React 19 |
| Backend and Auth | Supabase (Postgres, Auth, `@supabase/ssr`) |
| Styling | Tailwind CSS, shadcn/ui, Radix UI, lucide-react |
| Forms and Validation | react-hook-form, zod |
| Data and State | TanStack Query, Zustand |
| Notifications | react-hot-toast |

## Project Structure

```
.
├── actions/              # Server Actions (data layer)
│   ├── auth.ts           # sign up, login, logout, forgot/reset password
│   ├── project.ts        # create, list, get, update projects
│   ├── members.ts        # add members, list members and roles
│   ├── task.ts           # create, list, update, delete tasks
│   ├── commit.ts         # add commits, list commits, latest commit
│   └── notification.ts   # email notifications (WIP, currently disabled)
├── app/
│   ├── page.tsx          # landing page
│   ├── auth/             # login, signup, reset-password
│   └── dashboard/
│       ├── page.tsx                    # all projects for the current user
│       ├── create-project/             # new project form
│       ├── profile/                    # user profile
│       └── [projectId]/
│           ├── page.tsx                # tasks and members for a project
│           └── commits/                # full commit history
├── components/           # app components and shadcn/ui primitives
├── utils/supabase/       # browser, server, and middleware Supabase clients
├── middleware.ts         # session refresh and route protection
└── progress.txt          # dev notes and todo list
```

## Database Schema

The app expects these tables in Supabase:

| Table | Columns |
| --- | --- |
| `user_profiles` | `id`, `email`, `username` |
| `projects` | `id`, `name`, `owner_id`, `description`, `start_date`, `end_date`, `status` |
| `members` | `id`, `project_id`, `user_id` (references `user_profiles.id`), `role` |
| `tasks` | `id`, `task_name`, `description`, `projectId`, `status`, `priority`, `category`, `due_date`, `assignedToId`, `assignedToEmail`, `assignedToName` |
| `commits` | `id`, `message`, `projectId`, `authorName`, `created_at` |

A `user_profiles` row is created on a user's first login if one does not already exist.

## Getting Started

### Prerequisites

- Node.js 18.18 or later
- A Supabase project

### Installation

```bash
git clone https://github.com/Majidraza12/Orbitize.git
cd Orbitize
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Run

```bash
npm run dev     # start the dev server at http://localhost:3000
npm run build   # production build
npm run start   # serve the production build
npm run lint    # lint
```

## Roadmap

- Email notification when a user is added to a project
- Let members leave a project
- Enforce owner-only updates with Supabase Row Level Security policies
- Real-time updates for members and tasks (replace page reloads)
- Editable user profiles
- Project progress reports

## Author

**Majid Raza** ([@Majidraza12](https://github.com/Majidraza12))
