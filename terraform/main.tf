terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # Uncomment this block to use remote state (recommended for teams)
  # backend "s3" {
  #   bucket         = "shopsmart-terraform-state"
  #   key            = "ecr/terraform.tfstate"
  #   region         = "us-east-1"
  #   dynamodb_table = "shopsmart-terraform-locks"
  #   encrypt        = true
  # }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = var.project_name
      Environment = var.environment
      ManagedBy   = "terraform"
    }
  }
}
