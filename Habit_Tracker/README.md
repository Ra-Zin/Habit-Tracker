# HabitLoop

Track daily habits, keep the chain unbroken.

React + Vite + Tailwind CSS v4 on the front, Express + MongoDB + JWT on the back,
with a Groq-powered habit coach.

## The idea

A habit is a run of days, so the last seven days are drawn as a **chain**:
consecutive completions are joined by a solid link, and a missed day leaves a
visible gap. A missed day is a hollow link, never a red cross — the chain
reports what happened, it does not scold.

## Running it

### Server

```bash
cd server
cp .env.example .env    # fill in MONGODB_URI and JWT_SECRET
npm install
npm run dev             # http://localhost:5000
```

| Variable | Required | Notes |
| --- | --- | --- |
| `MONGODB_URI` | yes | MongoDB Atlas connection string |
| `JWT_SECRET` | yes | long random string |
| `PORT` | no | defaults to `5000` |
| `GROQ_API_KEY` | no | without it `/api/ai/coach` returns 503 |
| `GROQ_MODEL` | no | defaults to `llama-3.3-70b-versatile` |
| `CLIENT_ORIGIN` | no | comma-separated allowed origins in production |

### Frontend

```bash
cd Frontend
npm install
npm run dev             # http://localhost:5173
```

Set `VITE_API_URL` in `Frontend/.env` if the API is not on
`http://localhost:5000/api`.

## API

All habit and coach routes require `Authorization: Bearer <token>`.

| Method | Route | Does |
| --- | --- | --- |
| `POST` | `/api/auth/register` | create an account, returns a token |
| `POST` | `/api/auth/login` | log in, returns a token |
| `GET` | `/api/auth/me` | restore a session on refresh |
| `GET` | `/api/habits` | list the signed-in user's habits |
| `POST` | `/api/habits` | create a habit `{ name, frequency }` |
| `POST` | `/api/habits/:id/complete` | record a completion `{ date }`, 409 on duplicate |
| `POST` | `/api/habits/:id/uncomplete` | undo a completion `{ date }` |
| `DELETE` | `/api/habits/:id` | delete a habit |
| `GET` | `/api/habits/:id/history` | raw completions array |
| `POST` | `/api/ai/coach` | short coaching note built from your own streaks |
| `GET` | `/api/health` | liveness check |

## Timezones

Completions are `"YYYY-MM-DD"` strings built from the **user's local calendar
date**, sent by the browser. `toISOString()` is avoided on the client because it
converts to UTC first — in UTC+5:45 that ticks yesterday's box at 00:30. The
server validates the incoming date against a `YYYY-MM-DD` pattern and rejects
anything more than one day from its own UTC date, which covers every real offset
from UTC-12 to UTC+14.

## Design system

Tokens live in `Frontend/src/index.css`. Light and dark are both first-class;
theme is stored in `localStorage` and applied before first paint so there is no
flash.

| Token | Role |
| --- | --- |
| `--brand` | identity, primary actions |
| `--ember` | streaks — heat you have earned |
| `--jade` | completion |
| `--rose` | destructive actions only |
| `--ink` / `--ink-2` / `--ink-3` | text hierarchy |
| `--paper` / `--surface` / `--surface-2` | background layers |

Type: **Bricolage Grotesque** (display), **Instrument Sans** (body),
**JetBrains Mono** (figures — every number that changes in place uses the
`.figure` class for tabular alignment).

Radii are concentric: 16px padding with an 8px inner radius sits inside a 24px
card. Motion is capped at 400ms, uses `cubic-bezier(0.2, 0, 0, 1)`, and is
disabled entirely under `prefers-reduced-motion`.

## Accessibility

- Every interactive target is at least 44×44px.
- Visible focus ring on all focusable elements.
- The modal traps Tab, closes on Escape, and returns focus to its trigger.
- The chain has a screen-reader label per day ("Friday, 14 August: done").
- Errors use `role="alert"`; progress uses `role="progressbar"`.
- Completion state is carried by colour, icon, and text — never colour alone.

## Deploying

Backend on Render (`npm start`, set every env var in the dashboard), frontend on
Netlify (`npm run build`, publish `Frontend/dist`, set `VITE_API_URL`). Add a
Netlify SPA redirect so client-side routes resolve:

```
/*  /index.html  200
```
