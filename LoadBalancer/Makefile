# variables
IMAGE_NAME = g4/loadbalancerelective:v1
APP_NAME = loadbalancer
PORT = 8084

# Absolute path to this script. /home/user/bin/foo.sh
SCRIPT := $(abspath $(lastword $(MAKEFILE_LIST)))
# Absolute path this script is in. /home/user/bin
SCRIPTPATH := $(dir $(SCRIPT))

#commands
build:
	docker build -t $(IMAGE_NAME) . -f "$(SCRIPTPATH)/Dockerfile"

start:
	docker run -i -t --rm -p=$(PORT):4001 -v $(SCRIPTPATH)/work/LoadBalancer:/home/elective/work --name="$(APP_NAME)" $(IMAGE_NAME)
startd:
	docker run -i -t --rm -d -p=$(PORT):4001 -v $(SCRIPTPATH)/work/LoadBalancer:/home/elective/work --name="$(APP_NAME)" $(IMAGE_NAME)

stop:
	docker stop $(APP_NAME)

restart: stop startd

shell:
	docker exec -it $(APP_NAME) bash