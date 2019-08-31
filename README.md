# mstacm.org
Monorepo containing all services running under the mstacm.org domain written
using React, TypeScript, Graphql, and docker.

## Starting the API
```
git clone git@github.com:sigdotcom/mstacm.org.git
cd mstacm.org/api/
cp .docker/web.env.default .docker/web.env
docker-compose up
# Navigate to http://localhost on your favorite browser for the GraphQL
# playground
```

## Developing
I recommend installing [altair](https://altair.sirmuel.design/).

## Deployment
The deployment of the website is targeted to be as automated as possible, but
these steps serve as a safe guard in case something breaks or to bolster
understanding of the underlying system.

To setup automatic deployment, perform the following steps:
1. ssh into the production server:
    ```bash
    ssh changeme-user@changeme-host
    ```
2. If this is a fresh new server, perform some kind of ssh hardening
   as automatic deployment currently occurs over ssh:
    + https://linux-audit.com/audit-and-harden-your-ssh-configuration/
    + https://www.cyberciti.biz/tips/linux-unix-bsd-openssh-server-best-practices.html
    + https://medium.com/@jasonrigden/hardening-ssh-1bcb99cd4cef
3. Install [Docker Compose](https://docs.docker.com/compose/install/)
4. Clone the `mstacm.org` repo in `/opt/`:
	```bash
	cd /opt/
	sudo git clone git@github.com:sigdotcom/mstacm.org.git
	sudo chown -R <YOUR_USERNAME>:<YOUR_USERNAME> mstacm.org/
	```
5. Setup the necessary secrets:
	```bash
	# Enter the directory
	cd mstacm.org/api
	# Create docker environment variable file
	cp .docker/web.env.default .docker/web.env
	vim .docker/web.env
	# Return to root repository directory
	cd ..
	```
5. Run `deploy.sh` in the root repository:
	```bash
	bash deploy.sh
	```
