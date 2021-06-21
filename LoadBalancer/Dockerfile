FROM node:14.17

LABEL maintainer="g4"

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install dependencies
COPY ./package.json .
RUN npm install


# Bundle app source
COPY . .


# Expose ports.
#   - 3000 : Load Balancer
EXPOSE 3000

CMD [ "npm", "run", "start.dev" ]