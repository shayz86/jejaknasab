# JejakNasab clean owner auth

React/Vite + Cloudflare Pages Functions + D1. Owner credentials are Cloudflare secrets, sessions are hashed and stored in D1.

Setup: replace `ISI_DATABASE_ID_ASLI` in `wrangler.jsonc`; create/apply `database/schema.sql`; set `OWNER_EMAIL` and `OWNER_PASSWORD` as Pages secrets; build and deploy.
