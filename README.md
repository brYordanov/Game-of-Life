# Game-of-Life

## Time spent

| Phase | Time |
|-------|------|
| Setup & research | ~1.5h |
| Initial board styles & cell select logic | ~1h |
| Game rules | ~2h |
| Controls & options polish | ~2.5h |
| NestJS + MongoDB + pattern module | ~2h |
| game.service tests | ~1h |
| **Total** | **~10h** |

## Getting started

### Backend (`/be`)

Starts MongoDB via Docker, seeds the patterns, and runs the NestJS dev server.

```bash
cd be
npm install
npm run dev
```

| Service  | Port  |
|----------|-------|
| NestJS API | http://localhost:3000 |
| MongoDB  | localhost:27017 |

### Frontend (`/fe`)

```bash
cd fe
npm install
npm start
```

| Service  | Port  |
|----------|-------|
| Angular dev server | http://localhost:4200 |
