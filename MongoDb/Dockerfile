#
# MongoDB Dockerfile
#
# https://github.com/dockerfile/mongodb
#

FROM ubuntu:20.04

LABEL maintainer="g4"

# Install MongoDB.
RUN \
  apt-get update && \
  apt-get install -y sudo gnupg gosu curl wget systemctl ca-certificates  && \
  wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | apt-key add - && \
  echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list && \
  apt-get update && \
  apt-get install -y mongodb-org && \
  rm -rf /var/lib/apt/lists/*

# Define mountable directories.
VOLUME ["/data/db"]

# Define working directory.
WORKDIR /data

# Define default command.
CMD ["mongod"]

# Expose ports.
#   - 27017: process
#   - 28017: http
EXPOSE 27017
EXPOSE 28017