# Phase 2: Frontend Setup

## 1. Goal

Create the React frontend foundation for DrapeAI and make the local development server available. This phase focuses on architecture, routing, layouts, reusable UI, theme setup, environment configuration, and developer tooling.

## 2. What We Are Building

- Vite React TypeScript app
- Tailwind CSS configuration
- React Router setup
- TanStack Query provider
- Public, authenticated, and admin layout placeholders
- Navbar, footer, and sidebar placeholder
- Reusable UI components
- Axios API client
- Environment configuration
- ESLint and Prettier
- Landing, About, Contact, FAQ, Login, Register, Dashboard, Error, and 404 pages

## 3. Folder Structure

```text
frontend
├── src
│   ├── assets
│   ├── components
│   │   ├── navigation
│   │   └── ui
│   ├── config
│   ├── constants
│   ├── context
│   ├── hooks
│   ├── layouts
│   ├── pages
│   │   ├── auth
│   │   ├── dashboard
│   │   ├── errors
│   │   └── public
│   ├── router
│   ├── services
│   ├── styles
│   ├── types
│   ├── utils
│   ├── main.tsx
│   └── vite-env.d.ts
├── .env.example
├── .prettierrc
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## 4. Required Packages

Runtime:

- react
- react-dom
- react-router-dom
- axios
- react-hook-form
- zod
- @hookform/resolvers
- @tanstack/react-query
- framer-motion
- lucide-react

Development:

- vite
- typescript
- tailwindcss
- postcss
- autoprefixer
- @vitejs/plugin-react
- @types/react
- @types/react-dom
- eslint
- prettier
- typescript-eslint
- eslint-plugin-react-hooks
- eslint-plugin-react-refresh
- eslint-config-prettier

## 5. Code

The frontend code lives in `frontend/src`.

Important files:

- `src/main.tsx`: starts React and adds the Query provider
- `src/router/index.tsx`: defines frontend routes
- `src/layouts/PublicLayout.tsx`: public site shell
- `src/layouts/AuthenticatedLayout.tsx`: dashboard shell placeholder
- `src/layouts/AdminLayout.tsx`: admin shell placeholder
- `src/components/ui`: reusable UI primitives
- `src/services/apiClient.ts`: reusable Axios client
- `src/config/env.ts`: environment helper

## 6. Explanation

Vite gives us a fast React development server. TypeScript helps catch mistakes before the browser sees them. Tailwind gives us a consistent design system. React Router lets the app move between pages without full page reloads. TanStack Query is added early because later phases will fetch API data from FastAPI. Axios is configured now so backend calls have one central client later. ESLint and Prettier keep code quality consistent as the team grows.

## 7. Testing Instructions

From the `frontend` folder:

```powershell
npm.cmd install
npm.cmd run lint
npm.cmd run build
npm.cmd run dev
```

Then open:

```text
http://localhost:5173
```

## 8. Common Mistakes

- Running `npm` instead of `npm.cmd` when PowerShell script execution is blocked.
- Forgetting to install dependencies before running Vite.
- Editing route paths without updating navigation links.
- Putting API business logic directly inside React components.

## 9. Git Commit Message

```text
feat: set up React frontend foundation
```

## 10. Next Phase Preview

Phase 3 will set up the FastAPI backend with configuration, environment variables, and the initial health endpoint.
