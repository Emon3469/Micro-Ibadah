# Micro-Ibadah

Micro-Ibadah is a full-stack web application with:
- `client`: React + Vite frontend
- `server`: Node.js + Express backend API

## Repository Structure

```text
Micro-Ibadah/
  client/   # Frontend (React + Vite)
  server/   # Backend (Express + MongoDB)
  docker-compose.yml
```

## Prerequisites

- Node.js 18+
- npm
- Docker (optional, for containerized run)

## Local Development

### 1. Configure environment variables

- Copy `server/.env.example` to `server/.env` and fill in required values.
- Copy `client/.env.example` to `client/.env` if needed.

### 2. Run backend

```bash
cd server
npm install
npm run dev
```

Backend runs on `http://localhost:5000`.

### 3. Run frontend

Open a new terminal:

```bash
cd client
npm install
npm run dev
```

Frontend runs on Vite default URL (usually `http://localhost:5173`).

## Run with Docker

From repo root:

```bash
docker compose up --build
```

- Frontend: `http://localhost:8080`
- Backend: `http://localhost:5000`

## Available Scripts

### Client (`client/package.json`)

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run lint`

### Server (`server/package.json`)

- `npm run dev`
- `npm start`
