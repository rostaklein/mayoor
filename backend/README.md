# mayoor backend

## Development mode

1. copy
   `./backend/.env.example` to `./backend/.env`
   and
   `./backend/prisma/.env.example` to `./backend/prisma/.env`
   You can leave all of the values in the files as is.

2. make sure your current working directory is `./backend`
3. install dependencies
   `npm install`
4. run prisma migrations
   `npm run database:migrate`
   > If this fails, its probably that prisma is not picking up the `.env` file, so you might need to set it manually:
   > Windows - run in cmd:
   > `set DATABASE_URL=postgresql://mayoor-user:developer1@localhost:54320/mayoor-db`
   > MacOS - run in shell:
   > `export DATABASE_URL=postgresql://mayoor-user:developer1@localhost:54320/mayoor-db`
5. seed the database with initial data
   `npm run database:seed`
6. run app in dev mode
   `npm run dev`
7. 🚀open [http://localhost:4444/graphql](http://localhost:4444/graphql) to view the GraphQL playground 🚀
8. (optional) To test, that the GraphQL server is working, copy and paste this query to the GraphQL playground:

```graphql
mutation {
  login(email: "admin", password: "admin") {
    user {
      name
      email
      role
    }
    token
  }
}
```

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
