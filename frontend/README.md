# AgriTrust Frontend

A React + Vite frontend for the AgriTrust agricultural marketplace platform.

## Project Description

AgriTrust is a peer-to-peer agricultural marketplace that connects farmers directly with buyers, ensuring fair prices through escrow-based transactions and transparent reputation systems.

## Technology Stack

- **React 19** — UI library
- **Vite 8** — Build tool and dev server
- **React Router DOM 7** — Client-side routing
- **Tailwind CSS 3** — Styling
- **Axios** — HTTP client
- **Lucide React** — Icon library

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Preview

```bash
npm run preview
```

## Linting

```bash
npm run lint
```

## Environment Variables

| Variable               | Description         | Default                              |
| ---------------------- | ------------------- | ------------------------------------ |
| `VITE_API_BASE_URL`    | Backend API base URL | `http://localhost:8080/api`          |

Copy `.env.example` to `.env` and adjust as needed.

## Folder Structure

```
src/
├── components/
│   ├── common/       # Reusable foundation components (Button, Input, Card, etc.)
│   ├── website/      # Website-specific components (Navbar, Footer, Hero, etc.)
│   ├── auth/         # Authentication components (Form, RoleSelector, PasswordInput, etc.)
│   ├── dashboard/    # Shared dashboard components (Sidebar, Header, etc.)
│   ├── farmer/       # Farmer-specific components
│   ├── buyer/        # Buyer-specific components
│   └── admin/        # Admin-specific components
├── layouts/          # Layout components (Public, Auth, Dashboard)
├── pages/
│   ├── website/      # Public website pages
│   ├── auth/         # Authentication pages
│   ├── farmer/       # Farmer dashboard pages
│   ├── buyer/        # Buyer dashboard pages
│   └── admin/        # Admin dashboard pages
├── routes/           # Routing components (AppRoutes, ProtectedRoute, RoleRoute)
├── context/          # React contexts (AuthContext, AppContext)
├── hooks/            # Custom hooks (useAuth, useApi, useDebounce)
├── services/         # API service layer (api, authService, etc.)
├── utils/            # Utility functions (formatters, validators, helpers)
├── constants/        # Application constants (roles, routes, app)
├── data/mock/        # Mock data for development
└── assets/           # Static assets (icons, images, logos)
```

## Notes

This is the foundation stage. Authentication, backend integration, and full UI implementation will be added incrementally in subsequent stages.
