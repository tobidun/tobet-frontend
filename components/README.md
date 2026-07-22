# Components

Shared, reusable UI primitives and layout shells.

## Structure

- `ui/` — shadcn/ui primitives and design-system atoms (Button, Input, Card, etc.)
- `layout/` — Application shell: Header, Footer, Sidebar, MobileNav, Container
- `providers/` — Context providers that wrap the app (Theme, Auth, Query)
- `shared/` — Cross-cutting presentational components used by multiple features

## Rules

- Components here must be agnostic to feature business logic.
- Use `components/ui/` for unstyled / lightly styled primitives.
- Use `components/layout/` for structural wrappers only.
