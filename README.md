

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

Monorepo containing all services running under the \*.mstacm.org domains built
with [TypeScript](https://www.typescriptlang.org/), [Apollo
GraphQL](https://www.apollographql.com/), and
[Docker](https://www.apollographql.com/).

[mstacm.org](https://mstacm.org) hopes to automate all of the manual task's ACM
has performed primarily by hand include:
+ **Events** - Automatically advertise events via email, text, or app
  notifications; allow users to check-in to events; and pay for event
  registration using electronic payments such as credit cards.
+ **Dues** - Collect club dues and provide advanced metrics on who has payed dues and
  when.

Future work hopes to expand upon these primary principles to make how
companies, ACM members, and students interact with ACM as an organization more
enjoyable and efficient.


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

### Installation
 
1. Clone the mstacm.org
```sh
# Make sure to setup ssh keys on your github account
# https://help.github.com/en/articles/adding-a-new-ssh-key-to-your-github-account
git clone https:://github.com/sigdotcom/mstacm.org.git
```

<!-- USAGE EXAMPLES -->
## Usage

Since this repository is a monorepo, the best way to use its various
functionality is by exploring the directories contain each project. These
include:
+ ``api`` - The GraphQL backend that powers all of our database interactions.
+ ``apps`` - All of the frontend react applications that users (companies, ACM
  Executives, etc.) interact with.

Each project will contain its own installation / setup instructions to follow.
Bare minimum functionality requires you to run ``api`` and ``apps/web`` at the
same time. 


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
