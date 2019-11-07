FROM node:12

WORKDIR /server

COPY . /server
ADD package.json /server/package.json
RUN yarn

EXPOSE 4000
RUN yarn build
CMD yarn start:prod
