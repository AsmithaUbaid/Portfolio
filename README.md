# Asmitha U — Portfolio

A premium, interactive personal portfolio positioned for Applied AI / AI Engineering /
Agentic AI / LLM Engineering roles. Built with Next.js (App Router), TypeScript,
Tailwind CSS v4, Framer Motion, and React Flow.

All content (experience, projects, metrics, publications, skills) is sourced directly
from the resume in `lib/data.ts` — that file is the single source of truth for site copy.

## Features

- Dark-first theme with a light mode toggle (persisted in `localStorage`)
- Animated hero with rotating keyword text, ambient mesh gradient, and cursor spotlight
- Scroll-triggered reveals and an animated career timeline
- AI project case studies (problem → why AI → architecture → contribution → evaluation →
  trade-offs → result), each with an interactive React Flow architecture diagram
- "How I Think" — an interactive decision-reasoning panel
- Skill clusters grouped by purpose (no percentage bars)
- Publications, awards, and certifications
- Recruiter View — a condensed, fast-scan mode toggle in the nav
- Fully responsive (mobile / tablet / desktop), keyboard-navigable, and
  `prefers-reduced-motion`-aware

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Build

```bash
npm run build
npm run start
```

## Project structure

```
app/            Next.js App Router entry (layout, page, global styles)
components/     UI components (Hero, ExperienceTimeline, ProjectCaseStudy,
                ArchitectureDiagram, HowIThink, SkillClusters, RecruiterView, ...)
lib/data.ts     All resume-derived content
lib/providers.tsx  Theme + Recruiter/Full view mode context
public/         Static assets, including the downloadable resume PDF
```

## Updating content

Edit `lib/data.ts` — every section on the site (hero facts, experience, education,
projects, skills, publications, certifications) reads from typed exports in that file.
Project architecture diagrams are defined per-project as a small node/edge graph and
rendered by `components/ArchitectureDiagram.tsx`.

## Deploying to Vercel

1. Push this repository to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Framework preset: **Next.js** (auto-detected). No environment variables are required.
4. Deploy — Vercel will build with `npm run build` and serve the app automatically.

Alternatively, via the Vercel CLI:

```bash
npm i -g vercel
vercel
```
