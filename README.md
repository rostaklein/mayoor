# ⚠️ WIP refactor in progress
---

Whats changing:
- API to be migrated to serverless
- FE migration to Next.js
- database to MongoDB
- deployment to Vercel
- dependencies updates

---
[![mayoor](https://i.imgur.com/9vy73QH.jpg)](https://github.com/rostaklein/mayoor)

Modern order management system built with the latest tech stack.

## Whats included? 🚀

- orders + customers CRUD
  - forms, lists
  - validations
- frontend localization
- deployment setup
- end to end tests

## Tech stack

- TypeScript
- React
- GraphQL
- Prisma (latest version 2)
- NexusJS
- Apollo Server, Apollo Client
- Formik
- styled-components
- Ant design
- ESLint

## Live app demo

🌍 Visit [http://mayoor.herokuapp.com/](http://mayoor.herokuapp.com/) - and log in with username: `admin`, password: `admin`

## Screenshots

![mayoor - Add Customer](https://i.imgur.com/BJvWzLG.png)
![mayoor - Add Order](https://i.imgur.com/0IJwvBX.png)
![mayoor - List Orders](https://i.imgur.com/MdJc9eE.png)

## Why does it exist?

The main motivation is to provide a codebase for an order management system that **you can build on top of**.

> This project was built with a main focus as a support software for a company that prints PVC banners etc. Thats the reason why you might find some business specific pieces of code. The company is based in Czechia 🇨🇿, thats also the reason why the default currency is CZK and there are Czech translations.

> Also this project is a result of my masters thesis on the University of Economics in 2020 👨‍🎓

## Requirements

- [Node.js v12](https://nodejs.org/en/download/) (includes NPM)
- [Git](https://git-scm.com/downloads)
- (optional, see below) [Docker Desktop](https://www.docker.com/products/docker-desktop)

You will need to provide a PostgreSQL database URL to have this app running. It is pretty much up to you where do you want to host this database.
The recommended way is to spin it up **using Docker**. To do so:

1. install [Docker Desktop](https://www.docker.com/products/docker-desktop) (follow all the steps there, restart might be required)
2. run
   `make dev-db` (works on MacOS and Linux),
   or manually by (for Windows):
   `docker-compose -f docker-compose.dev-db.yml up -d`
3. the database is now up and running as deamon (the `-d` flag), you can verify this by running
   `docker ps -a | grep 54320`
   (check that postgres is running)
4. check that the database is running by logging into Adminer [http://localhost:8089/?pgsql=db&username=mayoor-user&db=mayoor-db](http://localhost:8089/?pgsql=db&username=mayoor-user&db=mayoor-db) password is `developer1`

Later on, you can turn off the docker deamon by running:
`docker-compose -f docker-compose.dev-db.yml down` (in the root folder of this project)

> If you dont want to use Docker, you can use a remote hosted database for dev env as well (not recommended, though!). Free plans for postgre e.g. here - [https://www.elephantsql.com/](https://www.elephantsql.com/plans.html) are ok for this kind of app. You will need to provide the connection URL to the ENV variables in [backend setup](./backend/README.md).

## Getting started

To get the up and running in development mode, you need to follow these two:

Clone this repository:

`git clone https://github.com/rostaklein/mayoor`

🏃‍♂️Get both parts running:

- [backend](./backend/README.md)
- [frontend](./frontend/README.md)

## License

MIT

---

_Rostislav Klein - mayoor - **ma**nage **yo**ur **or**ders - 2020_
