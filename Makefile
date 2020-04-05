export

.PHONY: dev-db e2e

DEV_DB_DC = docker-compose -f docker-compose.dev-db.yml

dev-db:
	$(DEV_DB_DC) up -d

dev-db-full:
	$(DEV_DB_DC) down
	$(DEV_DB_DC) up -d
	cd ./backend && npm run database:migrate && npm run database:seed

E2E_DC = docker-compose -f docker-compose.e2e-env.yml -f docker-compose.cypress.yml -p e2e

e2e:
	$(E2E_DC) build
	$(E2E_DC) up --exit-code-from cypress
