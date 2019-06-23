# mstacm.org
Monorepo containing all services running under the mstacm.org domain written
using React, TypeScript, Graphql, and docker.

## Starting the API
```
git clone git@github.com:sigdotcom/mstacm.org.git
cd mstacm.org/api/
cp .docker/web.env.default .docker/web.env
docker-compose up
```
