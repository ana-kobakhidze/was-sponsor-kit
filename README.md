# Women's Alpine School Sponsor Kit

A Georgian-language web app for drafting a sponsorship proposal for a women's alpine school. The React interface organizes proposal details into sections covering the program, participants, budget, sponsor benefits, and how the school will measure outcomes.

## Explore the interface

- Open `/` for the sponsor kit builder and `/phase1` for the Phase 1 view.
- In the builder, add sample program details, save a draft, and reload. Check that the saved values are restored in the same browser.
- The builder stores drafts in browser local storage and also attempts to sync with `/api/draft` when that endpoint is available.

## Run locally

Use Node.js 22.12+.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. Run `npm run build` to type-check and create a production build, or `npm run lint` to check the source.

## Stack

React 19, TypeScript, Vite, React Router, and Tailwind CSS.
