# TypeScript Types

Global type definitions shared across the application.

## Structure

- `api.ts` — Generic API response wrappers, error types
- `auth.ts` — User, session, token types
- `bets.ts` — Bet, selection, slip, odds types
- `sports.ts` — Sport, league, event, market types
- `common.ts` — IDs, enums, utility types (e.g., `Maybe<T>`, `DeepPartial<T>`)

## Rules

- Feature-specific types belong in `features/[feature]/types/`.
- Global types are only for concepts used in 3+ features or infrastructure layers.
- Use Zod schemas in `features/[feature]/schemas/` for runtime validation; mirror static types here when needed.
