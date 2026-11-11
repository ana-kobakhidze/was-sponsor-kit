# Women’s Alpine School Sponsor Kit

A Georgian-language React and TypeScript app for drafting sponsorship proposals.

## Try the builder

Use sample program details, save a draft, and reload to see it restored. Drafts are saved in browser storage and can sync with a backend when configured.

## AI-assisted drafting

The server-side Claude integration can generate a full proposal, a one-page pitch, an outreach email, or a sponsorship tier card. The generation endpoint uses the server-side `ANTHROPIC_API_KEY` environment variable.

## Run locally

Use Node.js 22.12+.

```sh
npm install
npm run dev
```

Use `npm run build` and `npm run lint` to check the project.
