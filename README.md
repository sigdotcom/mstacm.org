# \*.mstacm.org
[View Live](https://mstacm.org) |
[Report Bug](https://github.com/sigdotcom/mstacm.org/issues) |
[Request Feature](https://github.com/sigdotcom/mstacm.org/issues)


[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

Monorepo containing all services running under the \*.mstacm.org domains built
with [TypeScript](https://www.typescriptlang.org/), [Apollo
GraphQL](https://www.apollographql.com/), and
[Docker](https://www.docker.com/).

[\*.mstacm.org](https://mstacm.org) hopes to automate all of the manual task's ACM
has performed primarily by hand including:
+ **Events** - Automatically advertise events via email, text, or app
  notifications; allow users to check-in to events; and pay for event
  registration electronically.
+ **Dues** - Collect dues and provide advanced metrics on when dues were payed.

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
 
1. Clone the mstacm.org repository using Git Bash:
    ```bash
    git clone https://github.com/sigdotcom/mstacm.org.git
    ```

<!-- USAGE EXAMPLES -->
## Usage

Since this repository is a monorepo, the best way to use its various
functionality is by exploring the directories containing each project.

Find these projects in the `apps` directory, where we store all of the
applications we have built for our web services

Each project will contain its own installation / setup instructions to follow in their respective `README.md`.


<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/sigdotcom/mstacm.org/issues) for a list
of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to
be learn, inspire, and create. Any contributions you make are **greatly
appreciated**.

We use a pattern known as [Github Flow](https://guides.github.com/introduction/flow/). Click that link to learn more.

### ACM Web Members
**One-time set up:**
1. Ask the Chair of ACM Web to add you to the [sigdotcom
   organization][sigdotcom-organization]
2. Clone the mstacm.org repository
    ```bash
    git clone https://github.com/sigdotcom/mstacm.org.git
    ```
**Every feature:**
1. Update your local master branch 
    ```bash
    git switch master # "git checkout master" if git < 2.23
    git pull master
    ```
2. Create your branch
    ```bash
    git switch -c feature/<feature-name>
    ```
    > where `<feature-name>` is replaced with a short description of
    your feature (ex. `admin-permission-tool` for a feature adding a new tool to admin-web)

    Name your commits with `feature/` or `hotfix/` at the beginning depending on the content of the branch. (ex. `feature/new-icons`, `hotfix/icon-render-glitch`)
  
3. Add and commit your Changes 
    ```bash
    git add file1 file2 ... # only add relevant files
    git commit -m 'Add some great specific and well described features' # After the "-m" goes the commit message
    ```
    > Read [this article about good commit messages](https://chris.beams.io/posts/git-commit/) to maintain good quality commits
4. Push to the remote branch
    ```bash
    git push origin feature/<feature-name>
    ```
5. [Open a Pull Request on Github](https://github.com/sigdotcom/mstacm.org/compare)
6. Grab a new issue to work on and start from the top!

### Outside Contributors
1. Fork the mstacm.org repository
2. Create your branch
    ```bash
    git switch -c feature/<feature-name>
    ```
    > where <feature-name> is replaced with a short description of
    your feature (ex. admin-permission-tool for a feature adding a new tool to admin-web)

    Name your commits with `feature/` or `hotfix/` at the beginning depending on the content of the branch. (ex. `feature/new-icons`, `hotfix/icon-render-glitch`)
  
3. Add and commit your Changes 
    ```bash
    git add file1 file2 ... # only add relevant files
    git commit -m 'Add some great specific and well described features' # After the "-m" goes the commit message
    ```
  > Read [this article about good commit messages](https://chris.beams.io/posts/git-commit/) to maintain good quality commits
4. Push to the remote branch
    ```bash
    git push origin feature/<feature-name>
    ```
5. [Open a Pull Request on Github](https://github.com/sigdotcom/mstacm.org/compare)
6. Grab a new issue to work on and start from the top!



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
