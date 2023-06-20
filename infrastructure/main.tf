terraform {
  required_version = ">=1.5.0"

  backend "s3" {
    bucket               = "infrastructure.usetempo.ai"
    key                  = "www.usetempo.ai"
    encrypt              = "true"
    region               = "us-east-1"
    workspace_key_prefix = "tf"
  }
}
