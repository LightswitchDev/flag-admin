FROM node:13 as builder
ARG GITHUB_TOKEN

RUN mkdir /app
WORKDIR /app


COPY package*.json ./

RUN npm i 

COPY . ./


RUN npm run build

CMD [ "npm", "start" ]