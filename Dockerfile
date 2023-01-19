FROM node:16-alpine

WORKDIR /maumlab-assignment/
COPY ./package.json /maumlab-assignment/
COPY ./yarn.lock /maumlab-assignment/
RUN yarn install

COPY . /maumlab-assignment/

CMD yarn start:dev