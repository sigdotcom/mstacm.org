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

#################
# Provider
#################
provider "digitalocean" {
  token = "${var.do_token}"

  spaces_access_id  = "${var.spaces_access_id}"
  spaces_secret_key = "${var.spaces_secret_key}"
}

# See https://www.terraform.io/docs/cloud/migrate/index.html for migration from
# local to Terraform Cloud
terraform {
  backend "remote" {
    hostname = "app.terraform.io"
    organization = "mstacm"

    workspaces {
      name = "mstacm_org"
    }
  }
}

# Add local ssh key for accessing the various resources
resource "digitalocean_ssh_key" "default" {
  name       = "Terraform Key"
  public_key = "${file("~/.ssh/mstacm-digitalocean.pub")}"
}


#################
# Domains
#################
# Domain name for mstacm.org
# resource "digitalocean_domain" "default" {
#   name       = "mstacm.org"
# }

# Domain name for api.mstacm.org
resource "digitalocean_domain" "api" {
  name       = "api.mstacm.org"
  ip_address = "${digitalocean_droplet.api.ipv4_address}"
}

# Domain name for resumes.mstacm.org
# resource "digitalocean_domain" "resumes" {
#   name       = "resumes.mstacm.org"
# }

# Create a DigitalOcean managed Let's Encrypt Certificate
# resource "digitalocean_certificate" "resumes" {
#   name    = "resumes-cert"
#   type    = "lets_encrypt"
#   domains = ["${digitalocean_domain.resumes.name}"]
# }

# Domain name for assets.mstacm.org
# resource "digitalocean_domain" "assets" {
#   name       = "assets.mstacm.org"
# }

# Create a DigitalOcean managed Let's Encrypt Certificate
# resource "digitalocean_certificate" "assets" {
#   name    = "assets-cert"
#   type    = "lets_encrypt"
#   domains = ["${digitalocean_domain.assets.name}"]
# }

#################
# Droplets
#################
# Create droplet to host the api docker containers
resource "digitalocean_droplet" "api" {
  image              = "ubuntu-18-04-x64"
  name               = "api.mstacm.org"
  region             = "nyc3"
  size               = "s-1vcpu-1gb"
  ssh_keys           = ["${digitalocean_ssh_key.default.fingerprint}"]
  private_networking = true
}

#################
# Databases
#################
# Create a postgres database for all client data
resource "digitalocean_database_cluster" "default" {
  name       = "mstacm-postgres-cluster"
  engine     = "pg"
  version    = "11"
  size       = "db-s-1vcpu-1gb"
  region     = "nyc3"
  node_count = 1
}

#################
# Firewalls
#################
# create a firewall that only accepts port 22/80/443 traffic
resource "digitalocean_firewall" "mstacm-firewall" {
  name = "mstacm-firewall"

  droplet_ids = [
    "${digitalocean_droplet.api.id}"
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
  name   = "mstacm-cdn"
  region = "nyc3"
}

# Add a CDN endpoint with a custom sub-domain to the assets bucket
# resource "digitalocean_cdn" "cdn" {
#   origin         = "${digitalocean_spaces_bucket.cdn.bucket_domain_name}"
#   custom_domain  = "${digitalocean_domain.cdn.name}"
#   certificate_id = "${digitalocean_certificate.cdn.id}"
# }

# Add a CDN endpoint for the CDN bucket
resource "digitalocean_cdn" "primary" {
  origin = "${digitalocean_spaces_bucket.cdn.bucket_domain_name}"
}
 
#################
# Projects
#################
# Project for storing all of the resources for mstacm.org
resource "digitalocean_project" "default" {
  name        = "mstacm.org"
  description = "All resources for *.mstacm.org."
  purpose     = "Web Application"
  environment = "Production"
  resources   = [
    "${digitalocean_droplet.api.urn}",
    "${digitalocean_spaces_bucket.cdn.urn}",
    "${digitalocean_database_cluster.default.urn}"
  ]
}

#################
# Provisioners
#################
# create an ansible inventory file
resource "null_resource" "ansible-provision" {
  depends_on = ["digitalocean_droplet.api"]

  provisioner "local-exec" {
    command = "echo '${digitalocean_droplet.api.name} ansible_host=${digitalocean_droplet.api.ipv4_address}' > production"
  }
}

output "postgres_private_host" {
    value = "${digitalocean_database_cluster.default.private_host}"
    description = "The database's hostname accessible from resources in same region"
}

output "postgres_database" {
    value = "${digitalocean_database_cluster.default.database}"
    description = "The database's default database"
}

output "postgres_port" {
    value = "${digitalocean_database_cluster.default.port}"
    description = "The port used to access the database"
}

output "postgres_user" {
    value = "${digitalocean_database_cluster.default.user}"
    description = "The database's default user"
}

output "postgres_password" {
    value = "${digitalocean_database_cluster.default.password}"
    description = "The database's default user password"
    sensitive = true
}
