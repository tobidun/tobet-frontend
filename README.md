# Frontend Architecture

Feature-based architecture for the premium sportsbook platform.

## Directory Structure

```
frontend/
├── app/                # Next.js 16 App Router (route groups & entry points only)
├── components/         # Reusable UI components (shadcn/ui + layout + shared)
├── config/             # Application configuration (site metadata, query defaults)
├── constants/          # Domain constants (sports, odds formats, regions, limits)
├── features/           # Feature-based modules (domain-driven)
├── hooks/              # Global custom React hooks
├── lib/                # Third-party wrappers (API client, auth, query utilities)
├── providers/          # App-level context providers
├── services/           # Agnostic API service layer
├── store/              # Zustand global state
├── styles/             # Tailwind extensions & design tokens
├── types/              # Global TypeScript type definitions
└── utils/              # Pure utility functions
```

## Principles

- **Feature isolation**: Each feature in `features/` owns its components, hooks, types, API layer, and state slice.
- **Shared below, composed above**: Shared UI lives in `components/`, not duplicated across features.
- **Barrel exports**: Use `index.ts` files to expose clean public APIs per domain.
- **No business logic in UI**: Components remain presentational; logic lives in hooks or services.
# tobet-frontend
