[![mayoor](https://i.imgur.com/9vy73QH.jpg)](https://github.com/rostaklein/mayoor)

Modern order management system built with the latest tech stack.

## Whats included? 🚀

- orders + customers CRUD
  - forms, lists
  - validations
- frontend localization
- deployment setup

## Tech stack

- TypeScript
- React
- GraphQL
- Prisma (v3)
- NexusJS
- Apollo Micro Server (serverless)
- Apollo Client
- Formik
- styled-components
- Ant Design
- ESLint, Prettier

## Live app demo

🌍 Visit [http://mayoor.vercel.app/](http://mayoor.vercel.app/) - and log in with username: `admin`, password: `admin`

## Requirements

- installed [Node.js v20](https://nodejs.org/en/download/) (includes NPM)
- basic knowledge of [Git](https://git-scm.com/downloads)
- [MongoDB](https://www.mongodb.com/atlas) url (recommended hosting on MongoDB Atlas - free tier is enough)

## Getting started

Clone this repository:

`git clone https://github.com/rostaklein/mayoor`

1. Install dependencies
   `npm i`
   post install hook will make sure it generates all the necessary types - Prisma and Nexus for backend development + Apollo (graphql-codegen) for FE development

2. Edit environment variables

- copy `.env.example` into `.env` and `prisma/.env.example` into `prisma/.env`
- fill in with requried info (client secret nad prisma DB url - you can host MongoDB on your own, but strongly recommended to use the hosted Atlas version)

3. Run locally via
   `npm run dev`

4. Done. Profit 🎉

- frontend should be running at http://localhost:3000
- GraphQL API running at http://localhost:3000/api/graphql

## Deployment

- this app is ready to be deployed immediately to [Vercel](https://vercel.com/)
- GraphQL server works via serverless functions
- just link your GitHub repo with Vercel and let them do all the necessary stuff (dont forget to add environment variables via Vercel project settings)

## Why does it exist?

The main motivation is to provide a codebase for an order management system that **you can build on top of**.

> This project was built with a main focus as a support software for a company that prints PVC banners etc. Thats the reason why you might find some business specific pieces of code. The company is based in Czechia 🇨🇿, thats also the reason why the default currency is CZK and there are Czech translations.

> Also this project is a result of my masters thesis on the University of Economics in 2020 👨‍🎓

## Screenshots

![mayoor - Add Customer](https://i.imgur.com/BJvWzLG.png)
![mayoor - Add Order](https://i.imgur.com/0IJwvBX.png)
![mayoor - List Orders](https://i.imgur.com/MdJc9eE.png)

## License

MIT

---

_Rostislav Klein - mayoor - **ma**nage **yo**ur **or**ders - 2020_
