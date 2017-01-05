FROM node:boron-alpine

RUN mkdir /mz-node-sample

WORKDIR /mz-node-sample

ADD package.json /mz-node-sample/package.json

ADD . /mz-node-sample

RUN npm install
