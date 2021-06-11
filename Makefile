# variables
SUBDIRS = MongoDb NodeJs

#commands
build:
	for dir in $(SUBDIRS); do \
		$(MAKE) -C $$dir build; \
	done

start:
	for dir in $(SUBDIRS); do \
		$(MAKE) -C $$dir startd; \
	done

startd: start

stop:
	for dir in $(SUBDIRS); do \
		$(MAKE) -C $$dir stop; \
	done

restart: stop startd