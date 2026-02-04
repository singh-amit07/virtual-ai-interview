This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## Database connection troubleshooting 🔧

If you see `fetch failed` or `Connect Timeout` errors when the app tries to query the DB, verify your `DATABASE_URL` and network connectivity. A helper script is included to test the DB from your machine:

```bash
# runs a simple `select 1` against DATABASE_URL
npm run test-db
```

If the script fails, check:

- That `DATABASE_URL` is set in `.env.local` or your environment.
- Your Neon/Postgres instance is live and uses the serverless HTTP endpoint (if applicable).
- Your network (VPN/firewall) allows outbound HTTPS to the DB host.

If you need help diagnosing output from `npm run test-db`, paste the error here and I can help interpret it.
"# virtual-ai-interview"
