#################
# Variables
#################
variable "do_token" {
  type        = string
  description = "DigitalOcean personal access token generated at Application & API in the DigitalOcean control panel"
}

variable "spaces_access_id" {
  type        = string
  description = "DigitalOcean spaces access id generated at Application & API in the DigitalOcean control panel"
}

variable "spaces_secret_key" {
  type        = string
  description = "DigitalOcean spaces secret key generated at Application & API in the DigitalOcean control panel"
}

locals {
  uri = terraform.workspace == "production" ? "mstacm.org" : "devel.mstacm.org"
}


#################
# Provider
#################
provider "digitalocean" {
  token = var.do_token

  spaces_access_id  = var.spaces_access_id
  spaces_secret_key = var.spaces_secret_key
}

# See https://www.terraform.io/docs/cloud/migrate/index.html for migration from
# local to Terraform Cloud
terraform {
  backend "remote" {
    hostname = "app.terraform.io"
    organization = "mstacm"

    workspaces {
      prefix = "mstacm_org-"
    }
  }
}

# Add local ssh key for accessing the various resources
resource "digitalocean_ssh_key" "terraform" {
  name       = "Terraform Key - ${terraform.workspace}"
  public_key = file("./.keys/digitalocean-mstacm.pub")
}

# Add ssh key used in the to automatically deploy the application
resource "digitalocean_ssh_key" "deploy" {
  name       = "Deploy Key - ${terraform.workspace}"
  public_key = file("./.keys/deploy-master-mstacm.pub")
}


#################
# Domains
#################
# Domain name for mstacm.org
resource "digitalocean_domain" "default" {
  name       = local.uri
}

# Domain name for api.mstacm.org
resource "digitalocean_domain" "api" {
  name       = "api.${local.uri}"
  ip_address = digitalocean_droplet.api.ipv4_address
}

# Domain name for resumes.mstacm.org
resource "digitalocean_domain" "resumes" {
  name       = "resumes.${local.uri}"
}

# Create a DigitalOcean managed Let's Encrypt Certificate
resource "digitalocean_certificate" "resumes" {
  name    = "resumes-cert"
  type    = "lets_encrypt"
  domains = [digitalocean_domain.resumes.name]
}

# Domain name for assets.mstacm.org
resource "digitalocean_domain" "cdn" {
  name       = "cdn.${local.uri}"
}

# Create a DigitalOcean managed Let's Encrypt Certificate
resource "digitalocean_certificate" "cdn" {
  name    = "assets-cert"
  type    = "lets_encrypt"
  domains = [digitalocean_domain.cdn.name]
}

#################
# Domain Records
#################
# Additional records off of mstacm.org that point to external services /
# providers

# Point mstacm.org to netlify
resource "digitalocean_record" "cname-admin" {
  domain   = digitalocean_domain.default.name
  type     = "A"
  name     = "@"
  value    = "104.198.14.52"
}

# Point www.mstacm.org to netlify
resource "digitalocean_record" "cname-admin" {
  domain   = digitalocean_domain.default.name
  type     = "A"
  name     = "www"
  value    = "104.198.14.52"
}

# CNAME to netlify for the resumes page
resource "digitalocean_record" "cname-resumes" {
  domain   = digitalocean_domain.default.name
  type     = "CNAME"
  name     = "resumes"
  value    = "mstacm-resumes.netlify.com."
}

# CNAME to netlify for the profile page
resource "digitalocean_record" "cname-profile" {
  domain   = digitalocean_domain.default.name
  type     = "CNAME"
  name     = "profile"
  value    = "profile-mstacm.netlify.com."
}

# CNAME to netlify for the admin page
resource "digitalocean_record" "cname-admin" {
  domain   = digitalocean_domain.default.name
  type     = "CNAME"
  name     = "admin"
  value    = "admin-mstacm.netlify.com."
}

# CNAME to auth0 for the authentication
resource "digitalocean_record" "cname-auth0" {
  domain   = digitalocean_domain.default.name
  type     = "CNAME"
  name     = "auth"
  value    = "mstacm-cd-ko2mjvj6yr6dysrc.edge.tenants.auth0.com."
}

# CNAME to women.mstacm.org for ACM-W's page
resource "digitalocean_record" "cname-women" {
  domain   = digitalocean_domain.default.name
  type     = "CNAME"
  name     = "women"
  value    = "mstacmw.github.io."
}

# CNAME to comp.mstacm.org for ACM Comp's page
resource "digitalocean_record" "cname-comp" {
  domain   = digitalocean_domain.default.name
  type     = "CNAME"
  name     = "comp"
  value    = "sigcomp.github.io."
}


#################
# Droplets
#################
# Create droplet to host the api docker containers
resource "digitalocean_droplet" "api" {
  name               = "api.${local.uri}"
  image              = "docker-18-04"
  region             = "nyc3"
  size               = "s-1vcpu-1gb"
  monitoring = true
  private_networking = true
  tags = ["api"]
  ssh_keys           = [
    digitalocean_ssh_key.terraform.fingerprint,
    digitalocean_ssh_key.deploy.fingerprint
  ]
}

#################
# Databases
#################
# Create a postgres database for all client data
resource "digitalocean_database_cluster" "default" {
  name       = terraform.workspace == "production" ? "mstacm-postgres-cluster" : "develop-mstacm-postgres-cluster"

  engine     = "pg"
  version    = "11"
  size       = "db-s-1vcpu-1gb"
  region     = "nyc3"
  node_count = 1
}

resource "digitalocean_database_db" "default" {
  cluster_id = digitalocean_database_cluster.default.id
  name       = "phoenix"
}

resource "digitalocean_database_user" "default" {
  cluster_id = digitalocean_database_cluster.default.id
  name       = "phoenix"
}


#################
# Firewalls
#################
# create a firewall that only accepts port 22/80/443 traffic
resource "digitalocean_firewall" "mstacm-firewall" {
  name = "mstacm-firewall-${terraform.workspace}"

  droplet_ids = [
    digitalocean_droplet.api.id
  ]

  inbound_rule {
      protocol         = "tcp"
      port_range       = "22"
      source_addresses = ["0.0.0.0/0"]
  }

  inbound_rule {
      protocol         = "tcp"
      port_range       = "80"
      source_addresses = ["0.0.0.0/0"]
  }

  inbound_rule {
    protocol         = "tcp"
    port_range       = "443"
    source_addresses = ["0.0.0.0/0"]
  }

  outbound_rule {
    protocol              = "tcp"
    port_range            = "all"
    destination_addresses = ["0.0.0.0/0"]
  }

  outbound_rule {
    protocol              = "udp"
    port_range            = "all"
    destination_addresses = ["0.0.0.0/0"]
  }
}

#################
# Spaces
#################
# Space for storing all CDN files
resource "digitalocean_spaces_bucket" "cdn" {
  name   = terraform.workspace == "production" ? "mstacm-cdn" : "mstacm-cdn-develop"
  region = "nyc3"
}

# Add a CDN endpoint with a custom sub-domain to the assets bucket
resource "digitalocean_cdn" "cdn" {
  origin         = digitalocean_spaces_bucket.cdn.bucket_domain_name
  custom_domain  = digitalocean_domain.cdn.name
  certificate_id = digitalocean_certificate.cdn.id
}

resource "digitalocean_spaces_bucket" "resumes" {
  name   = terraform.workspace == "production" ? "mstacm-resumes" : "mstacm-resumes-develop"
  region = "nyc3"
}

# Add a CDN endpoint with a custom sub-domain to the assets bucket
resource "digitalocean_cdn" "resumes" {
  origin         = digitalocean_spaces_bucket.resumes.bucket_domain_name
  custom_domain  = digitalocean_domain.resumes.name
  certificate_id = digitalocean_certificate.resumes.id
}

#################
# Projects
#################
# Project for storing all of the resources for mstacm.org
resource "digitalocean_project" "default" {
  name        = local.uri
  description = "All resources for *.${local.uri}."
  purpose     = "Web Application"
  environment = "Production"
  resources   = [
    digitalocean_droplet.api.urn,
    digitalocean_spaces_bucket.cdn.urn,
    digitalocean_database_cluster.default.urn
  ]
}

output "postgres_private_host" {
    value = digitalocean_database_cluster.default.private_host
    description = "The database's hostname accessible from resources in same region"
}

output "postgres_database" {
    value = digitalocean_database_cluster.default.database
    description = "The database's default database"
}

output "postgres_port" {
    value = digitalocean_database_cluster.default.port
    description = "The port used to access the database"
}

output "postgres_user" {
    value = digitalocean_database_cluster.default.user
    description = "The database's default user"
}

output "postgres_password" {
    value = digitalocean_database_cluster.default.password
    description = "The database's default user password"
    sensitive = true
}
