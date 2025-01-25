# krisyotam.com

## Tech Stack

- [Astro](https://astro.build/) - Framework
- [Vercel](https://www.vercel.com/) - Hosting
- [Neon](https://neon.tech/) - Database
- [TailwindCSS](https://tailwindcss.com/) - UI

## Design Notes

- Blog posts are static pages hosted under `./src/content/blog`.
- The _Today I Learned_ notes are stored in the [krisyotam/til](https://github.com/krisyotam/til) repo. A Netlify webhook from that repo will trigger a new build of this site.
- Analytics data is stored in a Postgres database. See the API route `./src/pages/api/page-view.ts`.
- The OpenGraph images are statically generated using [satori](https://github.com/vercel/satori). See `./src/lib/astro-opengraph-image.ts` for implementation.

## Posts

<!-- BLOG-POST-LIST:START -->

- [How to build an npx starter template](https://krisyotam.com/how-to-build-an-npx-starter-template/)
- [Typescript tips by Matt Pocock](https://krisyotam.com/typescript-tips-by-matt-pocock/)
- [How to keep undefined values in JSON.stringify](https://krisyotam.com/how-to-keep-undefined-values-in-json.stringify/)
- [Proxying Ackee through Netlify](https://krisyotam.com/proxying-ackee-through-netlify/)
- [3 benefits interviews bring you](https://krisyotam.com/3-benefits-interviews-bring-you/)
- [Measuring the performance of the McLaren Racing website](https://krisyotam.com/measuring-the-performance-of-the-mclaren-racing-website/)
- [How to build an app with Remix and Netlify Graph](https://krisyotam.com/how-to-build-an-app-with-remix-and-netlify-graph/)
- [How I landed my first job as a software engineer](https://krisyotam.com/how-i-landed-my-first-job-as-a-software-engineer/)
- [Jamstack vs Traditional Web](https://krisyotam.com/jamstack-vs-traditional-web/)
- [How to get started with improving site performance](https://krisyotam.com/how-to-get-started-with-improving-site-performance/)
- [Page Speed Comparison of Singapore Commerce](https://krisyotam.com/page-speed-comparison-of-singapore-commerce/)
- [Data Fetching in Next.js](https://krisyotam.com/data-fetching-in-next.js/)
- [Improving Shopify page performance using Next.js](https://krisyotam.com/improving-shopify-page-performance-using-next.js/)
- [Notes - The Coding Career Handbook](https://krisyotam.com/notes-the-coding-career-handbook/)
- [Page Speed Performance of Formula 1 Websites](https://krisyotam.com/page-speed-performance-of-formula-1-websites/)
- [Using FaunaDB and Netlify Functions for Analytics](https://krisyotam.com/using-faunadb-and-netlify-functions-for-analytics/)
- [Adding Dark Mode to your Tailwind CSS website](https://krisyotam.com/adding-dark-mode-to-your-tailwind-css-website/)
- [What I have learnt as an engineering manager](https://krisyotam.com/what-i-have-learnt-as-an-engineering-manager/)
- [Be strong like your code](https://krisyotam.com/be-strong-like-your-code/)
<!-- BLOG-POST-LIST:END -->
