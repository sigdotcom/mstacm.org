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

## Coding Conventions
We use [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) to format and style all of our code, please get those installed and configured in your preffered editor while working on code!

## Keeping up with the main branch
Before you merge your changes, and also after big changes go into the main branch, you will want to get up to date with main. To do this, we use a technique called rebasing. This is better explained [here](https://www.atlassian.com/git/tutorials/rewriting-history/git-rebase) so please read up.

When you want to get up to date, commit all of your changes, then use this command:
```
git pull --rebase origin master
```
which will pull any changes from the origin, and then rebase your changes on top of master. This starts a rebase, so complete the rebase by using the knowledge gained from the link above.
