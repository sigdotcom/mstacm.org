# mstacm.org
[View Live](https://mstacm.org) |
[Report Bug](https://github.com/sigdotcom/mstacm.org/issues) |
[Request Feature](https://github.com/sigdotcom/mstacm.org/issues)


[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

[![mstacm.org][product-screenshot]](https://mstacm.org)

[mstacm.org](https://mstacm.org) is the primary promotional, advertising, and
branding page for S&T ACM. The primary features include:
+ **Dynamic Events** - Automatically display the current ACM events in order of
  occurrence in the 'events section'
+ **Authentication** - User authentication using
  [auth0-spa-js](https://github.com/auth0/auth0-spa-js/)
+ **Dues Payment** - Ability to pay for dues using [Stripe](https://stripe.com)
  in the 'Membership' section
+ **Marketing / Branding** - Various sections which help promotes ACM and our
  various activities

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
+ [NodeJS](https://nodejs.org/en/)
+ [yarn](https://yarnpkg.com/)

### Installation
 
1. Clone the mstacm.org using Git Bash
```sh
# Make sure to setup ssh keys on your github account
# https://help.github.com/en/articles/adding-a-new-ssh-key-to-your-github-account
git clone https:://github.com/sigdotcom/mstacm.org.git
```

2. Navigate to the `apps/web` directory:
```sh
cd apps/web
```

3. Install all necessary dependencies:
```sh
yarn install
```

<!-- USAGE EXAMPLES -->
## Usage

Certain features like dynamic events and dues payment requires the GraphQL API
to be running. Please view the [API Installation
Instructions](api/README.md) for more information.

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br /> Open
[http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br /> You will also see any lint errors
in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br /> See the section
about [running
tests](https://facebook.github.io/create-react-app/docs/running-tests) for more
information.

### `yarn build`

Builds the app for production to the `build` folder.<br /> It correctly bundles
React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br /> Your app is
ready to be deployed!

See the section about
[deployment](https://facebook.github.io/create-react-app/docs/deployment) for
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
[product-screenshot]: images/homepage-hero.png
