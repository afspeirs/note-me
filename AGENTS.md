# AGENTS.md

## Overview & Architecture

- **Tech Stack**: Svelte 5 (runes & `svelte/reactivity`), SvelteKit 2, Tailwind CSS v4 (`@tailwindcss/vite`), Vite 8, Bits UI, IndexedDB (`idb`), Vite PWA.
- **Storage**: Local-first Markdown editor using browser File System Access API (`window.showDirectoryPicker()`) with folder handles stored in IndexedDB (`note-me-file-system-db`).
- **Deployment**: `@sveltejs/adapter-netlify`. Git pushes do not trigger Netlify builds directly (`netlify.toml` ignores direct commits); GitHub Actions triggers Netlify build hooks upon release (`.github/workflows/release.yml`).

## Verification Commands

- **Type Check**: `npm run check` (executes `svelte-kit sync && svelte-check`). Always sync before type checking when routes or generated types change.
- **Lint**: `npm run lint` (`eslint .`).
  - Strict `@stylistic` rules: 2-space indents, single quotes, mandatory semicolons, multi-line trailing commas (`always-multiline`), `(x) => ...` arrow parens.
  - Strict standard rules: `no-console` enforced (use `// eslint-disable-line no-console` where logging/error handling is necessary), `eqeqeq`, `no-nested-ternary`.
- **E2E Testing**: `npm test` (starts dev server and runs Cypress headless via `start-server-and-test`). Run `npm run test:e2e` for Cypress directly (requires `http://localhost:5173` running).
- **Build**: `npm run build`

## Codebase Quirks

- **App Versioning**: `package.json` version is injected via Vite as `import.meta.env.APP_VERSION`. `semantic-release` updates version via `./scripts/release-update-version.sh <version>`.
- **ESLint & Cypress Config**: Root `eslint.config.js` uses `./tsconfig.json` for all `**/*.ts` files, while Cypress tests use `cypress/tsconfig.json`.

## Svelte MCP server

You are able to use the Svelte MCP server, where you have access to comprehensive Svelte 5 and SvelteKit documentation. Here's how to use the available tools effectively:

### Available Svelte MCP Tools:

### 1. list-sections

Use this FIRST to discover all available documentation sections. Returns a structured list with titles, use_cases, and paths.
When asked about Svelte or SvelteKit topics, ALWAYS use this tool at the start of the chat to find relevant sections.

### 2. get-documentation

Retrieves full documentation content for specific sections. Accepts single or multiple sections.
After calling the list-sections tool, you MUST analyze the returned documentation sections (especially the use_cases field) and then use the get-documentation tool to fetch ALL documentation sections that are relevant for the user's task.

### 3. svelte-autofixer

Analyzes Svelte code and returns issues and suggestions.
You MUST use this tool whenever writing Svelte code before sending it to the user. Keep calling it until no issues or suggestions are returned.

### 4. playground-link

Generates a Svelte Playground link with the provided code.
After completing the code, ask the user if they want a playground link. Only call this tool after user confirmation and NEVER if code was written to files in their project.
