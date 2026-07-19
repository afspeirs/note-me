# NoteMe

[![Netlify Status][netlify-status-sheild]][netlify-status-url]
[![Github package.json version][package-version-shield]][github-url]
[![LICENSE][license-shield]][license-url]

Create and store markdown notes

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Available Scripts](#available-scripts)
- [Acknowledgements](#acknowledgements)
- [License](#license)

## Features

- **Local-First Storage:** Directly read and write your markdown notes to any directory on your computer using the File System Access API.
- **Privacy Focused:** Your notes never leave your machine or get sent to third-party servers.
- **Progressive Web App (PWA):** Installable on desktop and mobile, with full offline capabilities using service workers.
- **Tech Stack:** Powered by Svelte, Tailwind CSS v4, Vite, and IndexedDB for persistence.

## Getting Started

### Prerequisites

This project uses Node and NPM.
To install Node, I recommend using [nvm](https://github.com/nvm-sh/nvm) for easy management of node versions.

### Installation

1. Clone the repo
2. Install the dependencies with `npm install`

## Available Scripts

In the project directory, you can run the following commands:

### Development and Production

- `npm run dev` (or `npm run start`): Starts the development server with Vite at `http://localhost:5173`.
- `npm run build`: Compiles the application for production, outputting static files optimized for Netlify.
- `npm run preview`: Locally previews the production build.
- `npm run pwa`: Builds and previews the production site to test Progressive Web App functionality.

### Linting and Type Checking

- `npm run check`: Syncs SvelteKit types and runs `svelte-check` to type-check your code.
- `npm run check:watch`: Runs Svelte type-checking in watch mode.
- `npm run lint`: Runs ESLint to check for linting and style issues.
- `npm run type`: Runs type-checking (alias for `npm run check`).

### Testing

- `npm test`: Starts the development server and runs Cypress E2E tests.
- `npm run test:e2e`: Runs Cypress end-to-end tests in headless mode.
- `npm run test:open`: Opens the interactive Cypress Test Runner.

### Versioning and Releases

- `npm run semantic-release:dry`: Simulates a release dry-run using semantic-release.

### Managing Dependencies

- `npm run outdated`: Checks for outdated packages.
- `npm run outdated:minor`: Checks for outdated packages up to minor updates.
- `npm run update`: Interactively updates outdated packages.
- `npm run update:minor`: Updates outdated packages only to their next minor version.

## Acknowledgements

A special thanks to [Devisha Bijwe](https://www.linkedin.com/in/devishabijwe) for designing the logo.

## License

[ISC License](/LICENSE.txt) © Andrew Speirs

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[netlify-status-sheild]: https://img.shields.io/netlify/5c3fcfd1-3410-451b-ae2c-82cd72888332?style=for-the-badge&color=ee6e00
[netlify-status-url]: https://app.netlify.com/sites/noteme/deploys
[license-shield]: https://img.shields.io/github/license/afspeirs/note-me?style=for-the-badge&color=ee6e00
[license-url]: LICENSE.txt
[package-version-shield]: https://img.shields.io/github/package-json/v/afspeirs/note-me?style=for-the-badge&color=ee6e00
[github-url]: https://github.com/afspeirs/note-me
