# Library Wrappers

Thin, application-wide wrappers around third-party libraries and platform utilities.

## Structure

- `api/` — HTTP client configuration, interceptors, endpoint definitions
- `auth/` — Auth client wrappers (e.g., NextAuth / Clerk / custom)
- `query/` — React Query client setup, typed query/mutation helpers
- `utils/` — Library-agnostic helpers (cn, format, date)

## Rules

- Keep wrappers thin. Do not embed business logic here.
- Re-export typed helpers from `index.ts` for consumption by features.
