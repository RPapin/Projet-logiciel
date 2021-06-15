FROM ubuntu:20.04

LABEL maintainer="g4"

WORKDIR /home/elective/work

ENV DEBIAN_FRONTEND noninteractive
ENV TZ=UTC

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN apt-get update \
    && apt-get install -y sudo gnupg gosu curl wget systemctl ca-certificates zip unzip git libcap2-bin libpng-dev python2 \
    && mkdir -p ~/.gnupg \
    && chmod 600 ~/.gnupg \
    && echo "disable-ipv6" >> ~/.gnupg/dirmngr.conf \
    && apt-key adv --homedir ~/.gnupg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys E5267A6C \
    && apt-key adv --homedir ~/.gnupg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C300EE8C \
    && echo "deb http://ppa.launchpad.net/ondrej/php/ubuntu focal main" > /etc/apt/sources.list.d/ppa_ondrej_php.list \
    && apt-get update \
    && apt-get install -y nodejs npm \
    && apt-get install -y yarn \
    && apt-get -y autoremove \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* \
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


COPY start-container /usr/local/bin/start-container
RUN chmod +x /usr/local/bin/start-container

# Expose ports.
#   - 8080 : nodejs
EXPOSE 8080

ENTRYPOINT ["start-container"]

CMD ["node"]