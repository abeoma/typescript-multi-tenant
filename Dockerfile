FROM node:16.5.0-alpine3.14

ENV APP_ROOT /app
WORKDIR ${APP_ROOT}

# Paths
ENV VERSION_PATH=${APP_ROOT}/version


# yarn install
COPY package*.json ${APP_ROOT}
COPY yarn.lock ${APP_ROOT}
COPY tsconfig.json ${APP_ROOT}
COPY nodemon.json ${APP_ROOT}

RUN yarn install

COPY ./server ${APP_ROOT}/


# BOOTSTRAP
ARG BOOTSTRAP

COPY ${BOOTSTRAP:-server/start_app.sh} /bootstrap.sh
RUN chmod +x /bootstrap.sh

RUN date +%s | sha1sum | base64 | fold -w 32 | head -1 > ${APP_ROOT}/version

CMD ["/bootstrap.sh"]
