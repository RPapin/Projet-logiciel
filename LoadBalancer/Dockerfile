FROM node:14.17

LABEL maintainer="g4"

WORKDIR /home/elective/work

ENV DEBIAN_FRONTEND noninteractive
ENV TZ=UTC

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN apt-get update \
    && npm install mongoose \
    && npm install -g typescript \
    && npm install -g router \
    && npm install -g lint-formatter \
    && npm install -g dotenv \
    && npm install express-generator -g \
    && npm install -g body-parser@1.17.1 request@2.81.0 \
    && npm install -g cors

RUN groupadd --force www-data
RUN groupadd --force elective
RUN useradd -ms /bin/bash --no-user-group --groups www-data,elective -u 1337 elective

# Expose ports.
#   - 4001 : Express
EXPOSE 4001

CMD ["node"]