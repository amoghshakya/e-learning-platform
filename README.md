# Shiksha Yatri - E-Learning Platform (SE)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install the dependencies

```bash
npm install
# or
yarn install
#or
pnpm install
#or
bun install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Or, run the build directly

```bash
npm run build
# or
yarn build
# or
pnpm build
# or
bun build
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

---

## About the project

Software Engineering Assignment - 2nd year
This is for an assignment for our Software Engineering module

## Basic features

- Basic Authentication (with OAuth) [^1]
- Course and Lesson Creation (and Removal)
- Dashboard for learners to see their in progress and completed courses
- Upgrading normal users to instructors (to create their own course)

[^1]: Authentication doesn't work on deployments (IDK WHY HAVE TO FIX THIS #TODO)

## Technologies used

- Next.js 14 (App Router)
- TailwindCSS
- TypeScript
- Prisma ORM
- NextAuth (for authentication)
- PostgreSQL

### Component Frameworks

- [shadcn/ui](https://ui.shadcn.com/)
