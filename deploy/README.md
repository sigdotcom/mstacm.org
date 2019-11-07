# Deployment
Automated deployment of the \*.mstacm.org application stack using
[ansible][ansible-url] and [terraform][terraform-url]. The installation
instructions below will assume prior knowledge of [ansible][ansible-url] and
[terraform][terraform-url]. **NOTE**: deployment is only supported on a linux
machine. If you have a Windows computer, please use a linux jumpbox such as
`acmvm1.srv.mst.edu`.

<!-- TABLE OF CONTENTS -->
## Table of Contents

* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Terraform Cloud](#terraform-cloud)


<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites
+ [Git](https://git-scm.com/download/)
+ [Ansible][ansible-url]
+ [Terraform][terraform-url]
+ Make sure you have access to the mstacm team in
  [DigitalOcean][digitalocean-url]. Ask the chair of ACM Web for access.
+ Make sure you have access to the mstacm team in [Netlify][netlify-url]. Ask
  the chair of ACM Web for access.
+ Make sure you have access to the mstacm team in
  [Terraform Cloud][terraform-cloud-url]. Ask the chair of ACM Web for access.


### Installation
1. Clone the mstacm.org repository using Git Bash:
```sh
# Make sure to setup ssh keys on your github account
# https://help.github.com/en/articles/adding-a-new-ssh-key-to-your-github-account
git clone git@github.com:sigdotcom/mstacm.org.git
```

2. Navigate into the repository directory:
```sh
cd mstacm.org
```

3. Download / make sure you have all the [prerequisites listed](#prerequisites).

## Usage
The following section will describe step-by-step how to manually deploy the
application once in the `deploy` folder. In production, the first portion (up
until the ansible part) should all be managed by [Terraform
Cloud][terraform-cloud-url] and should not really come in to play. If you are
looking for the ansible instructions, please read through all the steps just
in case **NOTE**: make sure you read the directions throughly before executing
it. Some directions have notes and multiple parts that must be done.

1. Navigate to the deploy directory:
    ```sh
    cd deploy
    ```

2. Generate a ssh key at `~/.ssh/mstacm-digitalocean` to access the virtual
   machines (where `{HOME_DIR}` is the actual path to your home directory):
    ```sh
    $ ssh-keygen -t rsa -b 4096
    Generating public/private rsa key pair.
    Enter file in which to save the key ({HOME_DIR}/.ssh/id_rsa): {HOME_DIR}/.ssh/mstacm-digitalocean
    ...
    ```

3. Generate a DigitalOcean Access Token with the [How to Create a Personal
   Access Token documentation][digitalocean-access-token-howto-url] with
   read/write scopes. Save the access token for later. **NOTE**: make sure you are
   in the mstacm project in DigitalOcean (See [prerequisites](#prerequisites)
   for more details).

4. Generate a [DigitalOcean spaces][digitalocean-spaces-url] access key and
   secret by following the [Manage Admin Access to Spaces
   documentation][digitalocean-spaces-howto-url].
   Save the access key and secret for later. **NOTE**: make sure you are in the
   mstacm project in DigitalOcean (See [prerequisites](#prerequisites) for more
   details).

5. Copy `terraform.tfvars.template` to `terraform.tfvars`
    ```sh
    cp terraform.tfvars.template terraform.tfvars
    ```

6. Add the DigitalOcean Access Token and Spaces keys to the appropriate
   variables in `terraform.tfvars`

7. Open up the [mstacm project][netlify-project-url] in [netlify][netlify-url].

8. Navigate to the [domains tab][netlify-dns-url] and select `mstacm.org`.

9. Add NS records for `api.mstacm.org` that point to the [DigitalOcean
   Nameservers][digitalocean-nameservers] to netlify DNS records by clicking the
   **Add new record** button. The properties should look like: ![New DNS
   Record](./imgs/new_dns_record.png)

   If completed properly it should look like (as of 2019-10-27):
   ![NS Records](./imgs/ns_domains.png)

10. Request access to the [Terraform Cloud][terraform-cloud-url] organization
    from the chair of ACM Web.

11. Generate a [Terraform Cloud API Token][terraform-cloud-api-token-url] and
    configure terraform CLI to use the API Token with
    [Credentials][terraform-cloud-credentials-url].

12. Initialize terraform:
    ```sh
    terraform init
    ```

13. (optional, but recommended) Create a backup of the current database:
    ```sh
    pg_dump <CONNECTION_STRING_FOR_DATABASE> | \
        gzip > ./dump_`date +%d-%m-%Y"_"%H_%M_%S`.sql.gz
    ```

14. Run terraform (after this action, you will see a new `production` file
    appear, this will be important for ansible):
    ```sh
    terraform apply
    ```

11. Navigate to the DigitalOcean dashboard in the mstacm team and click the
    **Databases** tab.

12. Click on the `mstacm-postgres-cluster`. This should look like:
    ![Database Page](./imgs/digitalocean_database_page.png)

13. Configure the **Trusted Sources** to be the droplet created with terraform
    `api.mstacm.org`. If completed correctly, this should look like:
    ![Trusted Sources](./imgs/trusted_sources.png)

14. Create the `phoenix` database and user in the **Users & Databases** tab.

15. (optional, but recommended) Upload an old backup of the database to the new
    database `phoenix` database:
    ```sh
    cat <YOUR_BACKUP_FILE> | gzip -d | psql <YOUR_CONNETION_STRING_TO_DATABASE>
    ```

16. Edit the `groups_vars/api-prod.yml` file with the appropriate environment
    variables. Tips on where the acquire the correct values are found in the
    comments of this file. The file is encrypted using [Ansible
    Vault][ansible-vault-url] so that it can be automatically deployed by [Circle
    CI][circle-ci-url]. To edit, get the vault password from the ACM Bitwarden
    account or ask the Chair of ACM Web and use the following command:
    ```
    ansible-vault edit group_vars/api-prod.yml
    ```
    
17. Run the ansible playbook:
    ```
    ansible-playbook -i production site.yml
    ```

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
