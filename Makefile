COMPOSE_CONF_PATH=.

up:
	docker-compose -f ${COMPOSE_CONF_PATH}/docker-compose.yml --env-file ${COMPOSE_CONF_PATH}/.env up

down:
	docker-compose -f ${COMPOSE_CONF_PATH}/docker-compose.yml down

stop:
	docker-compose -f ${COMPOSE_CONF_PATH}/docker-compose.yml stop

ubfr:
	docker-compose -f ${COMPOSE_CONF_PATH}/docker-compose.yml up --build --force-recreate

ufr:
	docker-compose -f ${COMPOSE_CONF_PATH}/docker-compose.yml up --force-recreate

clean: down stop

test:
	npm run test

build: ubfr

simple-build:
	docker-compose -f ${COMPOSE_CONF_PATH}/docker-compose.yml build

sbuild: simple-build

start: up