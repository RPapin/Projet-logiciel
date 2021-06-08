# variables
IMAGE_NAME = g4/elective:v1
APP_NAME = elective
PORT = 8080
MONGODB_PORT = 27017

#commands
build:
	docker build -t $(IMAGE_NAME) . -f ${PWD}/Dockerfile

start:
	docker run -i -t --rm -p=$(PORT):$(PORT) -p=$(MONGODB_PORT):$(MONGODB_PORT) -v ${PWD}/work:/home/elective/work --name="$(APP_NAME)" $(IMAGE_NAME)
startd:
	docker run -i -t --rm -d -p=$(PORT):$(PORT) -p=$(MONGODB_PORT):$(MONGODB_PORT) -v ${PWD}/work:/home/elective/work --name="$(APP_NAME)" $(IMAGE_NAME)

stop:
	docker stop $(APP_NAME)

restart: stop startd

shell:
	docker exec -it $(APP_NAME) bash