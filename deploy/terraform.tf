variable "do_token" {}
variable "spaces_access_id" {}
variable "spaces_secret_key" {} 

provider "digitalocean" {
  token = "${var.do_token}"

  spaces_access_id  = "${var.spaces_access_id}"
  spaces_secret_key = "${var.spaces_secret_key}"
}

# Add local ssh key for accessing the various resources
resource "digitalocean_ssh_key" "default" {
  name       = "Terraform Key"
  public_key = "${file("~/.ssh/mstacm-digitalocean.pub")}"
}

# Domain name for api.mstacm.org
resource "digitalocean_domain" "api" {
  name       = "api.mstacm.org"
  ip_address = "${digitalocean_droplet.api.ipv4_address}"
}

# Domain name for resumes.mstacm.org
resource "digitalocean_domain" "resumes" {
  name       = "resumes.mstacm.org"
}

# Create a DigitalOcean managed Let's Encrypt Certificate
resource "digitalocean_certificate" "resumes" {
  name    = "resumes-cert"
  type    = "lets_encrypt"
  domains = ["${digitalocean_domain.resumes.name}"]
}

# Domain name for assets.mstacm.org
resource "digitalocean_domain" "assets" {
  name       = "assets.mstacm.org"
}

# Create a DigitalOcean managed Let's Encrypt Certificate
resource "digitalocean_certificate" "assets" {
  name    = "assets-cert"
  type    = "lets_encrypt"
  domains = ["${digitalocean_domain.assets.name}"]
}

# Create droplet to host the api docker containers
resource "digitalocean_droplet" "api" {
  image              = "ubuntu-16-04-x64"
  name               = "api.mstacm.org"
  region             = "nyc3"
  size               = "512mb"
  ssh_keys           = ["${digitalocean_ssh_key.default.fingerprint}"]
  monitoring         = true
  private_networking = true
}

# Create a postgres database for all client data
resource "digitalocean_database_cluster" "default" {
  name       = "mstacm-postgres-cluster"
  engine     = "pg"
  version    = "11"
  size       = "db-s-1vcpu-1gb"
  region     = "nyc3"
  node_count = 1
}

# create a firewall that only accepts port 80/443 traffic
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

# Space for storing student resumes
resource "digitalocean_spaces_bucket" "resumes" {
  name   = "mstacm-resumes"
  region = "nyc3"
}

# Add a CDN endpoint with a custom sub-domain to the Resumes Bucket
resource "digitalocean_cdn" "resumes" {
  origin         = "${digitalocean_spaces_bucket.resumes.bucket_domain_name}"
  custom_domain  = "${digitalocean_domain.resumes.name}"
  certificate_id = "${digitalocean_certificate.resumes.id}"
}

# Space for storing static files like images
resource "digitalocean_spaces_bucket" "assets" {
  name   = "mstacm-assets"
  region = "nyc3"
}

# Add a CDN endpoint with a custom sub-domain to the assets bucket
resource "digitalocean_cdn" "asserts" {
  origin         = "${digitalocean_spaces_bucket.assets.bucket_domain_name}"
  custom_domain  = "${digitalocean_domain.assets.name}"
  certificate_id = "${digitalocean_certificate.assets.id}"
}

# Project for storing all of the resources for mstacm.org
resource "digitalocean_project" "default" {
  name        = "mstacm.org"
  description = "All resources for *.mstacm.org."
  purpose     = "Web Application"
  environment = "Production"
  resources   = [
    "${digitalocean_droplet.api.urn}",
    "${digitalocean_spaces_bucket.resumes.urn}",
    "${digitalocean_spaces_bucket.assets.urn}",
    "${digitalocean_database_cluster.default.urn}"
  ]
}


# create an ansible inventory file
resource "null_resource" "ansible-provision" {
  depends_on = ["digitalocean_droplet.api"]

  provisioner "local-exec" {
    command = "echo '${digitalocean_droplet.api.name} ansible_host=${digitalocean_droplet.api.ipv4_address} ansible_ssh_user=root ansible_python_interpreter=/usr/bin/python3' > inventory"
  }
}

output "postgres_private_uri" {
    value = "${digitalocean_database_cluster.default.private_uri}"
}
