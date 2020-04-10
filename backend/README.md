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
