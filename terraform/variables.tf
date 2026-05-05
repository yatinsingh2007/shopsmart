variable "aws_region" {
  description = "AWS region to deploy resources in"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Name of the project, used as a prefix for all resources"
  type        = string
  default     = "shopsmart"
}

variable "environment" {
  description = "Deployment environment (e.g. production, staging)"
  type        = string
  default     = "production"

  validation {
    condition     = contains(["production", "staging", "development"], var.environment)
    error_message = "Environment must be one of: production, staging, development."
  }
}

variable "image_tag_mutability" {
  description = "Tag mutability setting for ECR repositories (MUTABLE or IMMUTABLE)"
  type        = string
  default     = "MUTABLE"

  validation {
    condition     = contains(["MUTABLE", "IMMUTABLE"], var.image_tag_mutability)
    error_message = "image_tag_mutability must be MUTABLE or IMMUTABLE."
  }
}

variable "scan_on_push" {
  description = "Enable automatic vulnerability scanning when an image is pushed"
  type        = bool
  default     = true
}

variable "max_image_count" {
  description = "Maximum number of images to retain in each ECR repository"
  type        = number
  default     = 10
}

# ─────────────────────────────────────────────
#  VPC & Networking Variables
# ─────────────────────────────────────────────
variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "public_subnet_cidrs" {
  description = "CIDR blocks for public subnets"
  type        = list(string)
  default     = ["10.0.1.0/24", "10.0.2.0/24"]
}

variable "availability_zones" {
  description = "Availability zones for subnets"
  type        = list(string)
  default     = ["us-east-1a", "us-east-1b"]
}

# ─────────────────────────────────────────────
#  ECS & Application Variables
# ─────────────────────────────────────────────
variable "server_port" {
  description = "Port exposed by the server container"
  type        = number
  default     = 5000
}

variable "client_port" {
  description = "Port exposed by the client container"
  type        = number
  default     = 3000
}

variable "cpu" {
  description = "Fargate instance CPU units (1024 = 1 vCPU)"
  type        = string
  default     = "256"
}

variable "memory" {
  description = "Fargate instance memory (in MiB)"
  type        = string
  default     = "512"
}

variable "desired_count" {
  description = "Number of tasks to run"
  type        = number
  default     = 1
}

variable "server_image" {
  description = "Docker image for the server container"
  type        = string
  default     = ""
}

variable "client_image" {
  description = "Docker image for the client container"
  type        = string
  default     = ""
}
