FROM node:latest

WORKDIR /server

COPY . /server
ADD package.json /server/package.json
RUN yarn install

EXPOSE 4000
RUN yarn build
CMD yarn start:dev
