# Feature Modules

Each directory under `features/` represents an isolated domain capability.

## Structure

Every feature follows the same internal layout:

```
features/[feature]/
├── api/        # React Query hooks & endpoints for this feature
├── components/ # Feature-specific presentational components
├── hooks/      # Feature-specific business logic hooks
├── schemas/    # Zod validation schemas
├── store/      # Zustand slice for local feature state
├── types/      # Feature-specific TypeScript types
├── utils/      # Feature-specific helpers
└── index.ts    # Public barrel export
```

## Modules

| Module | Responsibility |
|--------|----------------|
| `auth` | Login, registration, session, password reset |
| `sportsbook` | Sports categories, markets, odds display, event browsing |
| `bets` | Bet slip, bet placement, bet history, cash-out |
| `live` | In-play events, live odds, live bet placement |
| `account` | Profile, settings, KYC, verification, responsible gambling |
| `payments` | Deposits, withdrawals, payment methods, transaction history |
| `notifications` | Push notifications, in-app alerts, email preferences |
| `search` | Event search, autocomplete, quick filters |

## Rules

- Features communicate through the `services/` layer or shared stores.
- Never import directly from another feature's internals; use its `index.ts` public API.
- Feature components should not reach into global store unless absolutely necessary.
