FROM node:16.5.0-alpine3.14

ENV APP_ROOT /app/
WORKDIR ${APP_ROOT}
COPY package*.json ${APP_ROOT}
COPY yarn.lock ${APP_ROOT}

RUN yarn install

COPY ./server ${APP_ROOT}/server
