# Project Context

## Stack

- Next.js (App Router, latest)
- Payload CMS (co-located inside Next.js)
- PostgreSQL (Supabase via connection string)
- Cloudflare R2 (S3-compatible storage)
- TypeScript (strict)

Payload is installed inside the Next.js app, forming a unified fullstack system.

---

## Architecture

/app
  /(payload)   → Payload CMS (admin + API)
  /(frontend)  → Public Next.js app

- Payload runs within (payload)
- Frontend UI lives in (frontend)
- Single codebase, shared types, shared runtime

---

## Core Mental Model

This is NOT a traditional headless CMS setup.

Payload = backend layer inside Next.js  
Next.js Server Components = primary execution layer

- No external API boundary by default
- Direct database access via Payload Local API

---

## Data Access (MANDATORY)

Use Payload Local API for all data operations.

Server Component → getPayload() → payload.find() → PostgreSQL

---

## Rendering Rules

- Default: Server Components
- Client Components only when needed (interactivity, browser APIs)

---

## Current Goal

- Convert Figma + Vite React app → Next.js App Router
- Build reusable components
- Integrate with Payload CMS

---

## Constraints

- Use Local API
- Avoid client-side fetching
- Keep CMS schema separate from UI

---

## Component Architecture

/components
  /ui
  /blocks
  /layout

---

## Payload Enforcement

- Local API bypasses access control by default
- Hooks must use req for transactions
- Regenerate types after schema changes

---

## CMS Strategy

- Collections → repeatable data
- Globals → singleton data
- Blocks → flexible layouts

---

## Frontend Pattern

Payload Data → Typed Model → Component Props → UI

---

## Performance

- Prefer server execution
- Avoid overfetching
- Minimize client JS

---

## Workflow

1. Define schema
2. Generate types
3. Fetch via Local API
4. Build Server Component
5. Add Client Component if needed

---

## Tech Decisions

- DB: @payloadcms/db-postgres (Supabase)
- Storage: @payloadcms/storage-s3 (Cloudflare R2)
- Styling: TODO
- Language: TypeScript

---

## Anti-Patterns

- Client-side fetching by default
- Treating Payload as external API
- Mixing CMS logic into UI
- Overusing Client Components