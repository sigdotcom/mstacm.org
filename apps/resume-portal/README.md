# resumes.mstacm.org
[View Live](https://resumes.mstacm.org) |
[Report Bug](https://github.com/sigdotcom/mstacm.org/issues) |
[Request Feature](https://github.com/sigdotcom/mstacm.org/issues)

[![resumes.mstacm.org][product-screenshot]](https://resumes.mstacm.org)

[resumes.mstacm.org](https://resumes.mstacm.org) is a company-facing page that
allows recruiters to view the S&T ACM resume database. The primary features include:
+ **Resume Previews** - Recruiters can preview resumes straight from the portal,
  saving them time reading through resumes
+ **Persistent Favoriting** - Recruiters can persistently favorite resumes they
  like 
+ **Filtering** - Resumes can be searched by student's name. Future work will add
  more filtering options
+ **Bulk Actions on Favorites** - All favorited resumes can be downloaded or
  emailed at once in the `favorites` menu

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
+ [NodeJS](https://nodejs.org/)
+ [Yarn](https://yarnpkg.com/)
+ [Docker](https://docs.docker.com/get-docker/)

### Installation
 
1. Clone the mstacm.org repository using Git Bash:
```sh
# Make sure to setup ssh keys on your github account
# https://help.github.com/en/articles/adding-a-new-ssh-key-to-your-github-account
git clone git@github.com:sigdotcom/mstacm.org.git
```

2. Navigate to the `apps/resume-portal` directory:
```sh
cd apps/resume-portal/
```

3. Install all necessary dependencies:
```sh
yarn install
```

<!-- USAGE EXAMPLES -->
## Usage

The entire page requires the GraphQL API to be running.  Please view the [API
Installation Instructions](../api/README.md) for more information.

Before running the page locally, make sure docker is up and running (just open up
the docker desktop app that you installed in the Prerequisite step above. Once
docker is running, navigate to the apps directory and start docker using

### `docker-compose up`

For more detailed steps, refer to the readme file in the api directory.

In the project directory (resume-portal/), you can run:

### `yarn start`

Runs the app in the development mode.<br /> Open
[http://localhost:3000](http://localhost:3000) to view it in the browser.

If you get an error saying something like:
TypeError: Cannot read properties of undefined...

Make sure your environment variables are configured. You'll need to get those
from Digital Ocean so reach out to one of the chairs of ACM-Web. Once your
files are updated, refer to step 4 in Installation in the api readme.

The page will reload if you make edits.<br /> You will also see any lint errors
in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br /> See the section
about [running
tests](https://create-react-app.dev/docs/running-tests) for more
information.

### `yarn build`

Builds the app for production to the `build` folder.<br /> It correctly bundles
React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br /> Your app is
ready to be deployed!

See the section about
[deployment](https://create-react-app.dev/docs/deployment) for
more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can
`eject` at any time. This command will remove the single build dependency from
your project.

Instead, it will copy all the configuration files and the transitive
dependencies (Webpack, Babel, ESLint, etc) right into your project so you have
full control over them. All of the commands except `eject` will still work, but
they will point to the copied scripts so you can tweak them. At this point
you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for
small and middle deployments, and you shouldn’t feel obligated to use this
feature. However we understand that this tool wouldn’t be useful if you couldn’t
customize it when you are ready for it.


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
   organization][sigdotcom-organization]
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
[sigdotcom-organization]: https://github.com/sigdotcom/
[product-screenshot]: images/resume-portal-homepage.png 
