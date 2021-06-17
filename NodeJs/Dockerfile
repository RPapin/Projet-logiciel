FROM node:14.17

LABEL maintainer="g4"

WORKDIR /home/elective/work

ENV DEBIAN_FRONTEND noninteractive
ENV TZ=UTC

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN apt-get update \
    && apt-get install -y sudo gnupg gosu curl wget systemctl ca-certificates zip unzip git libcap2-bin libpng-dev python2 \
    && npm install mongoose \
    && npm install -g typescript \
    && npm install -g router \
    && npm install -g vuex \
    && npm install -g @vue/cli \
    && npm install -g lint-formatter \
    && npm install -g dotenv \
    && npm install express-generator -g 

RUN groupadd --force www-data
RUN groupadd --force elective
RUN useradd -ms /bin/bash --no-user-group --groups www-data,elective -u 1337 elective

# Expose ports.
#   - 8080 : nodejs
EXPOSE 8080

CMD [ "npm", "run", "start.dev" ]