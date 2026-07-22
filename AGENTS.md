# AGENTS.md

## Cursor Cloud specific instructions

This is the **Dad Joke** app: a Node.js monorepo with two services. Standard commands live in `README.md` and the root `package.json` scripts (`install:all`, `start`, `test`, `lint`); reference those rather than duplicating.

### Node version (important)
- The app requires **Node.js >= 25** (`engines` in every `package.json`).
- The VM's default `node` on `PATH` is `/exec-daemon/node` (Node 22) and it takes precedence over nvm. Node 25 is installed via nvm and prepended to `PATH` in `~/.bashrc`, so fresh shells resolve to Node 25 automatically. Verify with `node -v` (expect `v25.x`); if a shell still shows v22, run `source ~/.bashrc`.

### Services
| Service | Path | Dev command | Port |
|---|---|---|---|
| Backend API (Express) | `backend/` | `npm run dev --prefix backend` (watch) or `npm run start:backend` | 3001 |
| Frontend (static + Node http server) | `frontend/` | `npm run dev --prefix frontend` (watch) or `npm run start:frontend` | 3000 |

- Both services must run for end-to-end UI testing. Open http://localhost:3000; the frontend reads the backend URL from its own `/config.json` endpoint.
- No database or external dependencies; jokes are in-memory. No `.env` required (all env vars have defaults).
- `npm start` (root) runs both via `scripts/start-all.js`. Backend CORS only allows `FRONTEND_ORIGIN` (default `http://localhost:3000`).

### Lint / test
- Lint is `node --check` (syntax only); tests use the built-in `node --test` runner. Run from root with `npm run lint` / `npm test`.
