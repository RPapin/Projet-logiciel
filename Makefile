COMPOSE_CONF_PATH=.

up:
	docker-compose -f ${COMPOSE_CONF_PATH}/docker-compose.yml up

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

mdbshell:
	docker exec -it mongodbelective bash

ordereatshell:
	docker exec -it ordereat bash

removevolumes:
	docker volume rm projet-logiciel_mongodata

rmv: removevolumes