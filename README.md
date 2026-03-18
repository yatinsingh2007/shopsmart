# ShopSmart

A modern eCommerce frontend application built with React and Vite. The app is deployed to GitHub Pages via automated GitHub Actions workflows, with separate CI, deployment, and API connectivity testing pipelines.

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 18 |
| Build Tool | Vite 7 |
| Styling | Tailwind CSS |
| Linting | ESLint 9 |
| Testing (unit) | Vitest + Testing Library |
| API Test | Node.js (custom script) |
| CI/CD | GitHub Actions |
| Hosting | GitHub Pages |

---

## Project Structure

```
shopsmart/
├── .github/
│   └── workflows/
│       ├── ci.yml              # Lint + build checks (client & server)
│       ├── deploy-pages.yml    # Deploys frontend to GitHub Pages
│       ├── api-test.yml        # Runs API connectivity test
│       └── deploy.yml          # (Render / alternate deploy)
├── client/                     # Frontend application (Vite + React)
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.test.jsx
│   │   ├── LandingPage.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   └── setupTests.js
│   ├── test/
│   │   └── api.test.js         # API connectivity test script
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── eslint.config.js
│   └── package.json
├── server/                     # Backend (separate service)
├── deploy.sh
├── render.yaml
└── README.md
```

---

## GitHub Actions Workflows

### 1. CI — `ci.yml`

**Triggers:** Push to `main`, any pull request

Runs lint and build checks for both the `client` and `server` independently, in parallel jobs.

| Job | Steps |
|---|---|
| `client` | `npm ci` → `npm run lint` → `npm run build` |
| `server` | `npm ci` → `npm run lint` → `npm run test` |

This workflow ensures code quality and build integrity on every push and PR before merging.

---

### 2. Deploy to GitHub Pages — `deploy-pages.yml`

**Triggers:** Push to `main`

Builds the React frontend and deploys the output to GitHub Pages using the official `actions/deploy-pages` action.

**Steps:**

1. Checkout repository
2. Set up Node.js 20 with npm cache
3. `npm ci` — install dependencies
4. `npm run build` — build the Vite app into `client/dist/`
5. Upload `client/dist/` as a Pages artifact
6. Deploy to GitHub Pages

> **Note:** The Vite config sets `base: "/shopsmart/"` to correctly resolve assets when served from `https://<username>.github.io/shopsmart/`.

**Required GitHub repository settings:**
- Go to **Settings → Pages** and set the source to **GitHub Actions**.
- The workflow uses `pages: write` and `id-token: write` permissions.

---

### 3. API Connectivity Tests — `api-test.yml`

**Triggers:** Push to `main`, any pull request

Runs a lightweight API reachability test against the URL stored in the `API_URL` GitHub Secret.

**Steps:**

1. Checkout repository
2. Set up Node.js 20 with npm cache
3. `npm ci` — install dependencies
4. `npm run test` — executes `test/api.test.js` with `API_URL` injected from secrets

The workflow fails the pipeline if the API endpoint is unreachable or returns a non-2xx status code.

---

## Environment Variables

### Frontend (Vite)

| Variable | Description |
|---|---|
| `VITE_API_URL` | Base URL of the API used by the React app. Prefix `VITE_` is required for Vite to expose the variable to client-side code. |

Set this in a `.env` file at the root of the `client/` directory for local development:

```env
VITE_API_URL=https://your-api-url.com
```

For production builds triggered via GitHub Actions, set this as a repository secret or variable and pass it during the build step.

---

### API Test (Node.js)

| Variable | Where to Set |
|---|---|
| `API_URL` | GitHub Repository Secret (`Settings → Secrets → Actions`) |

The `test/api.test.js` script reads `process.env.API_URL` at runtime. This is **not** a Vite variable — it is consumed directly by Node.js in the CI environment and must be stored as a GitHub Secret named `API_URL`.

---

## Setup

### Prerequisites

- Node.js ≥ 18
- npm

### Install Dependencies

```bash
cd client
npm install
```

### Run Locally

```bash
npm run dev
```

The app will be available at `http://localhost:5173` by default. API requests to `/api/*` are proxied to `http://localhost:5001` in development (configured in `vite.config.js`).

### Lint

```bash
npm run lint
```

### Build

```bash
npm run build
```

The production output is written to `client/dist/`.

---

## Running Tests

### API Connectivity Test

```bash
cd client
API_URL=https://your-api-url.com npm run test
```

This runs `test/api.test.js` directly with Node.js. The script:

1. Reads `API_URL` from the environment
2. Makes a `fetch` request to the URL
3. Logs the HTTP status
4. Exits with code `1` if the request fails or the URL is not set — causing CI to fail

The test uses a **mock API** (e.g., via [Mocki](https://mocki.io) or a similar service) as the target URL in CI, allowing API connectivity to be verified without a live backend.

### Unit Tests (Vitest)

Vitest is configured in `vite.config.js` with `jsdom` as the test environment. Unit test files follow the `*.test.jsx` naming convention inside `src/`.

```bash
npm run test   # Note: currently mapped to the API test script
```

> To run Vitest unit tests separately, use `npx vitest run`.

---

## Deployment

The frontend is deployed automatically to **GitHub Pages** on every push to `main`. No manual steps are required after the initial repository setup.

**Live URL pattern:**

```
https://yatinsingh2007.github.io/shopsmart/
```

**Base path configuration:**

Vite is configured with `base: "/shopsmart/"` in `vite.config.js`. This ensures all static assets (JS, CSS, images) are loaded relative to the correct sub-path when hosted on GitHub Pages. If the repository is renamed, this value must be updated to match.

---

## Future Improvements

- **Real backend integration** — Replace mock API with a live REST or GraphQL backend.
- **Expanded test coverage** — Add component-level unit tests and integration tests using Vitest + Testing Library.
- **Environment-specific builds** — Use Vite's `mode` flag to manage separate `.env.production` and `.env.staging` configurations.
- **Preview deployments** — Configure PR-based preview environments (e.g., via Vercel or Netlify) for faster feedback on UI changes.
- **Error monitoring** — Integrate a client-side error tracking tool (e.g., Sentry) for production observability.
