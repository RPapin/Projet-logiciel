FROM node:14.17

LABEL maintainer="g4"

ARG APP_PATH

WORKDIR /home/elective/work

ENV DEBIAN_FRONTEND noninteractive
ENV TZ=UTC

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY ${APP_PATH}/. .

RUN npm install

RUN npm install mongoose \
    && npm install -g nodemon \
    && npm install -g npm-run-all \
    && npm install -g rimraf \
    && npm install -g router \
    && npm install -g vuex \
    && npm install -g lint-formatter \
    && npm install -g dotenv \
    && npm install -g express \
    && npm install -g express-generator

RUN groupadd --force www-data
RUN groupadd --force elective
RUN useradd -ms /bin/bash --no-user-group --groups www-data,elective -u 1337 elective

RUN ls -l

CMD [ "npm", "run", "start.dev" ]