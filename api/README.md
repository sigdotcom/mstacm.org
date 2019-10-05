

# api.mstacm.org
[View Live](https://api.mstacm.org) |
[Report Bug](https://github.com/sigdotcom/mstacm.org/issues) |
[Request Feature](https://github.com/sigdotcom/mstacm.org/issues)


[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

[api.mstacm.org](https://api.mstacm.org) is the primary [Apollo GraphQL
API](https://www.apollographql.com/) that drives all database interactions from
all frontend clients. Primary features include but are not limited to:
+ **Payment Processing** - The ability to process arbitrary payments using
  [Stripe](https://stripe.com)
+ **Event Management** - Creating, modifying, and deleting ACM events
+ **Permission** - Scope-based permissions systems that allow for groups of
  permissions
+ **JWT Authentication** - Authenticates users with [Auth0](https://auth0.com)
  JWT tokens

<!-- TABLE OF CONTENTS -->
## Table of Contents

* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)


<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites
+ [Git](https://git-scm.com/download/)
+ [Docker](https://docs.docker.com/install/)
+ [Docker Compose](https://docs.docker.com/compose/install/)
+ [NodeJS](https://nodejs.org/en/)
+ [yarn](https://yarnpkg.com/)

### Installation
 
1. Clone the mstacm.org using Git Bash
```sh
# Make sure to setup ssh keys on your github account
# https://help.github.com/en/articles/adding-a-new-ssh-key-to-your-github-account
git clone https:://github.com/sigdotcom/mstacm.org.git
```
2. Navigate to the `api` directory:
```sh
cd api
```

3. Install necessary dependencies:
```sh
yarn install
```

4. Copy the docker environment variables template into the docker environment
   file:
```sh
cd .docker/web.env.default .docker/web.env
```
5. Start the docker containers using `docker-compose`:
```sh
docker-compose up
```
6. If everything goes well, it should look like:
```bash
>>> docker-compose up
Starting api_phoenix_db_1 ... done
Starting api_phoenix_web_1 ... done
Starting api_phoenix_nginx_1 ... done
Attaching to api_phoenix_db_1, api_phoenix_web_1, api_phoenix_nginx_1
phoenix_db_1     | 2019-10-05 04:23:12.809 UTC [1] LOG:  listening on IPv4 address "0.0.0.0", port 5432
phoenix_db_1     | 2019-10-05 04:23:12.809 UTC [1] LOG:  listening on IPv6 address "::", port 5432
phoenix_web_1    | yarn run v1.17.3
phoenix_web_1    | $ NODE_ENV='development' nodemon
phoenix_db_1     | 2019-10-05 04:23:12.819 UTC [1] LOG:  listening on Unix socket "/var/run/postgresql/.s.PGSQL.5432"
phoenix_db_1     | 2019-10-05 04:23:12.844 UTC [24] LOG:  database system was shut down at 2019-10-03 20:15:56 UTC
phoenix_db_1     | 2019-10-05 04:23:12.860 UTC [1] LOG:  database system is ready to accept connections
phoenix_web_1    | [nodemon] 1.19.2
phoenix_web_1    | [nodemon] to restart at any time, enter `rs`
phoenix_web_1    | [nodemon] watching dir(s): src/**/*
phoenix_web_1    | [nodemon] starting `ts-node -r tsconfig-paths/register src/main.ts`
phoenix_web_1    | Server is running, GraphQL Playground available at:
phoenix_web_1    |
phoenix_web_1    |       http://localhost/graphql || http://localhost:4000/graphql
```
7. Navigate to [http://localhost/graphql](http://localhost/graphql). **NOTE**:
   if you are using Docker on Windows 10 Home, you need to put the IP of your
   docker-machine instead of `localhost`. This is usually something like
   `192.168.99.100`. You should see something like:

![GraphQL Playground](images/graphql-localhost-playground.png)


<!-- USAGE EXAMPLES -->
## Usage

To interact with api.mstacm.org, we recommend installing
[altair](https://altair.sirmuel.design/) or [insomnia](https://insomnia.rest/).
[Altair](https://altair.sirmuel.design/) by itself is a much better GraphQL
client, but [insomnia](https://insomnia.rest/) is quickly catching up in terms
of GraphQL-specific features and is has more features in-general.

We will use [insomnia](https://insomnia.rest/) to show off basic usage,
but the lessons apply to both clients.

### Your First Query
1. Open the [insomnia](https://insomnia.rest) client:
[![Insomnia Initial Page](images/insomnia-initial-page.png)](images/insomnia-initial-page.png)

2. Click the `New Request` button or use the keyboard shortcut on the primary
   page. This will show:
[![Insomnia New Request](images/insomnia-new-request.png)](images/insomnia-new-request.png)

3. Change 'GET' -> 'POST' and 'No Body' -> 'GraphQL'. This will look like:
[![Insomnia Completed Request](images/insomnia-completed-request.png)](images/insomnia-completed-request.png)

4. Click 'Create' to create the new query. This will send you back the main
   screen.

5. Add the URL you connected to in the [Installation](#installation) section to
   the URL bar on the top. This will look like:
[![Insomnia Adding URL](images/insomnia-adding-url.png)](images/insomnia-adding-url.png)

6. Wait a couple of seconds and click the 'show schema' button on the right.
   This will look like:
[![Insomnia Show Documentation](images/insomnia-show-documentation.png)](images/insomnia-show-documentation.png)

7. Click 'Show Documentation' which should open up a menu on the right like:
[![Insomnia Documentation](images/insomnia-documentation.png)](images/graphql-localhost-playground.png)

8. If you do not see the picture above, go back through the instructions and
   make sure you followed everything correctly.

9. Look through the documentation to see all of the features the api has.

10. Play around with the insomnia schema-based auto-completion by typing in some
    sample commands and hitting 'send':
[![Insomnia First Query](images/insomnia-first-query.png)](images/insomnia-first-query.png)
[![Insomnia Autocomplete](images/insomnia-autocomplete.png)](images/graphql-localhost-playground.png)


<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/sigdotcom/mstacm.org/issues) for a list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to
be learn, inspire, and create. Any contributions you make are **greatly
appreciated**.

If you **are** apart of ACM Web:
1. Ask the Chair of ACM Web to add you to the [sigdotcom
   organization](https://git-scm.com/download/windows)
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

If you **are not** apart of ACM Web:
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MPL-2.0 License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

ACM Web - acm@mst.edu

Project Link: [https://github.com/sigdotcom/mstacm.org](https://github.com/sigdotcom/mstacm.org)



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/sigdotcom/mstacm.org.svg?style=flat-square
[contributors-url]: https://github.com/sigdotcom/mstacm.org/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/sigdotcom/mstacm.org.svg?style=flat-square
[forks-url]: https://github.com/sigdotcom/mstacm.org/network/members
[stars-shield]: https://img.shields.io/github/stars/sigdotcom/mstacm.org.svg?style=flat-square
[stars-url]: https://github.com/sigdotcom/mstacm.org/stargazers
[issues-shield]: https://img.shields.io/github/issues/sigdotcom/mstacm.org.svg?style=flat-square
[issues-url]: https://github.com/sigdotcom/mstacm.org/issues
[license-shield]: https://img.shields.io/github/license/sigdotcom/mstacm.org?style=flat-square
[license-url]: https://github.com/sigdotcom/mstacm.org/blob/master/LICENSE.txt