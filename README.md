# Star Wars Explorer

An interactive Star Wars universe explorer built with React, TypeScript, MobX, and Mantine UI. Browse characters, planets, films, starships, vehicles, and species from the Star Wars universe powered by swapi.

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Key Decisions](#key-decisions)
- [Setup Instructions](#setup-instructions)
- [Testing Approach](#testing-approach)
- [Challenges and Solutions](#challenges-and-solutions)
- [Future Improvements](#future-improvements)

---

## Architecture Overview

This project is a pnpm monorepo with the following structure:

```
starwars-explorer/
├── apps/
│   └── web/          # Vite + React application
└── packages/
    ├── domain/       # TypeScript interfaces only — no runtime code
    ├── api/          # Axios client + SWAPI service functions
    ├── store/        # MobX stores + React context wiring
    ├── ui/           # Mantine component library + Storybook
    └── utils/        # Shared utility functions
```

**Package dependency graph:**

```
apps/web
├── @starwars/ui
├── @starwars/store
│   ├── @starwars/api
│   │   └── @starwars/domain
│   └── @starwars/domain
└── @starwars/utils
    └── @starwars/domain
```

`@starwars/domain` is the foundation — no dependencies, exports only TypeScript types. Every other package builds on top of it.

`@starwars/ui` is completely isolated from MobX and API concerns. It only knows about domain types and prop shapes.

### State Management

MobX is used with the root store pattern. A single `RootStore` instantiates all domain stores and passes itself as a reference so stores can coordinate with each other and share the cache.

Each domain store follows the same structure:

- Observable list state and a selected entity
- Loading and error flags
- `fetchAll` — cache-first fetch with pagination and search
- `selectById` — fetches detail and resolves related entities
- `refresh` — invalidates the cache and refetches

### Data Flow

```
observer() component
→ store action called
→ CacheStore checked
    ├── cache hit (fresh)  → serve immediately
    ├── cache hit (stale)  → serve immediately + background refresh
    └── cache miss         → fetch from SWAPI → store in cache → update observables
→ MobX reactivity re-renders observer() component
```

---

## Key Decisions

- **Monorepo with isolated packages** — each layer has a clearly defined responsibility and dependency boundary
- **Service injection into stores** — makes stores fully testable without hitting the network
- **Cache-first with stale-while-revalidate** — fast loads with background freshness
- **Client-side pagination and search** — swapi.info returns full arrays, so filtering and slicing happen in the service layer

---

## Setup Instructions

**Prerequisites:** Node 18+, pnpm 8+

```bash
git clone https://github.com/nluu2/starwars-explorer.git
cd starwars-explorer
pnpm install
```

**Run the app**

```bash
pnpm dev
```

The app runs at http://localhost:5173

**Run Storybook**

```bash
cd packages/ui
pnpm storybook
```

**Run all tests**

```bash
pnpm test
```

**Run tests for a specific package**

```bash
cd packages/api && pnpm test
cd packages/store && pnpm test
cd packages/ui && pnpm test
```

**Build all packages**

```bash
pnpm build
```

---

## Testing Approach

The test suite is split across three packages, each testing a different layer of the architecture.

### API Layer (`packages/api`)

Unit tests for every service and the Axios client using `axios-mock-adapter`. Tests verify:

- Correct endpoints are called
- Search filtering works correctly
- Pagination slices results correctly
- Error responses are normalized into plain `Error` objects
- Network errors are handled gracefully

### Store Layer (`packages/store`)

State transition tests using mock services injected through `RootStore`. Tests verify:

- Initial state is correct for every store
- `fetchAll` populates list, total, and page observables on success
- `fetchAll` sets error state on failure
- Cache is used on second call with identical params
- Cache is bypassed when params differ
- `selectById` sets the selected entity and resolves related entities
- `clearSelected` resets the entity and all resolved relationships
- `refresh` invalidates the cache and triggers a new fetch

### Component Layer (`packages/ui`)

React Testing Library tests for every component. Tests verify:

- Components render their props correctly
- Loading states show a loading container and hide content
- Error states render the correct message
- Interactive elements call their callbacks
- Empty and null values are handled gracefully

---

## Challenges and Solutions

### MobX

MobX was entirely new to me going into this project. Having worked extensively with Redux and Redux Toolkit, my first step was to map the conceptual similarities and differences between the two: observables vs. reducers, actions vs. dispatchers, computed values vs. selectors. Once I had that mental model in place I was able to move quickly and apply MobX patterns with confidence. I actually found the direct mutation model and the lack of boilerplate refreshing compared to Redux.

### SWAPI Migration (swapi.dev → swapi.info)

I had been building against swapi.dev when I received a note to switch to swapi.info. The two APIs share the same general structure but differ in response shape in a few key areas — notably swapi.info returns flat arrays rather than paginated responses, which required refactoring the service layer to handle pagination client-side. It was a good reminder of why keeping API response mapping isolated from business logic matters. The abstraction layer I had in place made the migration significantly less painful than it could have been.

### Time Constraint

I was traveling over the weekend and wasn't able to start until Sunday evening, leaving roughly four full days to complete the project. I made a deliberate decision to prioritize architecture, the data layer, and the store foundation first. My view is that a well-structured core is more valuable than polished UI built on shaky ground. Given more time I would continue developing the UI, expand Storybook coverage with additional component states, and add more comprehensive tests across the application layer.

---

## Future Improvements

**Error Boundary Integration** — There are currently no top-level React error boundaries to catch unexpected render errors. Adding one would prevent a single component crash from taking down the entire app.

**Improved Accessibility** — The current implementation covers the basics. There is more work to be done with keyboard navigation, ARIA roles, and screen reader support.

**Cross-entity Relationship Navigation** — The detail panel currently shows related entities as static badges. Making these badges navigatable so you can jump directly to a related character, planet, or film would significantly improve discoverability.

**Entity Images** — The SWAPI doesn't return images. Wiring in a supplementary image service (e.g. a Star Wars image API) would make the cards and detail panels much more visually engaging.
