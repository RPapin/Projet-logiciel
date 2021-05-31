# variables
IMAGE_NAME = g4/elective:v1
APP_NAME = elective
PORT = 8888

#commands
build:
	docker build -t $(IMAGE_NAME) . -f ${PWD}/Dockerfile

start:
	docker run -i -t --rm -p=$(PORT):$(PORT) -v ${PWD}/work:/home/elective/work --name="$(APP_NAME)" $(IMAGE_NAME)
startd:
	docker run -i -t --rm -d -p=$(PORT):$(PORT) -v ${PWD}/work:/home/elective/work --name="$(APP_NAME)" $(IMAGE_NAME)

stop:
	docker stop $(APP_NAME)

restart: stop start

shell:
	docker exec -it $(APP_NAME) bash