FROM node:12

WORKDIR /server

COPY . /server
RUN yarn

EXPOSE 4000
RUN yarn build
CMD yarn start:prod
