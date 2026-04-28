output "server_ecr_repository_url" {
  description = "ECR repository URL for the server image"
  value       = aws_ecr_repository.server.repository_url
}

output "client_ecr_repository_url" {
  description = "ECR repository URL for the client image"
  value       = aws_ecr_repository.client.repository_url
}

output "server_ecr_repository_arn" {
  description = "ECR repository ARN for the server"
  value       = aws_ecr_repository.server.arn
}

output "client_ecr_repository_arn" {
  description = "ECR repository ARN for the client"
  value       = aws_ecr_repository.client.arn
}

# Commented out — IAM policy creation is disabled for lab accounts
# output "ecr_push_policy_arn" {
#   description = "ARN of the IAM policy granting ECR push/pull access"
#   value       = aws_iam_policy.ecr_push.arn
# }

output "aws_region" {
  description = "AWS region where ECR repositories are created"
  value       = var.aws_region
}

output "registry_url" {
  description = "Base ECR registry URL (account + region)"
  value       = split("/", aws_ecr_repository.server.repository_url)[0]
}
