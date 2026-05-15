# Gaming Leaderboard

Full-stack take-home: players compete in a timed click challenge, scores hit the leaderboard. Ranking uses one of four strategies (latest / max / min / cumulative). Admin can change strategy and game rules.

`backend/` — NestJS, Prisma, Postgres  
`frontend/` — React, Vite

You need **Node.js**, **npm**, and **Docker** (for Postgres).

## Quick start

From the repo root:

```bash
docker compose up -d

cd backend
cp .env.example .env
npm install
npm run prisma:migrate
npm run prisma:seed
npm run start:dev
```

New terminal:

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Open http://localhost:5173 (Postgres + backend must be running first).

---

## Postgres

```bash
docker compose up -d
```

Postgres on **5432**. Credentials match `backend/.env.example` (`postgres` / `postgres`, db `leaderboard`).

`docker ps` — look for `leaderboard-postgres`.  
Stop: `docker compose down`

---

## Backend

```bash
cd backend
cp .env.example .env
```

Open `.env`. For local dev the defaults from `.env.example` are fine. Change `JWT_SECRET` only if you want your own value (any long random string).

```bash
npm install
npm run prisma:migrate
npm run prisma:seed
npm run start:dev
```

If migrations fail on a fresh machine:

```bash
npx prisma migrate reset
```

That wipes the DB and reapplies migrations + seed.

- API: http://localhost:3000  
- Swagger: http://localhost:3000/docs  

`prisma:seed` creates game settings and test users. No seed = no admin login.

---

## Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

http://localhost:5173 — needs **Postgres and backend** already up (`VITE_API_URL` defaults to `http://localhost:3000`).

---

## Logins (seed)

| | email | password |
|---|--------|----------|
| Admin | admin@example.com | Admin123! |
| Player | player@example.com | Player123! |

`/admin` — ADMIN only. Register always creates USER.

---

## If something breaks

- **DB connection refused** — `docker compose up -d` not run or container stopped  
- **CORS in browser** — `CORS_ORIGINS` in `backend/.env` must include `http://localhost:5173`  
- **401 on game** — log in first  
- **Port 5432 busy** — stop other Postgres or change port in `docker-compose.yml` + `DATABASE_URL`
