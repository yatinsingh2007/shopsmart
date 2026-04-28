<p align="center">
  <h1 align="center">ShopSmart</h1>
  <p align="center">
    A production-grade, full-stack eCommerce platform built with Next.js, Express, Prisma, and PostgreSQL — containerized with Docker and deployed to AWS via Terraform-managed infrastructure.
  </p>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Express-4-000000?logo=express" alt="Express" />
  <img src="https://img.shields.io/badge/Prisma-5-2D3748?logo=prisma" alt="Prisma" />
  <img src="https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker" alt="Docker" />
  <img src="https://img.shields.io/badge/Terraform-IaC-7B42BC?logo=terraform" alt="Terraform" />
  <img src="https://img.shields.io/badge/CI/CD-GitHub_Actions-2088FF?logo=github-actions" alt="CI/CD" />
</p>

---

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database](#database)
- [API Reference](#api-reference)
- [Testing](#testing)
- [Docker](#docker)
- [CI/CD Pipelines](#cicd-pipelines)
- [Infrastructure as Code](#infrastructure-as-code)
- [Deployment](#deployment)
- [Security](#security)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

ShopSmart is an end-to-end eCommerce platform designed for production workloads. It features a decoupled client–server architecture, JWT-based authentication with role-based access control, a relational data model managed through Prisma migrations, and a fully automated build-test-deploy pipeline.

**Key capabilities:**

- 🛒 Product catalog with category filtering and search
- 🔐 Secure authentication (register, login, JWT + HTTP-only cookies)
- 👤 Role-based access control (User / Admin)
- 🛍️ Cart management with quantity controls
- 📦 Order placement and order history tracking
- ⚙️ Admin dashboard for product and user management
- 🐳 One-command local environment via Docker Compose
- ☁️ Cloud-ready with Terraform-provisioned AWS ECR

---

## Architecture

```
┌──────────────────┐         ┌──────────────────┐         ┌──────────────────┐
│                  │  HTTP   │                  │  SQL    │                  │
│   Next.js 16     │────────▶│   Express API    │────────▶│  PostgreSQL 16   │
│   (React 19)     │  :3000  │   (Node 20)      │  :5432  │  (Alpine)        │
│                  │◀────────│                  │◀────────│                  │
└──────────────────┘         └──────────────────┘         └──────────────────┘
        │                           │
   Zustand Store              Prisma ORM
   Axios Client               Zod Validation
   React Hook Form            JWT + bcrypt
```

The platform follows a **monorepo** layout with independently deployable services:

| Service    | Runtime     | Port  | Description                          |
|------------|-------------|-------|--------------------------------------|
| `client`   | Next.js 16  | 3000  | Server-rendered React frontend       |
| `server`   | Express 4   | 5000  | RESTful API with Prisma ORM          |
| `postgres` | PostgreSQL  | 5432  | Relational data store                |

---

## Tech Stack

### Frontend (`client/`)

| Concern          | Technology                          |
|------------------|-------------------------------------|
| Framework        | Next.js 16 (App Router)             |
| UI Library       | React 19                            |
| Language         | TypeScript 5                        |
| Styling          | Tailwind CSS 4                      |
| State Management | Zustand 5                           |
| Forms            | React Hook Form 7 + Zod 4           |
| HTTP Client      | Axios                               |
| Icons            | Lucide React                        |
| Notifications    | React Hot Toast                     |
| Linting          | ESLint 9 (Next.js config)           |

### Backend (`server/`)

| Concern          | Technology                          |
|------------------|-------------------------------------|
| Runtime          | Node.js 20                          |
| Framework        | Express 4                           |
| ORM              | Prisma 5 (PostgreSQL)               |
| Validation       | Zod 4                               |
| Authentication   | JSON Web Tokens (jsonwebtoken 9)    |
| Password Hashing | bcryptjs 3                          |
| Testing          | Jest 29 + Supertest 6               |
| Linting          | ESLint 9                            |
| Dev Server       | Nodemon 3                           |

### Infrastructure & DevOps

| Concern               | Technology                          |
|------------------------|-------------------------------------|
| Containerization       | Docker (multi-service Compose)      |
| Database               | PostgreSQL 16 (Alpine)              |
| IaC                    | Terraform (AWS ECR provisioning)    |
| CI Pipeline            | GitHub Actions (`ci.yml`)           |
| CD Pipeline            | GitHub Actions (`cd.yml` → AWS ECR) |
| Dependency Management  | Dependabot (weekly, grouped PRs)    |

---

## Project Structure

```
shopsmart/
├── .github/
│   ├── dependabot.yml                  # Automated dependency updates
│   └── workflows/
│       ├── ci.yml                      # Lint → Test → Docker build
│       ├── cd.yml                      # Build & push images to AWS ECR
│       ├── deploy-pages.yml            # GitHub Pages deployment
│       ├── deploy.yml                  # Render deployment
│       ├── api-test.yml                # API reachability checks
│       └── e2e.yml                     # End-to-end test pipeline
│
├── client/                             # ── Next.js Frontend ──────────
│   ├── src/
│   │   ├── app/                        # Next.js App Router pages
│   │   │   ├── layout.tsx              #   Root layout + providers
│   │   │   ├── page.tsx                #   Landing / home page
│   │   │   ├── login/                  #   Login page
│   │   │   ├── register/               #   Registration page
│   │   │   ├── products/               #   Product catalog
│   │   │   ├── cart/                   #   Cart page
│   │   │   ├── checkout/               #   Checkout flow
│   │   │   └── admin/                  #   Admin dashboard
│   │   ├── components/
│   │   │   ├── layout/                 #   Header, Footer, Nav
│   │   │   ├── ui/                     #   Reusable UI primitives
│   │   │   └── providers/              #   Context & Zustand providers
│   │   ├── store/
│   │   │   ├── auth.store.ts           #   Auth state (Zustand)
│   │   │   └── cart.store.ts           #   Cart state (Zustand)
│   │   └── lib/
│   │       └── api.ts                  #   Axios instance & interceptors
│   ├── Dockerfile                      # Production container image
│   ├── package.json
│   └── tsconfig.json
│
├── server/                             # ── Express Backend ───────────
│   ├── src/
│   │   ├── index.js                    #   Server entry point
│   │   ├── app.js                      #   Express app configuration
│   │   ├── controllers/                #   Request handlers
│   │   │   ├── auth.controller.js
│   │   │   ├── user.controller.js
│   │   │   ├── product.controller.js
│   │   │   ├── cart.controller.js
│   │   │   ├── order.controller.js
│   │   │   └── admin.controller.js
│   │   ├── services/                   #   Business logic layer
│   │   │   ├── auth.service.js
│   │   │   ├── user.service.js
│   │   │   ├── product.service.js
│   │   │   ├── cart.service.js
│   │   │   ├── order.service.js
│   │   │   └── admin.service.js
│   │   ├── routes/                     #   Route definitions
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.js       #   JWT verification + RBAC
│   │   │   ├── validate.middleware.js   #   Zod schema validation
│   │   │   └── error.middleware.js      #   Global error handler
│   │   ├── utils/
│   │   │   └── validations.js          #   Zod schemas
│   │   └── lib/                        #   Prisma client singleton
│   ├── prisma/
│   │   └── schema.prisma              #   Database schema
│   ├── tests/
│   │   ├── app.test.js                #   Smoke tests
│   │   ├── unit/                      #   Unit test suites
│   │   └── integration/               #   Integration test suites
│   ├── Dockerfile                     #   Production container image
│   └── package.json
│
├── terraform/                         # ── Infrastructure as Code ────
│   ├── main.tf                        #   Provider & backend config
│   ├── ecr.tf                         #   ECR repository definitions
│   ├── variables.tf                   #   Input variables
│   ├── outputs.tf                     #   Output values
│   └── terraform.tfvars.example       #   Variable template
│
├── scripts/
│   └── deploy.sh                      # Manual deployment helper
│
├── docker-compose.yml                 # Multi-service orchestration
├── .env.example                       # Environment variable template
├── .dockerignore
├── .gitignore
├── render.yaml                        # Render PaaS configuration
├── SECURITY.md                        # Security policy
└── README.md
```

---

## Prerequisites

| Tool       | Version  | Purpose                        |
|------------|----------|--------------------------------|
| Node.js    | ≥ 20 LTS | Runtime for client and server  |
| npm        | ≥ 10     | Package management             |
| Docker     | ≥ 24     | Container builds               |
| Docker Compose | ≥ 2.20 | Local orchestration          |
| PostgreSQL | 16       | Database (or use Docker)       |
| Terraform  | ≥ 1.5    | Infrastructure provisioning    |
| AWS CLI    | ≥ 2      | ECR authentication (deploy)    |

> **Note:** For local development, only Node.js and Docker are strictly required. The Docker Compose stack provisions PostgreSQL automatically.

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yatinsingh2007/shopsmart.git
cd shopsmart
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env` and set values appropriate for your environment. See [Environment Variables](#environment-variables) for the full reference.

### 3a. Run with Docker Compose (recommended)

```bash
docker compose up --build
```

This starts all three services:

| Service    | URL                         |
|------------|-----------------------------|
| Client     | http://localhost:3000        |
| Server API | http://localhost:5000/api    |
| PostgreSQL | localhost:5432               |

### 3b. Run without Docker (manual setup)

**Start the database:**

```bash
# Use a local PostgreSQL instance or the Docker container only
docker compose up postgres -d
```

**Start the server:**

```bash
cd server
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

**Start the client:**

```bash
cd client
npm install
npm run dev
```

---

## Environment Variables

Create a `.env` file in the project root (use `.env.example` as a template):

| Variable               | Default                                                          | Description                            |
|------------------------|------------------------------------------------------------------|----------------------------------------|
| `POSTGRES_USER`        | `admin`                                                          | PostgreSQL username                    |
| `POSTGRES_PASSWORD`    | `password123`                                                    | PostgreSQL password                    |
| `POSTGRES_DB`          | `shopsmart`                                                      | PostgreSQL database name               |
| `DATABASE_URL`         | `postgresql://admin:password123@localhost:5432/shopsmart?schema=public` | Prisma connection string         |
| `PORT`                 | `5000`                                                           | Server listening port                  |
| `NODE_ENV`             | `development`                                                    | Environment mode                       |
| `JWT_SECRET`           | —                                                                | Secret key for JWT signing             |
| `NEXT_PUBLIC_API_URL`  | `http://localhost:5000/api`                                      | API base URL exposed to the client     |
| `NEXT_PUBLIC_CLIENT_URL`| `http://localhost:3000`                                          | Client origin for CORS                 |

> **⚠️ Important:** Never commit `.env` files. The `.gitignore` is configured to exclude them. Use GitHub Secrets for CI/CD variables.

---

## Database

### Schema

The data model is defined in [`server/prisma/schema.prisma`](server/prisma/schema.prisma) and includes:

| Model       | Description                                         |
|-------------|-----------------------------------------------------|
| `User`      | Accounts with email/password auth and `USER`/`ADMIN` roles |
| `Category`  | Product categories (unique names)                   |
| `Product`   | Items with price, stock, image, and category FK     |
| `Cart`      | Per-user shopping cart (one-to-one with User)       |
| `CartItem`  | Line items in a cart (unique per cart + product)     |
| `Order`     | Completed orders with status tracking               |
| `OrderItem` | Snapshot of product/price at time of purchase       |

### Migrations

```bash
cd server

# Create a new migration after schema changes
npx prisma migrate dev --name <migration_name>

# Apply pending migrations (production)
npx prisma migrate deploy

# Reset database (development only — destroys all data)
npx prisma migrate reset

# Open Prisma Studio (visual database browser)
npx prisma studio
```

---

## API Reference

All endpoints are prefixed with `/api`. Authentication is handled via JWT tokens stored in HTTP-only cookies.

### Authentication

| Method | Endpoint              | Auth     | Description               |
|--------|-----------------------|----------|---------------------------|
| POST   | `/api/auth/register`  | Public   | Create a new account      |
| POST   | `/api/auth/login`     | Public   | Authenticate and get token |
| POST   | `/api/auth/logout`    | Bearer   | Invalidate session        |

### Users

| Method | Endpoint              | Auth     | Description               |
|--------|-----------------------|----------|---------------------------|
| GET    | `/api/users/profile`  | Bearer   | Get current user profile  |

### Products

| Method | Endpoint              | Auth     | Description               |
|--------|-----------------------|----------|---------------------------|
| GET    | `/api/products`       | Public   | List all products         |
| GET    | `/api/products/:id`   | Public   | Get product by ID         |

### Cart

| Method | Endpoint              | Auth     | Description               |
|--------|-----------------------|----------|---------------------------|
| GET    | `/api/cart`           | Bearer   | Get user's cart           |
| POST   | `/api/cart/items`     | Bearer   | Add item to cart          |
| PATCH  | `/api/cart/items/:id` | Bearer   | Update item quantity      |
| DELETE | `/api/cart/items/:id` | Bearer   | Remove item from cart     |

### Orders

| Method | Endpoint              | Auth     | Description               |
|--------|-----------------------|----------|---------------------------|
| GET    | `/api/orders`         | Bearer   | List user's orders        |
| POST   | `/api/orders`         | Bearer   | Place a new order         |

### Admin

| Method | Endpoint              | Auth     | Description               |
|--------|-----------------------|----------|---------------------------|
| GET    | `/api/admin/users`    | Admin    | List all users            |
| POST   | `/api/admin/products` | Admin    | Create a product          |
| PUT    | `/api/admin/products/:id` | Admin | Update a product        |
| DELETE | `/api/admin/products/:id` | Admin | Delete a product        |

### Health Check

| Method | Endpoint              | Auth     | Description               |
|--------|-----------------------|----------|---------------------------|
| GET    | `/api/health`         | Public   | Service health status     |

---

## Testing

### Backend Tests

```bash
cd server

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

The test suite uses **Jest** with **Supertest** for HTTP-level integration testing. Tests are organized as:

```
server/tests/
├── app.test.js          # Smoke / health-check tests
├── unit/                # Isolated unit tests
└── integration/         # Full request-response tests
```

### Linting

```bash
# Client
cd client && npm run lint

# Server
cd server && npm run lint
```

Both services use ESLint 9 with flat config.

---

## Docker

### Container Images

| Image              | Base          | Exposes | Description                           |
|--------------------|---------------|---------|---------------------------------------|
| `shopsmart-client` | node:20-alpine | 3000   | Next.js production build              |
| `shopsmart-server` | node:20-alpine | 5000   | Express API + Prisma client           |
| `postgres:16-alpine` | postgres:16-alpine | 5432 | PostgreSQL with health checks     |

### Docker Compose

The `docker-compose.yml` orchestrates all services with:

- **Persistent volumes** for PostgreSQL data (`postgres_data`)
- **Health checks** on the database with retry logic
- **Dependency ordering** — server waits for a healthy database, client waits for the server
- **Bridge networking** for inter-service communication

```bash
# Start all services (foreground)
docker compose up --build

# Start all services (detached)
docker compose up --build -d

# Stop and remove containers
docker compose down

# Stop and remove containers + volumes (full reset)
docker compose down -v

# View logs
docker compose logs -f server
```

---

## CI/CD Pipelines

All pipelines are defined in `.github/workflows/` and run on GitHub Actions.

### CI Pipeline (`ci.yml`)

**Triggers:** Push to `main`/`master`, all pull requests

```
backend-tests                      docker-build
┌─────────────────────────┐       ┌─────────────────────────┐
│ 1. Checkout             │       │ (runs after tests pass) │
│ 2. Setup Node.js 20     │──────▶│ 1. Build server image   │
│ 3. npm ci               │       │ 2. Build client image   │
│ 4. prisma generate      │       └─────────────────────────┘
│ 5. ESLint               │
│ 6. Jest tests            │
└─────────────────────────┘
```

### CD Pipeline (`cd.yml`)

**Triggers:** Push to `main`/`master`

Builds production Docker images and pushes them to **AWS ECR** with two tags per image:

- `latest` — rolling latest from main
- `sha-<commit>` — immutable, traceable to the exact commit

```
1. Checkout
2. Configure AWS credentials (from GitHub Secrets)
3. Login to Amazon ECR
4. Set up Docker Buildx (layer caching via GitHub Actions cache)
5. Build & push server image
6. Build & push client image
7. Print summary to GitHub Step Summary
```

**Required GitHub Secrets:**

| Secret                  | Description                        |
|-------------------------|------------------------------------|
| `AWS_ACCESS_KEY_ID`     | IAM access key                     |
| `AWS_SECRET_ACCESS_KEY` | IAM secret key                     |
| `AWS_REGION`            | AWS region (e.g. `us-east-1`)      |
| `NEXT_PUBLIC_API_URL`   | Production API URL for client build |

### Dependency Management

**Dependabot** is configured to:

- Scan both `client/` and `server/` weekly
- Group minor + patch updates into single PRs
- Ignore major version bumps (manual review)
- Apply `dependencies` + `frontend`/`backend` labels

---

## Infrastructure as Code

Infrastructure is managed with **Terraform** in the `terraform/` directory. Currently provisions:

- **AWS ECR repositories** for `shopsmart-server` and `shopsmart-client`
- Image lifecycle policies (auto-cleanup of untagged images)
- Tag-based resource management

### Usage

```bash
cd terraform

# Copy and configure variables
cp terraform.tfvars.example terraform.tfvars

# Initialize Terraform
terraform init

# Preview changes
terraform plan

# Apply infrastructure
terraform apply
```

> See [`terraform/README.md`](terraform/README.md) for detailed IaC documentation.

---

## Deployment

### AWS (Production)

The CD pipeline automatically builds and pushes Docker images to ECR on every merge to `main`. To deploy the images to a compute target (ECS, EKS, EC2), pull from your ECR registry:

```bash
# Authenticate Docker with ECR
aws ecr get-login-password --region us-east-1 | \
  docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com

# Pull and run
docker pull <account-id>.dkr.ecr.us-east-1.amazonaws.com/shopsmart-server:latest
docker pull <account-id>.dkr.ecr.us-east-1.amazonaws.com/shopsmart-client:latest
```

### Render (Alternative)

A `render.yaml` blueprint is included for one-click deployment to [Render](https://render.com):

- **Backend** — Node.js web service (free tier)
- **Frontend** — Static site build

---

## Security

- **Authentication** — JWT tokens with configurable expiry, stored in HTTP-only cookies
- **Password storage** — bcrypt hashing with salt rounds
- **Input validation** — Zod schemas enforced at the middleware layer
- **CORS** — Origin-restricted, credentials-enabled
- **Dependency auditing** — Dependabot with weekly scans
- **Secret management** — All sensitive values via environment variables, never committed
- **RBAC** — Admin-only routes protected by role-checking middleware

See [`SECURITY.md`](SECURITY.md) for the vulnerability reporting policy.

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'feat: add my feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request

Please ensure all CI checks pass before requesting review.

---

## License

This project is open source and available under the [MIT License](LICENSE).
