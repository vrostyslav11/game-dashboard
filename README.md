# Gaming Leaderboard

Full-stack take-home: players play a timed click game, scores hit the leaderboard. Ranking uses one of four strategies (latest / max / min / cumulative). Admin can change strategy and game rules.

`backend/` — NestJS, Prisma, Postgres  
`frontend/` — React, Vite

You need **Node.js**, **npm**, and **Docker** (for Postgres only).

---

## Postgres

From the repo root:

```bash
docker compose up -d
```

That starts Postgres on port **5432**. Login matches `backend/.env.example` (`postgres` / `postgres`, database `leaderboard`).

Check it's up: `docker ps` — container `leaderboard-postgres` should be running.

To stop: `docker compose down`

---

## Backend

```bash
cd backend
cp .env.example .env
```

Open `.env` and change **`JWT_SECRET`** (required). Leave `DATABASE_URL` and `CORS_ORIGINS` unless you know you need something else.

```bash
npm install
npm run prisma:migrate
npm run prisma:seed
npm run start:dev
```

- API: http://localhost:3000  
- Swagger: http://localhost:3000/docs  

`prisma:seed` creates default game settings and two users (see below). Without seed, admin login won't exist.

---

## Frontend

Second terminal:

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

http://localhost:5173 — frontend calls the API at `VITE_API_URL` (default `http://localhost:3000`). Backend must already be running.

---

## Logins (from seed)

| | email | password |
|---|--------|----------|
| Admin | admin@example.com | Admin123! |
| Player | player@example.com | Player123! |

`/admin` is ADMIN only. New signups are always USER.

---

## If something breaks

- **DB connection refused** — Docker not running or `docker compose up -d` not done.  
- **CORS errors in browser** — `CORS_ORIGINS` in `backend/.env` must include `http://localhost:5173`.  
- **401 on game** — log in first; submitting a score needs a token.  
- **Port 5432 busy** — another Postgres on the machine; stop it or change the port in `docker-compose.yml` and `DATABASE_URL`.
