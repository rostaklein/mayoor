# mayoor backend

### Requirements

You will need to provide a PostgreSQL database URL to have this app running. It is pretty much up to you where do you want to host this database.
The recommended way is to spin it up using Docker. To do so:

1. go to the root of this project
   `cd ..`
2. run
   `make dev-db` (works on MacOS and Linux),
   or manually by:
   `docker-compose -f docker-compose.dev-db.yml up -d`
3. the database is now up and running, you can verify this by running
   `docker ps -a | grep 54320`
   (check that postgres is running)

This docker-compose will spin up and Adminer web database access, so you can check how does the database look like via web UI. The URL is: [http://localhost:8089/?pgsql=db&username=user&db=db](http://localhost:8089/?pgsql=db&username=user&db=db) password is `pwd`

---

If you dont want to use docker, you can use a remote hosted database for dev env as well (not recommended, though!). Free plans for postgre e.g. here - [https://www.elephantsql.com/](https://www.elephantsql.com/plans.html) are ok for this kind of app.

## Development mode

1. copy and rename `.env.example` to `.env`

- the `DATABASE_URL` is postgres local url if you start it using docker-compose provided in the requirements above
  > remember, you will need to provide all of these variables to the production run environment once you deploy the app

2. run prisma migrations
   `npm run database:migrate`
   > If this fails, its probably that prisma is not picking up the `.env` file, so you might need to set it manually:
   > Windows - run in cmd:
   > `set DATABASE_URL=postgresql://user:pwd@localhost:54320/db`
   > MacOS - run in shell:
   > `export DATABASE_URL=postgresql://user:pwd@localhost:54320/db`
3. seed the database with initial data
   `npm run database:seed` (recommended, so you will have an admin user ready)
4. run app in dev mode
   `npm run dev`
5. 🚀open [http://localhost:4444/graphql](http://localhost:4444/graphql) to view the GraphQL playground 🚀

## Working with Prisma

This repo is defined "schema-first", that means it uses [Prisma Migrate](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-migrate) to manipulate with the database schema, even though it is still experimental feature of Prisma.

E.g. adding a new database table:

1. add it to the schema in `./prisma/schema.prisma` ([data modeling manual](https://www.prisma.io/docs/understand-prisma/data-modeling))
2. create a migration file for it by
   `npx prisma migrate save --experimental`
3. run the migration against the database
   `npx prisma migrate up --experimental`
4. generate the prisma types
   `npm run generate:prisma`
5. ✅Now you should be able to access this object through Prisma Client

- test e.g. in any query resolver by accessing the Prisma Client in the context
  `./src/queries/customers/getCustomer.ts` try `ctx.prisma`.. and you should see the TypeScript Intellisense

## Working with Nexus

1. e.g. add a new GraphQL query to `./src/queries/material`
2. add it to the index file in `./src/queries/index.ts`
3. run
   `npm run generate:nexus`
4. it should generate types for all of the queries arguments, return types etc. into `./src/generated/nexus.ts`
