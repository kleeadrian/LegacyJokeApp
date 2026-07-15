# Dad Joke Application

A sample full-stack JavaScript application built for **Node.js 25**, with a separate frontend and backend.

## Project structure

```
dadjoke-app/
├── backend/          # Express API serving dad jokes
├── frontend/         # Static UI served by a Node HTTP server
├── scripts/          # Helper scripts
├── Jenkinsfile       # CI/CD pipeline
└── package.json      # Root workspace scripts
```

## Requirements

- Node.js 25 or later

## Quick start

Install dependencies for both services:

```bash
cd dadjoke-app
npm run install:all
```

Start both servers:

```bash
npm start
```

Or run them separately:

```bash
npm run start:backend   # http://localhost:3001
npm run start:frontend  # http://localhost:3000
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## API endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/jokes` | List all jokes |
| GET | `/api/jokes/random` | Get a random joke |
| GET | `/api/jokes/:id` | Get a joke by ID |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run install:all` | Install backend and frontend dependencies |
| `npm start` | Start both services |
| `npm test` | Run all tests |
| `npm run lint` | Syntax-check JavaScript files |

## Environment variables

### Backend

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3001` | API server port |
| `FRONTEND_ORIGIN` | `http://localhost:3000` | CORS allowed origin |

### Frontend

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | Frontend server port |
| `API_URL` | `http://localhost:3001` | Backend API base URL |

## Jenkins pipeline

The included `Jenkinsfile` runs:

1. Checkout
2. Dependency install
3. Lint
4. Test
5. Build verification
6. Package artifact
7. Deploy (on `main` branch only)

Configure Jenkins with the **NodeJS Plugin** and a Node 25 installation named `25` to match the pipeline's `tools` block.

## Example Jenkins job setup

1. Create a **Pipeline** job in Jenkins.
2. Point it at this repository.
3. Set the script path to `dadjoke-app/Jenkinsfile`.
4. Ensure Node.js 25 is available on the agent or via the NodeJS tool installer.
