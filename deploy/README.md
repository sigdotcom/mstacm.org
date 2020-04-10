# Deploy
Automated deployment of the \*.mstacm.org application stack using
[ansible][ansible-url] and [terraform][terraform-url]. The installation
instructions below will assume prior knowledge of [ansible][ansible-url] and
[terraform][terraform-url]. **NOTE**: deployment is only supported on a linux
machine. If you have a Windows computer, please use a linux jumpbox such as
`acmvm1.srv.mst.edu`.


## Table of Contents
+ [Requirements](#requirements)
+ [Installation](#installation)

## Requirements
+ [Terraform](https://www.terraform.io/docs/index.html)
+ [git](https://git-scm.com/downloads)
+ [ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html)
+ [poetry](https://python-poetry.org/)
+ Make sure you have access to the mstacm team in
  [DigitalOcean][digitalocean-url]. Ask the chair of ACM Web for access.
+ Make sure you have access to the mstacm team in [Netlify][netlify-url]. Ask
  the chair of ACM Web for access.
+ Make sure you have access to the mstacm team in
  [Terraform Cloud][terraform-cloud-url]. Ask the chair of ACM Web for access.


## Installation
1. Clone the repository to your local computer by running: 
    ```bash
    # Make sure to setup ssh keys on your github account
    # https://help.github.com/en/articles/adding-a-new-ssh-key-to-your-github-account
    git clone https://github.com/sigdotcom/mstacm.org.git
    ```

2. Generate a new (or reuse an old) DigitalOcean Access Token with the [How to
   Create a Personal Access Token
   documentation][digitalocean-access-token-howto-url] with read/write scopes.
   Save the access token for later. **NOTE**: make sure you are in the mstacm
   project in DigitalOcean (See [prerequisites](#prerequisites) for more
   details).

3. Generate a (or reuse an old) [DigitalOcean spaces][digitalocean-spaces-url]
   access key and secret by following the [Manage Admin Access to Spaces
   documentation][digitalocean-spaces-howto-url].  Save the access key and
   secret for later. **NOTE**: make sure you are in the mstacm project in
   DigitalOcean (See [prerequisites](#prerequisites) for more details).


4. Navigate to the `deploy` directory in the repo:
    ```bash
    cd ./mstacm.org/deploy
    ```

5. Copy the `secrets.examples.tfvars` into `secrets.auto.tfvars`:
    ```bash
    cp secrets.examples.tfvars secrets.auto.tfvars
    ```

   The `*.auto.tfvars` is used to automatically apply the variables to any run
   of terraform

6. Populate the `secrets.auto.tfvars` with the appropriate values.

7. Copy the `digital_ocean.examples.ini` into `digital_ocean.ini`:
    ```bash
    cp digital_ocean.examples.tfvars digital_ocean.ini
    ```

8. Populate the `digital_ocean.ini` with the appropriate values.

9. (if you deploy the application) Generate a ssh key with the following path
   `./.keys/digitalocean-mstacm` (or your own ssh key, but make sure to add it
   to the terraform file):
    ```bash
    ssh-keygen -t rsa -b 4096 -m PEM -f ./.keys/digitalocean-mstacm
    ```
10. (if you deploy the application) Generate a ssh key with the following path
   `./.keys/deploy-master-mstacm` (or your own ssh key, but make sure to add it
   to the terraform file):
    ```bash
    ssh-keygen -t rsa -b 4096 -m PEM -f ./.keys/deploy-master-mstacm
    ```

11. (if you deploy the application) Add this SSH Key to the [Github
   Secrets](https://github.com/sigdotcom/mstacm.org/settings/secrets) under
   `DEPLOY_SSH_PRIV_KEY`

12. Request access to the [mstacm organization](https://app.terraform.io/app/mstacm/workspaces) 
    on [Terraform Cloud](https://app.terraform.io)

13. Generate a terraform cloud access token using their CLI:
    ```bash
    terraform login
    ```

14. Initialize terraform:
    ```bash
    terraform init
    ```

15. Switch to the `development` terraform workspace:
    ```bash
    terraform workspace select development
    ```

## Usage

### Switching Terraform workspaces
If you deploy the application you can access the `production` workspace:
```bash
terraform workspace select production
```

But if you're developing infrastructure components, only use the `development`
workspace:
```bash
terraform workspace select production
```

### Stand up the entire infrastructure
```bash
terraform apply
```

### Tear down the entire infrastructure
```bash
terraform destroy
```

Please be careful with this command as it will **permanently** destroy all of
the infrastructure components and their backups. It should be used only in the
`development` workspace or when something really terrible has happened and you
have taken the proper backups.


### Configure provisioned machines
```bash
poerty run ansible-playbook -i digital_ocean.py site.yml --ask-vault-pass
```

### Deploy the application end-to-end
1. (optional, but recommended) Create a backup of the current database:
    ```sh
    pg_dump <CONNECTION_STRING_FOR_DATABASE> | \
        gzip > ./dump_`date +%d-%m-%Y"_"%H_%M_%S`.sql.gz
    ```

2. Switch to the `production` terraform workspace:
    ```
    terraform workspace select production
    ```

2. Run terraform:
    ```sh
    terraform apply
    ```

15. (optional, but recommended) Upload an old backup of the database to the new
    database `phoenix` database:
    ```sh
    cat <YOUR_BACKUP_FILE> | gzip -d | psql <YOUR_CONNETION_STRING_TO_DATABASE>
    ```

    The connection string can be found in the online database panel on
    digitalocean.

16. Edit the `groups_vars/secrets.yml` file with the appropriate environment
    variables. Please note that not all of these values are strictly 'secret';
    however, they are all kept in the encrypted 'secret.yml' to prevent the
    uninitiated from pushing production secrets. Tips on where to acquire the
    correct values are found in the comments of this file. The file is encrypted
    using [Ansible Vault][ansible-vault-url] so that it can be automatically
    deployed by [Circle CI][circle-ci-url]. To edit, get the vault password from
    the ACM Bitwarden account or ask the Chair of ACM Web and use the following
    command:
    ```
    poetry run ansible-vault edit group_vars/secrets.yml
    ```
    
17. Run the ansible playbook:
    ```
    poetry run ansible-playbook -i digital_ocean.py site.yml --ask-vault-pass
    ```

## Github Actions
You should very rarely need to manually deploy / configure the application
unless things are seriously broken. The entire deployment pipeline will
automatically run using [Github Actions](https://github.com/features/actions)
whenever there is a push to the master branch. You can checkout the
`.github/workflows/` folder in the root of this repository for more information
about what is explicitly run and should act as good documentation of how to
deploy manually.

Github Actions also acts as our continuous integration (CI) platform by running
unit tests on the repository of every push to make sure things are broken. The
power of the CI system to prevent bugs is directly proportional to the quality
and quantity of tests written so keep that in mind when you 'will write your
tests another day'.

## Terraform Cloud
Our terraform instance is setup to use [Terraform Cloud][terraform-cloud-url] as
a remote backend. If you're unfamiliar with how terraform works, the limitation
of the local terraform is that your `terraform.tfstate` file is stored locally
and cannot be shared with a team. This means that only one person in ACM Web
could deploy the infrastructure application. [Terraform
Cloud][terraform-cloud-url] allows us to centralize the location of the
`terraform.tfstate` and well as some other nice features.

If you need to deploy new infrastructure for the application, please contact the
chair of ACM Web to have access to the [Terraform Cloud][terraform-cloud-url]
organization.

You can migrate off [Terraform Cloud][terraform-cloud-url] by simply
[downloading the state file](https://app.terraform.io/app/mstacm/workspaces/mstacm_org/states/) 
and removing the following block from the `terraform.tf`:
```hcl
terraform {
  backend "remote" {
    hostname = "app.terraform.io"
    organization = "mstacm"

    workspaces {
      name = "mstacm_org"
    }
  }
}
```

[ansible-url]: https://docs.ansible.com/ansible/latest/index.html
[ansible-vault-url]: https://docs.ansible.com/ansible/latest/user_guide/vault.html
[circle-ci-url]: https://circleci.com/gh/sigdotcom/workflows/mstacm.org
[terraform-url]: https://www.terraform.io/docs/index.html
[terraform-cloud-url]: https://www.terraform.io/docs/cloud/index.html
[terraform-cloud-api-token-url]: https://www.terraform.io/docs/cloud/users-teams-organizations/users.html#api-tokens
[terraform-cloud-credentials-url]: https://www.terraform.io/docs/commands/cli-config.html#credentials
[digitalocean-spaces-url]: https://www.digitalocean.com/products/spaces/
[digitalocean-spaces-howto-url]: https://www.digitalocean.com/docs/spaces/how-to/administrative-access/
[digitalocean-access-token-howto-url]: https://www.digitalocean.com/docs/api/create-personal-access-token/
[digitalocean-url]: https://cloud.digitalocean.com/
[digitalocean-nameservers]: https://www.digitalocean.com/community/tutorials/how-to-point-to-digitalocean-nameservers-from-common-domain-registrars
[netlify-url]: https://www.netlify.com/
[netlify-project-url]: https://app.netlify.com/teams/mstacm/sites
[netlify-dns-url]: https://app.netlify.com/teams/mstacm/dns
