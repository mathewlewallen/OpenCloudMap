This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

~/Documents/GitHub/OpenCloudMap on main !3 ❯ pnpm create cloudflare@latest opencloudmap
.../19686b0c553-ac55                     |   +1 +
.../19686b0c553-ac55                     | Progress: resolved 1, reused 0, downloaded 1, added 1, done

──────────────────────────────────────────────────────────────────────────────────────────────────────────
👋 Welcome to create-cloudflare v2.46.0!
🧡 Let's get started.
📊 Cloudflare collects telemetry about your usage of Create-Cloudflare.

Learn more at: https://github.com/cloudflare/workers-sdk/blob/main/packages/create-cloudflare/telemetry.md
──────────────────────────────────────────────────────────────────────────────────────────────────────────

╭ Create an application with Cloudflare Step 1 of 3
│
├ In which directory do you want to create your application?
│ dir ./opencloudmap
│
├ What would you like to start with?
│ category Framework Starter
│
╰ Which development framework do you want to use?
  ● Analog
  ○ Analog
  ● Angular
  ○ Angular
  ● Astro
  ○ Astro
  ● Docusaurus
  ○ Docusaurus
  ● Gatsby
  ○ Gatsby
  ● Hono
  ○ Hono
  ● Next.js
  ○ Next.js
  ● Nuxt
  ○ Nuxt
  ● Docusaurus
  ○ Docusaurus
  ● Gatsby
  ○ Gatsby
  ● Hono
  ○ Hono
  ● Next.js
  ○ Next.js
  ● Nuxt
  ● Analog
  ○ Analog
  ○ Angular
  ○ Astro
  ○ Docusaurus
  ○ Gatsby
  ○ Hono
  ○ Next.js
  ○ Nuxt
├ Which development framework do you want to use?
│ framework Next.js
│
├ Select your deployment platform
│ platform Workers with Assets
│
├ Continue with Next.js (using Node.js compat + Workers Assets) via `pnpm dlx create-next-app@~15.3.0 opencloudmap`
│

Packages: +1
+
Progress: resolved 1, reused 1, downloaded 0, added 1, done
✔ Would you like to use TypeScript? … No / Yes
✔ Would you like to use ESLint? … No / Yes
✔ Would you like to use Tailwind CSS? … No / Yes
✔ Would you like your code inside a `src/` directory? … No / Yes
✔ Would you like to use App Router? (recommended) … No / Yes
✔ Would you like to use Turbopack for `next dev`? … No / Yes
✔ Would you like to customize the import alias (`@/*` by default)? … No / Yes
✔ What import alias would you like configured? … @/*
Creating a new Next.js app in /Users/mathewlewallen/Documents/GitHub/OpenCloudMap/opencloudmap.

Using pnpm.

Initializing project with template: app-tw 


Installing dependencies:
- react
- react-dom
- next

Installing devDependencies:
- typescript
- @types/node
- @types/react
- @types/react-dom
- @tailwindcss/postcss
- tailwindcss

Packages: +48
++++++++++++++++++++++++++++++++++++++++++++++++
Progress: resolved 94, reused 47, downloaded 2, added 48, done

dependencies:
+ next 15.3.1
+ react 19.1.0
+ react-dom 19.1.0

devDependencies:
+ @tailwindcss/postcss 4.1.4
+ @types/node 20.17.32 (22.15.3 is available)
+ @types/react 19.1.2
+ @types/react-dom 19.1.3
+ tailwindcss 4.1.4
+ typescript 5.8.3

╭ Warning ───────────────────────────────────────────────────────────────────────────────────╮
│                                                                                            │
│   Ignored build scripts: sharp.                                                            │
│   Run "pnpm approve-builds" to pick which dependencies should be allowed to run scripts.   │
│                                                                                            │
╰────────────────────────────────────────────────────────────────────────────────────────────╯

Done in 8.1s using pnpm v10.6.3
Success! Created opencloudmap at /Users/mathewlewallen/Documents/GitHub/OpenCloudMap/opencloudmap

├ Copying template files
│ files copied to project directory
│
╰ Application created 

╭ Configuring your application for Cloudflare Step 2 of 3
│
├ Installing wrangler A command line tool for building Cloudflare Workers
│ installed via `pnpm install wrangler --save-dev`
│
├ Installing @cloudflare/workers-types
│ installed via pnpm
│
├ Adding latest types to `tsconfig.json`
│ added @cloudflare/workers-types/2023-07-01
│
├ Adding the Cloudflare adapter
│ installed @opennextjs/cloudflare)}
│
├ Updating `next.config.ts`
│ updated `next.config.ts`
│
├ Adding Wrangler files to the .gitignore file
│ updated .gitignore file
│
├ Updating `package.json` scripts
│ updated `package.json`
│
├ You're in an existing git repository. Do you want to use git for version control?
│ yes git
│
╰ Application configured 

╭ Deploy with Cloudflare Step 3 of 3
│
├ Do you want to deploy your application?
│ yes deploy via `pnpm run deploy`
│
├ Logging into Cloudflare checking authentication status
│ not logged in
│
├ Logging into Cloudflare This will open a browser window
│ allowed via `wrangler login`
│
├ Selecting Cloudflare account retrieving accounts
│ account Mathewlewallen@gmail.com's Account
│

> opencloudmap@0.1.0 deploy /Users/mathewlewallen/Documents/GitHub/OpenCloudMap/opencloudmap
> opennextjs-cloudflare build && opennextjs-cloudflare deploy


┌─────────────────────────────┐
│ OpenNext — Cloudflare build │
└─────────────────────────────┘

App directory: /Users/mathewlewallen/Documents/GitHub/OpenCloudMap/opencloudmap
Next.js version : 15.3.1
@opennextjs/cloudflare version: 1.0.0-beta.4
@opennextjs/aws version: 3.5.7

┌─────────────────────────────────┐
│ OpenNext — Building Next.js app │
└─────────────────────────────────┘


> opencloudmap@0.1.0 build /Users/mathewlewallen/Documents/GitHub/OpenCloudMap/opencloudmap
> next build

   ▲ Next.js 15.3.1

Using vars defined in .dev.vars
Using vars defined in .dev.vars
   Creating an optimized production build ...
Using vars defined in .dev.vars
Using vars defined in .dev.vars
Using vars defined in .dev.vars
 ✓ Compiled successfully in 5.0s
 ✓ Linting and checking validity of types    
 ✓ Collecting page data    
 ✓ Generating static pages (5/5)
 ✓ Collecting build traces    
 ✓ Finalizing page optimization    

Route (app)                                 Size  First Load JS    
┌ ○ /                                    5.61 kB         107 kB
└ ○ /_not-found                            978 B         103 kB
+ First Load JS shared by all             102 kB
  ├ chunks/770-76939705ff65587a.js       46.5 kB
  ├ chunks/96e220d1-21a0fdc894793ec0.js  53.2 kB
  └ other shared chunks (total)          1.89 kB


○  (Static)  prerendered as static content


┌──────────────────────────────┐
│ OpenNext — Generating bundle │
└──────────────────────────────┘

Bundling middleware function...
Bundling static assets...
Bundling cache assets...
Building server function: default...
Applying code patches: 3.635s
# copyPackageTemplateFiles
⚙️ Bundling the OpenNext server...

Applying code patches:
 - patching require
 - patching cacheHandler
 - patching 'require(this.middlewareManifestPath)'
 - patching `require.resolve` call
All 4 patches applied

Worker saved in `/Users/mathewlewallen/Documents/GitHub/OpenCloudMap/opencloudmap/.open-next/worker.js` 🚀

OpenNext build complete.

┌──────────────────────────────┐
│ OpenNext — Cloudflare deploy │
└──────────────────────────────┘

Incremental cache does not need populating
Tag cache does not need populating

Cloudflare collects anonymous telemetry about your usage of Wrangler. Learn more at https://github.com/cloudflare/workers-sdk/tree/main/packages/wrangler/telemetry.md

 ⛅️ wrangler 4.14.0
-------------------

🌀 Building list of assets...
✨ Read 38 files from the assets directory /Users/mathewlewallen/Documents/GitHub/OpenCloudMap/opencloudmap/.open-next/assets
🌀 Starting asset upload...
🌀 Found 26 new or modified static assets to upload. Proceeding with upload...
+ /BUILD_ID
+ /_next/static/chunks/pages/_error-124d86105653e7ca.js
+ /file.svg
+ /_next/static/chunks/app/layout-70e1e1c50f309fdc.js
+ /_next/static/chunks/app/_not-found/page-fc03ad80c386bbf7.js
+ /_next/static/media/9610d9e46709d722-s.woff2
+ /_next/static/media/8d697b304b401681-s.woff2
+ /_next/static/media/93f479601ee12b01-s.p.woff2
+ /_next/static/chunks/770-76939705ff65587a.js
+ /vercel.svg
+ /_next/static/chunks/pages/_app-0693f4868892b9c9.js
+ /_next/static/chunks/main-app-bd687684fa46af10.js
+ /globe.svg
+ /_next/static/chunks/webpack-a05f68e3d168c82d.js
+ /_next/static/media/747892c23ea88013-s.woff2
+ /_next/static/media/ba015fad6dcf6784-s.woff2
+ /_next/static/chunks/main-33dc44b75745a853.js
+ /_next/static/chunks/framework-1158a0cb627c4f82.js
+ /_next/static/chunks/app/page-1f71a4305cf8a15f.js
+ /window.svg
+ /_next/static/vvQAo48Boluubl5qzJ5SV/_buildManifest.js
+ /next.svg
+ /_next/static/css/46c36fc8a744cf8b.css
+ /_next/static/chunks/299-3d800a9d82a8b555.js
+ /_next/static/media/569ce4b8f30dc480-s.p.woff2
+ /_next/static/chunks/96e220d1-21a0fdc894793ec0.js
Uploaded 9 of 26 assets
Uploaded 18 of 26 assets
Uploaded 26 of 26 assets
✨ Success! Uploaded 26 files (3 already uploaded) (2.26 sec)

Total Upload: 13982.27 KiB / gzip: 2309.95 KiB
Worker Startup Time: 26 ms
Your Worker has access to the following bindings:
- Assets:
  - Binding: ASSETS
Uploaded opencloudmap (19.24 sec)
Deployed opencloudmap triggers (1.33 sec)
  https://opencloudmap.mathewlewallen.workers.dev
Current Version ID: a9aae92d-9b97-483c-88c5-b6b802652230
├ Waiting for DNS to propagate. This might take a few minutes.
│ DNS propagation complete.
│
├ Waiting for deployment to become available
│ deployment is ready at: https://opencloudmap.mathewlewallen.workers.dev
│
├ Opening browser
│
╰ Done 

──────────────────────────────────────────────────────────────────────────────────
🎉  SUCCESS  Application deployed successfully!

🔍 View Project
Visit: https://opencloudmap.mathewlewallen.workers.dev
Dash: https://dash.cloudflare.com/?to=/:account/workers/services/view/opencloudmap

💻 Continue Developing
Change directories: cd opencloudmap
Start dev server: pnpm run dev
Deploy again: pnpm run deploy

📖 Explore Documentation
https://developers.cloudflare.com/workers

🐛 Report an Issue
https://github.com/cloudflare/workers-sdk/issues/new/choose

💬 Join our Community
https://discord.cloudflare.com
────────────────────────────────