# Global State (Zustand)

Application-wide client-side state management.

## Structure

- `slices/` — Domain-specific Zustand slices
- `middleware/` — Persist, devtools, or logger middleware
- `index.ts` — Root store composed from slices

## Slices

- `auth.slice.ts` — Session, user profile, auth status
- `bets.slice.ts` — Active bet slip, selections
- `ui.slice.ts` — Theme, sidebar state, modals

## Rules

- Features may import from `store/` but should prefer local feature state when possible.
- Keep slices serializable where persistence is required.
