export

.PHONY: dev e2e

DEV_DC = docker-compose

dev:
	$(DEV_DC) up --build

E2E_DC = docker-compose -f docker-compose.yml -f docker-compose.cypress.yml -p e2e

e2e:
	$(E2E_DC) build
	$(E2E_DC) up --exit-code-from cypress
