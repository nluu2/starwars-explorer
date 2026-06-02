# Star Wars Explorer

## Architecture

- Monorepo using pnpm workspaces
- React + TypeScript
- Mantine UI
- MobX
- Storybook
- Jest

## Packages

- apps/web: pages, routing, composition
- ui: Mantine component extensions, CSS Modules, Sotrybook
- api: axios client, service functions
- store: MobX stores, cache logic
- domain: TypeScript types / interfaces for all SWAPI entities
- utils: shared helpers